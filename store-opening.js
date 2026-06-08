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

  if (id === "list") {
    loadProjects();
  }
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

async function api(params) {
  const query = new URLSearchParams(params);

  const res = await fetch(API_URL + "?" + query.toString(), {
    method: "GET",
    redirect: "follow"
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.log("서버 응답 원문:", text);
    return {};
  }
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
    progress: val("taskStatus") === "완료" ? "100" : "0",
    memo: val("taskMemo")
  });

  alert(data.message || "업무 저장 완료");

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskOwner").value = "";
  document.getElementById("taskStartDate").value = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskMemo").value = "";

  loadProjects();
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
    const progress = Number(p.progress || 0);
    progressSum += progress;

    list.innerHTML += `
      <div class="project-card">
        <div class="project-title">${p.storeName || ""}</div>

        <div class="project-meta">
          브랜드 : ${p.brand || ""}<br>
          유통사 : ${p.retailer || ""}<br>
          담당 : ${p.owner || ""}<br>
          오픈예정 : ${p.openDate || ""}<br>
          상태 : ${p.status || ""}<br>
          진행률 : ${progress}%
        </div>

        <div class="progress-wrap">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>
      </div>
    `;
  });

  document.getElementById("avgProgress").textContent =
    projects.length
      ? Math.round(progressSum / projects.length) + "%"
      : "0%";

  fillProjectSelects();
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

  const month = val("scheduleMonth");
  const projectId = val("scheduleProjectId");

  box.innerHTML = "일정을 불러오는 중입니다...";

  try {
    const data = await api({
      action: "getOpeningSchedule",
      month: month,
      projectId: projectId
    });

    const schedules = data.schedules || [];
    renderSchedule(schedules);

  } catch (err) {
    console.error(err);
    box.innerHTML = `
      <div class="project-card">
        일정표를 불러오지 못했습니다.
      </div>
    `;
  }
}

function statusBadge(status) {
  if (status === "완료") return "✅ 완료";
  if (status === "지연") return "⚠️ 지연";
  if (status === "진행중") return "🔵 진행중";
  if (status === "예정") return "🟡 예정";
  return status || "";
}

