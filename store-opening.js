const API_URL =
  "https://script.google.com/macros/s/AKfycbx1Yc28RHFH_rsl11OnZCyVPH7QvzjEI36lzjqhXZZUQSQMEo-n4fs--bEjPxI5Zbd4/exec";

let projects = [];
let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  setDefaultMonth();
  loadProjects();

  const scheduleMonth = document.getElementById("scheduleMonth");
  const scheduleProjectId = document.getElementById("scheduleProjectId");

  if (scheduleMonth) {
    scheduleMonth.addEventListener("change", loadSchedule);
  }

  if (scheduleProjectId) {
    scheduleProjectId.addEventListener("change", loadSchedule);
  }
});

function showTab(id, btn) {
  document.querySelectorAll(".panel")
    .forEach(p => p.classList.remove("active"));

  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

  document.getElementById(id).classList.add("active");
  btn.classList.add("active");

  if (id === "schedule") {
    loadSchedule();
  }
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

async function api(params) {
  const query = new URLSearchParams(params);
  const res = await fetch(API_URL + "?" + query.toString());
  return await res.json();
}

function setDefaultMonth() {
  const el = document.getElementById("scheduleMonth");
  if (!el) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");

  el.value = `${yyyy}-${mm}`;
}

async function saveProject() {
  if (!val("storeName")) {
    alert("점포명을 입력하세요.");
    return;
  }

  const data = await api({
    action: "saveStoreOpening",
    brand: val("brand"),
    storeName: val("storeName"),
    retailer: val("retailer"),
    location: val("location"),
    mdName: val("mdName"),
    owner: val("owner"),
    contractDate: val("contractDate"),
    constructionStart: val("constructionStart"),
    preOpenDate: val("preOpenDate"),
    openDate: val("openDate"),
    status: val("status"),
    progress: val("progress"),
    memo: val("projectMemo")
  });

  alert(data.message || "저장 완료");
  loadProjects();
}

async function saveTask() {
  if (!val("taskProjectId")) {
    alert("점포를 선택하세요.");
    return;
  }

  const data = await api({
    action: "saveOpeningTask",
    projectId: val("taskProjectId"),
    category: val("taskCategory"),
    title: val("taskTitle"),
    owner: val("taskOwner"),
    startDate: val("taskStartDate"),
    dueDate: val("taskDueDate"),
    status: val("taskStatus"),
    memo: val("taskMemo")
  });

  alert(data.message || "업무 저장 완료");

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskOwner").value = "";
  document.getElementById("taskStartDate").value = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskMemo").value = "";

  loadSchedule();
}

async function loadProjects() {
  const data = await api({
    action: "getStoreOpenings"
  });

  projects = data.projects || [];

  document.getElementById("totalProjects").textContent = projects.length;

  let progressSum = 0;
  const list = document.getElementById("projectList");
  list.innerHTML = "";

  projects.forEach(p => {
    progressSum += Number(p.progress || 0);

    list.innerHTML += `
      <div class="project-card">
        <div class="project-title">${p.storeName || ""}</div>

        <div class="project-meta">
          브랜드 : ${p.brand || ""}<br>
          유통사 : ${p.retailer || ""}<br>
          담당 : ${p.owner || ""}<br>
          오픈예정 : ${p.openDate || ""}<br>
          상태 : ${p.status || ""}
        </div>

        <div class="progress-wrap">
          <div class="progress-bar" style="width:${p.progress || 0}%"></div>
        </div>
      </div>
    `;
  });

  document.getElementById("avgProgress").textContent =
    projects.length
      ? Math.round(progressSum / projects.length) + "%"
      : "0%";

  fillProjectSelects();
  loadSchedule();
}

function fillProjectSelects() {
  const selects = [
    "taskProjectId",
    "scheduleProjectId",
    "expenseProjectId"
  ];

  selects.forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;

    const currentValue = select.value;

    select.innerHTML = `<option value="">점포 선택</option>`;

    projects.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.projectId;
      opt.textContent = p.storeName;
      select.appendChild(opt);
    });

    if (currentValue) {
      select.value = currentValue;
    }
  });
}

async function loadSchedule() {
  const box = document.getElementById("scheduleList");
  if (!box) return;

  box.innerHTML = "일정을 불러오는 중입니다...";

  try {
    const data = await api({
      action: "getOpeningTasks"
    });

    console.log("업무 데이터 확인:", data);

    tasks =
      data.tasks ||
      data.items ||
      data.data ||
      data.rows ||
      [];

    renderSchedule(tasks);

  } catch (err) {
    console.error(err);
    box.innerHTML = `
      <div class="project-card">
        일정표를 불러오지 못했습니다.
      </div>
    `;
  }
}

function renderSchedule(list) {
  const box = document.getElementById("scheduleList");
  if (!box) return;

  if (!list || list.length === 0) {
    box.innerHTML = `
      <div class="project-card">
        등록된 업무 일정이 없습니다.
      </div>
    `;
    return;
  }

  list.sort((a, b) => {
    const da = a.dueDate || a["마감일"] || a.startDate || a["시작일"] || "";
    const db = b.dueDate || b["마감일"] || b.startDate || b["시작일"] || "";
    return String(da).localeCompare(String(db));
  });

  let html = "";

  list.forEach(t => {
    const pid = t.projectId || t["projectId"];

    const project = projects.find(p =>
      String(p.projectId) === String(pid)
    );

    html += `
      <div class="project-card">
        <div class="project-title">
          ${t.title || t["업무명"] || ""}
        </div>

        <div class="project-meta">
          점포 : ${project ? project.storeName : ""}<br>
          업무구분 : ${t.category || t["업무구분"] || ""}<br>
          담당자 : ${t.owner || t["담당자"] || ""}<br>
          시작일 : ${t.startDate || t["시작일"] || ""}<br>
          마감일 : ${t.dueDate || t["마감일"] || ""}<br>
          상태 : ${t.status || t["상태"] || ""}<br>
          메모 : ${t.memo || t["메모"] || ""}
        </div>
      </div>
    `;
  });

  box.innerHTML = html;
}

async function saveExpense() {
  const projectId = val("expenseProjectId");
  const expenseDate = val("expenseDate");
  const amount = val("expenseAmount").replace(/,/g, "");

  if (!projectId) {
    alert("점포를 선택하세요.");
    return;
  }

  if (!expenseDate) {
    alert("지출일자를 입력하세요.");
    return;
  }

  if (!amount) {
    alert("지출금액을 입력하세요.");
    return;
  }

  const project =
    projects.find(p => String(p.projectId) === String(projectId));

  const payload = {
    action: "saveExpense",
    projectId: projectId,
    brand: project ? project.brand : "",
    storeName: project ? project.storeName : "",
    expenseDate: expenseDate,
    category: val("expenseCategory"),
    vendor: val("expenseVendor"),
    amount: amount,
    payMethod: val("expensePayMethod"),
    shareType: val("expenseShareType"),
    proof: val("expenseProof"),
    memo: val("expenseMemo")
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.success) {
      alert("출납내역 저장 완료");

      document.getElementById("expenseDate").value = "";
      document.getElementById("expenseVendor").value = "";
      document.getElementById("expenseAmount").value = "";
      document.getElementById("expenseMemo").value = "";
    } else {
      alert(data.message || "저장 실패");
    }

  } catch (err) {
    console.error(err);
    alert("서버 오류");
  }
}

document.addEventListener("input", function(e) {
  if (!e.target || e.target.id !== "expenseAmount") return;

  const n = e.target.value.replace(/[^0-9]/g, "");
  e.target.value = n ? Number(n).toLocaleString() : "";
});