function safeText(v) {
  return String(v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSchedule(list) {
  const box = document.getElementById("scheduleList");
  if (!box) return;

  const projectId = val("scheduleProjectId");

  if (!projectId) {
    box.innerHTML = `
      <div style="
        background:#eef5ff;
        color:#1d4ed8;
        padding:14px 18px;
        border-radius:10px;
        margin-bottom:16px;
        font-weight:700;
      ">
        ⓘ 점포를 선택하면 해당 점포의 업무를 진행중 / 완료로 구분하여 보여줍니다.
      </div>
    `;
    return;
  }

  if (!list || list.length === 0) {
    box.innerHTML = `<div class="project-card">등록된 업무 일정이 없습니다.</div>`;
    return;
  }

  const ingList = list.filter(t => t.status !== "완료");
  const doneList = list.filter(t => t.status === "완료");

  box.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px;">

      <div>
        <h3 style="color:#2563eb; margin-bottom:12px;">
          진행중 업무 
          <span style="background:#3b82f6;color:white;padding:4px 10px;border-radius:12px;font-size:13px;">
            ${ingList.length}건
          </span>
        </h3>
        ${renderTaskColumn(ingList, false)}
      </div>

      <div>
        <h3 style="color:#16a34a; margin-bottom:12px;">
          완료 업무 
          <span style="background:#bbf7d0;color:#166534;padding:4px 10px;border-radius:12px;font-size:13px;">
            ${doneList.length}건
          </span>
        </h3>
        ${renderTaskColumn(doneList, true)}
      </div>

    </div>
  `;
}

function renderTaskColumn(list, isDone) {

  if (!list || list.length === 0) {
    return `
      <div class="project-card">
        해당 업무가 없습니다.
      </div>
    `;
  }

  let html = "";

  list.forEach(t => {

    const progress =
      Number(t.progress || 0);

    const barColor =
      isDone
        ? "#22c55e"
        : (t.status === "지연"
            ? "#ef4444"
            : "#2563eb");

    html += `

      <div class="project-card" style="margin-bottom:14px;">

        <div style="
          display:grid;
          grid-template-columns:100px 1fr 220px;
          gap:16px;
          align-items:start;
        ">

          <div style="
            font-size:24px;
            font-weight:800;
            color:#111827;
          ">
            ${t.date || ""}
          </div>

          <div>

            <div class="project-title">
              ${t.title || ""}
            </div>

            <div class="project-meta">
              점포 : ${t.storeName || ""}<br>
              업무구분 : ${t.category || ""}<br>
              담당자 : ${t.owner || ""}<br>

              상태 :
              ${statusBadge(t.status)}<br>

              진행률 :
              ${progress}%<br>

              중요도 :
              ${t.priority || "보통"}<br>

              지연사유 :
              ${t.delayReason || "-"}<br>

              관리자메모 :
              ${t.adminMemo || "-"}<br>

              최종수정 :
              ${t.updatedAt || "-"}
            </div>

            <div class="progress-wrap" style="margin-top:10px;">
              <div class="progress-bar"
                   style="
                     width:${progress}%;
                     background:${barColor};
                   ">
              </div>
            </div>

          </div>

          <div style="
            display:flex;
            flex-direction:column;
            gap:10px;
          ">

            <button class="primary"
              onclick="updateTaskProgress('${safeText(t.taskId)}')">

              진행수정

            </button>

            <button class="primary"
              style="background:#b45309;"
              onclick="delayTask('${safeText(t.taskId)}')">

              지연등록

            </button>

            <button class="primary"
              ${isDone ? "disabled" : ""}
              style="
                ${isDone ? "opacity:.45;" : ""}
              "
              onclick="completeTask('${safeText(t.taskId)}')">

              완료처리

            </button>

          </div>

        </div>

      </div>

    `;
  });

  return html;
}


function renderSchedule(list) {

  const box =
    document.getElementById("scheduleList");

  if (!box) return;

  const projectId =
    val("scheduleProjectId");

  if (!projectId) {

    box.innerHTML = `
      <div class="project-card">
        점포를 선택하면 업무 일정이 표시됩니다.
      </div>
    `;

    return;
  }

  if (!list || list.length === 0) {

    box.innerHTML = `
      <div class="project-card">
        등록된 업무 일정이 없습니다.
      </div>
    `;

    return;
  }

  const ingList =
    list.filter(t => t.status !== "완료");

  const doneList =
    list.filter(t => t.status === "완료");

  box.innerHTML = `

    <div style="
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:20px;
      align-items:start;
    ">

      <div>

        <h3 style="
          margin-bottom:14px;
          color:#2563eb;
        ">
          진행중 업무
        </h3>

        ${renderTaskColumn(ingList, false)}

      </div>

      <div>

        <h3 style="
          margin-bottom:14px;
          color:#16a34a;
        ">
          완료 업무
        </h3>

        ${renderTaskColumn(doneList, true)}

      </div>

    </div>

  `;
}


async function updateTaskProgress(taskId) {
  if (!taskId) {
    alert("업무 ID가 없습니다.");
    return;
  }

  let progress = prompt("현재 진행률을 숫자로 입력하세요. 예: 30, 50, 80");
  if (progress === null) return;

  progress = progress.replace(/[^0-9]/g, "");
  progress = Math.max(0, Math.min(100, Number(progress || 0)));

  const adminMemo = prompt("관리자 메모를 입력하세요.", "") || "";

  const status = progress >= 100 ? "완료" : "진행중";

  const data = await api({
    action: "updateOpeningTask",
    taskId: taskId,
    status: status,
    progress: progress,
    delayReason: "",
    adminMemo: adminMemo
  });

  alert(data.message || "진행상태가 수정되었습니다.");
  loadProjects();
  loadSchedule();
}

async function delayTask(taskId) {
  if (!taskId) {
    alert("업무 ID가 없습니다.");
    return;
  }

  const delayReason = prompt("지연 사유를 입력하세요.", "");
  if (delayReason === null) return;

  let progress = prompt("현재 진행률을 입력하세요. 예: 20, 40, 60", "0");
  if (progress === null) return;

  progress = progress.replace(/[^0-9]/g, "");
  progress = Math.max(0, Math.min(100, Number(progress || 0)));

  const adminMemo = prompt("관리자 메모를 입력하세요.", "") || "";

  const data = await api({
    action: "updateOpeningTask",
    taskId: taskId,
    status: "지연",
    progress: progress,
    delayReason: delayReason,
    adminMemo: adminMemo
  });

  alert(data.message || "지연상태가 등록되었습니다.");
  loadProjects();
  loadSchedule();
}

async function completeTask(taskId) {
  if (!taskId) {
    alert("업무 ID가 없습니다.");
    return;
  }

  const ok = confirm("이 업무를 완료 처리하시겠습니까?");
  if (!ok) return;

  const adminMemo = prompt("완료 메모를 입력하세요.", "완료 처리") || "";

  const data = await api({
    action: "updateOpeningTask",
    taskId: taskId,
    status: "완료",
    progress: "100",
    delayReason: "",
    adminMemo: adminMemo
  });

  alert(data.message || "완료 처리되었습니다.");
  loadProjects();
  loadSchedule();
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