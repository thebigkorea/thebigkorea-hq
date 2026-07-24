const API_URL =
  "https://script.google.com/macros/s/AKfycbx1Yc28RHFH_rsl11OnZCyVPH7QvzjEI36lzjqhXZZUQSQMEo-n4fs--bEjPxI5Zbd4/exec";

let projects = [];
let tasks = [];

document.addEventListener("DOMContentLoaded", () => {

  loadProjects();

  setupChecklistTaskLinks();

});

function showTab(id, btn) {
  document.querySelectorAll(".panel")
    .forEach(p => p.classList.remove("active"));

  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

  document.getElementById(id).classList.add("active");
  btn.classList.add("active");

  

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

  let activeProjectCount = 0;
  const list = document.getElementById("projectList");
  list.innerHTML = "";

  projects.forEach(p => {
    const progress = Number(p.progress || 0);
    if (
  p.status !== "오픈완료" &&
  progress < 100
) {
  activeProjectCount++;
}

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
  activeProjectCount; 

  fillProjectSelects();
}

function fillProjectSelects() {
  const selects = [
  "taskProjectId",
  "scheduleProjectId",
  "expenseProjectId",
  "expenseLookupProjectId"
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

  const box =
    document.getElementById("scheduleList");

  if (!box) return;

  const projectSelect =
    document.getElementById("scheduleProjectId");

  const projectId =
    projectSelect
      ? String(projectSelect.value || "").trim()
      : "";

  if (!projectId) {

    box.innerHTML = `
      <div class="schedule-empty">
        점포를 선택하면 해당 점포의 전체 업무 진행상황이 표시됩니다.
      </div>
    `;

    return;
  }

  box.innerHTML = `
    <div class="schedule-empty">
      업무현황을 불러오는 중입니다...
    </div>
  `;

  try {

    const data = await api({
      action: "getOpeningSchedule",
      projectId: projectId
    });

    console.log(
      "선택한 점포 ID:",
      projectId
    );

    console.log(
      "업무현황 서버 응답:",
      data
    );

    if (!data || data.success === false) {

      box.innerHTML = `
        <div class="schedule-empty">
          ${data && data.message
            ? data.message
            : "업무현황을 불러오지 못했습니다."}
        </div>
      `;

      return;
    }

    const schedules =
      Array.isArray(data.schedules)
        ? data.schedules
        : [];

    renderSchedule(schedules);

  } catch (err) {

    console.error(err);

    box.innerHTML = `
      <div class="schedule-empty">
        업무현황을 불러오지 못했습니다.
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

  const box =
    document.getElementById("scheduleList");

  if (!box) return;

  const projectId =
    val("scheduleProjectId");

  if (!projectId) {

    box.innerHTML = `
      <div class="schedule-empty">
        점포를 선택하면 해당 점포의 전체 업무 진행상황이 표시됩니다.
      </div>
    `;

    return;
  }

  if (!list || list.length === 0) {

    box.innerHTML = `
      <div class="schedule-empty">
        등록된 업무가 없습니다.
      </div>
    `;

    return;
  }

  const normalizedList =
    list.map(item => {

      const progress =
        Math.max(
          0,
          Math.min(
            100,
            Number(item.progress || 0)
          )
        );

      let displayStatus =
        item.status || "예정";

      if (
        displayStatus !== "완료" &&
        progress === 0
      ) {
        displayStatus = "미시작";
      }

      return {
        ...item,
        progress: progress,
        displayStatus: displayStatus
      };
    });

  const plannedList =
    normalizedList.filter(item =>
      item.displayStatus === "미시작" ||
      item.displayStatus === "예정"
    );

  const workingList =
    normalizedList.filter(item =>
      item.displayStatus === "진행중"
    );

  const delayedList =
    normalizedList.filter(item =>
      item.displayStatus === "지연"
    );

  const doneList =
    normalizedList.filter(item =>
      item.status === "완료"
    );

  const unfinishedList =
    normalizedList
      .filter(item => item.status !== "완료")
      .sort((a, b) => {

        const statusOrder = {
          "지연": 0,
          "진행중": 1,
          "미시작": 2,
          "예정": 3
        };

        const orderA =
          statusOrder[a.displayStatus] ?? 9;

        const orderB =
          statusOrder[b.displayStatus] ?? 9;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        const dateA =
          a.date || "9999-12-31";

        const dateB =
          b.date || "9999-12-31";

        return dateA.localeCompare(dateB);
      });

  doneList.sort((a, b) => {

    const dateA =
      a.date || "1900-01-01";

    const dateB =
      b.date || "1900-01-01";

    return dateB.localeCompare(dateA);
  });

  const totalProgress =
    normalizedList.reduce(
      (sum, item) => sum + item.progress,
      0
    );

  const averageProgress =
    normalizedList.length
      ? Math.round(
          totalProgress /
          normalizedList.length
        )
      : 0;

  box.innerHTML = `

    <div class="task-dashboard">

      <div class="task-stat task-stat-total">
        <span>전체 업무</span>
        <strong>${normalizedList.length}</strong>
      </div>

      <div class="task-stat task-stat-waiting">
        <span>미시작·예정</span>
        <strong>${plannedList.length}</strong>
      </div>

      <div class="task-stat task-stat-working">
        <span>진행중</span>
        <strong>${workingList.length}</strong>
      </div>

      <div class="task-stat task-stat-delayed">
        <span>지연</span>
        <strong>${delayedList.length}</strong>
      </div>

      <div class="task-stat task-stat-done">
        <span>완료</span>
        <strong>${doneList.length}</strong>
      </div>

      <div class="task-stat task-stat-progress">
        <span>업무 진행률</span>
        <strong>${averageProgress}%</strong>
      </div>

    </div>

    <section class="task-section">

      <div class="task-section-title">
        <div>
          <h3>처리할 업무</h3>
          <p>
            지연 업무부터 우선 표시합니다.
          </p>
        </div>

        <span class="task-count task-count-active">
          ${unfinishedList.length}건
        </span>
      </div>

      <div class="active-task-list">
        ${
          unfinishedList.length
            ? unfinishedList
                .map(renderActiveTaskCard)
                .join("")
            : `
              <div class="schedule-empty">
                처리할 업무가 없습니다.
              </div>
            `
        }
      </div>

    </section>

    <section class="task-section completed-task-section">

      <div class="task-section-title">
        <div>
          <h3>완료 업무</h3>
          <p>
            최근 완료 업무부터 표시합니다.
          </p>
        </div>

        <span class="task-count task-count-done">
          ${doneList.length}건
        </span>
      </div>

      <div class="completed-task-list">
        ${
          doneList.length
            ? doneList
                .map(renderCompletedTaskCard)
                .join("")
            : `
              <div class="schedule-empty">
                완료된 업무가 없습니다.
              </div>
            `
        }
      </div>

    </section>
  `;
}

function getTaskStatusClass(status) {

  if (status === "완료") {
    return "done";
  }

  if (status === "지연") {
    return "delayed";
  }

  if (status === "진행중") {
    return "working";
  }

  return "waiting";
}


function renderActiveTaskCard(task) {

  const statusClass =
    getTaskStatusClass(task.displayStatus);

  return `
    <article class="active-task-card ${statusClass}">

      <div class="task-main-info">

        <div class="task-top-line">

          <span class="task-status-badge ${statusClass}">
            ${task.displayStatus}
          </span>

          <span class="task-category">
            ${safeText(task.category || "업무")}
          </span>

          <span class="task-date">
            마감 ${safeText(task.date || "-")}
          </span>

        </div>

        <h4>
          ${safeText(task.title || "업무명 없음")}
        </h4>

        <div class="task-detail-grid">

          <span>
            담당자
            <strong>
              ${safeText(task.owner || "-")}
            </strong>
          </span>

          <span>
            중요도
            <strong>
              ${safeText(task.priority || "보통")}
            </strong>
          </span>

          <span>
            지연사유
            <strong>
              ${safeText(task.delayReason || "-")}
            </strong>
          </span>

          <span>
            관리자 메모
            <strong>
              ${safeText(task.adminMemo || "-")}
            </strong>
          </span>

        </div>

        <div class="task-progress-line">

          <div class="task-progress-label">
            <span>진행률</span>
            <strong>${task.progress}%</strong>
          </div>

          <div class="progress-wrap">
            <div
              class="progress-bar"
              style="width:${task.progress}%">
            </div>
          </div>

        </div>

      </div>

      <div class="task-actions">

        <button
          type="button"
          class="task-action-button edit"
          onclick="updateTaskProgress('${safeText(task.taskId)}')">
          진행수정
        </button>

        <button
          type="button"
          class="task-action-button delay"
          onclick="delayTask('${safeText(task.taskId)}')">
          지연등록
        </button>

        <button
          type="button"
          class="task-action-button complete"
          onclick="completeTask('${safeText(task.taskId)}')">
          완료처리
        </button>

      </div>

    </article>
  `;
}


function renderCompletedTaskCard(task) {

  return `
    <article class="completed-task-card">

      <div class="task-top-line">

        <span class="task-status-badge done">
          완료
        </span>

        <span class="task-category">
          ${safeText(task.category || "업무")}
        </span>

      </div>

      <h4>
        ${safeText(task.title || "업무명 없음")}
      </h4>

      <div class="completed-task-meta">
        담당자 : ${safeText(task.owner || "-")}<br>
        완료일 : ${safeText(task.date || "-")}<br>
        최종수정 : ${safeText(task.updatedAt || "-")}
      </div>

      <div class="completed-progress">
        <span>진행률</span>
        <strong>100%</strong>
      </div>

    </article>
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

  setButtonLoading("saveExpenseBtn", true, "출납 내역 저장", "저장 중...");

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
  } finally {
  setButtonLoading("saveExpenseBtn", false, "출납 내역 저장", "저장 중...");
}
}

document.addEventListener("input", function(e) {
  if (!e.target || e.target.id !== "expenseAmount") return;

  const n = e.target.value.replace(/[^0-9]/g, "");
  e.target.value = n ? Number(n).toLocaleString() : "";
});

let expenses = [];

async function loadExpenses(){

  setButtonLoading(
    "loadExpenseBtn",
    true,
    "출납 내역 조회",
    "조회 중..."
  );

  const projectId =
  val("expenseLookupProjectId");

  if(!projectId){

    setButtonLoading(
      "loadExpenseBtn",
      false,
      "출납 내역 조회",
      "조회 중..."
    );

    alert("점포를 선택하세요.");
    return;
  }

  try{

    const data = await api({
      action:"getExpenses",
      projectId:projectId
    });

    expenses = data.expenses || [];

    renderExpenses();

  }catch(err){

    console.error(err);
    alert("출납 내역을 불러오지 못했습니다.");

  } finally {

    setButtonLoading(
      "loadExpenseBtn",
      false,
      "출납 내역 조회",
      "조회 중..."
    );

  }
}

function renderExpenses(){

  const box =
    document.getElementById("expenseList");

  let total = 0;
  let headOffice = 0;
  let store = 0;

  expenses.forEach(item => {

    const amount =
      Number(String(item.amount || "0")
      .replace(/,/g,""));

    total += amount;

    if(item.shareType === "본사부담"){
      headOffice += amount;
    }

    if(item.shareType === "점포부담"){
      store += amount;
    }
  });

  document.getElementById("expenseTotal").innerText =
    total.toLocaleString() + "원";

  document.getElementById("expenseHeadOffice").innerText =
    headOffice.toLocaleString() + "원";

  document.getElementById("expenseStore").innerText =
    store.toLocaleString() + "원";

  if(!box) return;

  if(expenses.length === 0){

    box.innerHTML = `
      <div class="project-card">
        등록된 출납내역이 없습니다.
      </div>
    `;

    return;
  }

  const categoryOrder = [
    "계약금",
    "보증금",
    "권리금",
    "설계비",
    "공사비",
    "전기/가스/수도",
    "집기/장비",
    "POS/전산",
    "초도물품",
    "인허가/수수료",
    "교육비",
    "인건비",
    "교통/출장비",
    "기타"
  ];

  const groupedExpenses = {};

  expenses.forEach(item => {

    const category =
      item.category || "미분류";

    if(!groupedExpenses[category]){
      groupedExpenses[category] = [];
    }

    groupedExpenses[category].push(item);
  });

  Object.keys(groupedExpenses).forEach(category => {

    groupedExpenses[category].sort((a, b) => {

      const da =
        a.expenseDate || "1900-01-01";

      const db =
        b.expenseDate || "1900-01-01";

      return db.localeCompare(da);
    });
  });

  const categories =
    Object.keys(groupedExpenses).sort((a, b) => {

      const indexA =
        categoryOrder.indexOf(a);

      const indexB =
        categoryOrder.indexOf(b);

      const orderA =
        indexA === -1
          ? categoryOrder.length
          : indexA;

      const orderB =
        indexB === -1
          ? categoryOrder.length
          : indexB;

      return orderA - orderB;
    });

  box.innerHTML =
    categories.map(category => {

      const categoryItems =
        groupedExpenses[category];

      const categoryTotal =
        categoryItems.reduce((sum, item) => {

          const amount =
            Number(String(item.amount || "0")
            .replace(/,/g,""));

          return sum + amount;

        }, 0);

      const itemCards =
        categoryItems.map(item => {

          const amount =
            Number(String(item.amount || "0")
            .replace(/,/g,""));

          return `
            <div class="project-card">

              <div class="project-title">
                ${item.expenseDate || "-"}
              </div>

              <div class="project-meta">

                거래처 : ${item.vendor || "-"}<br>
                금액 : ${amount.toLocaleString()}원<br>
                결제수단 : ${item.payMethod || "-"}<br>
                비용부담 : ${item.shareType || "-"}<br>
                증빙 : ${item.proof || "-"}<br>
                메모 : ${item.memo || "-"}

              </div>

            </div>
          `;

        }).join("");

      return `
        <div
          style="
            grid-column: 1 / -1;
            margin-top: 18px;
            padding: 16px 20px;
            border-radius: 12px;
            background: #8c2f0f;
            color: #ffffff;
          "
        >
          <strong style="font-size:22px;">
            ${category}
          </strong>

          <span style="margin-left:12px;">
            ${categoryItems.length}건 ·
            합계 ${categoryTotal.toLocaleString()}원
          </span>
        </div>

        ${itemCards}
      `;

    }).join("");
}

function setButtonLoading(btnId, isLoading, text, loadingText) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  btn.disabled = isLoading;
  btn.textContent = isLoading ? loadingText : text;
  btn.style.opacity = isLoading ? "0.65" : "1";
}
function setupChecklistTaskLinks() {

  const checklist =
    document.querySelector(
      ".opening-checklist"
    );

  if (!checklist) return;

  checklist.addEventListener(
    "change",
    function(event) {

      const checkbox =
        event.target;

      if (
        !checkbox.matches(
          '.checklist-item input[type="checkbox"]'
        )
      ) {
        return;
      }

      if (!checkbox.checked) {
        return;
      }

      const item =
        checkbox.closest(
          ".checklist-item"
        );

      const group =
        checkbox.closest(
          ".checklist-group"
        );

      if (!item || !group) {
        return;
      }

      const titleElement =
        item.querySelector(
          ".checklist-content strong"
        );

      const groupTitleElement =
        group.querySelector(
          ".checklist-group-title h3"
        );

      const taskTitle =
        titleElement
          ? titleElement.textContent.trim()
          : "";

      const groupTitle =
        groupTitleElement
          ? groupTitleElement.textContent.trim()
          : "";

      const categoryMap = {
        "계약·승인": "계약",
        "도면·시설": "도면",
        "공사": "공사",
        "집기·장비·물품": "집기/장비",
        "인허가": "인허가",
        "채용": "채용"
      };

      const taskCategory =
        categoryMap[groupTitle] || "";

      const taskTabButton =
        document.getElementById(
          "taskTabButton"
        );

      const categorySelect =
        document.getElementById(
          "taskCategory"
        );

      const titleInput =
        document.getElementById(
          "taskTitle"
        );

      if (taskTabButton) {
        showTab(
          "task",
          taskTabButton
        );
      }

      if (
        categorySelect &&
        taskCategory
      ) {
        categorySelect.value =
          taskCategory;
      }

      if (titleInput) {

        titleInput.value =
          taskTitle;

        titleInput.focus();
      }

      /*
       * 이 체크박스는 완료처리가 아니라
       * 업무등록 화면으로 이동하는 기능이므로
       * 체크상태를 다시 해제합니다.
       */
      checkbox.checked = false;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );
}
function printScheduleReport() {

  const projectSelect =
    document.getElementById(
      "scheduleProjectId"
    );

  const scheduleList =
    document.getElementById(
      "scheduleList"
    );

  if (
    !projectSelect ||
    !projectSelect.value
  ) {
    alert("인쇄할 점포를 선택하세요.");
    return;
  }

  if (
    !scheduleList ||
    !scheduleList.querySelector(
      ".task-dashboard"
    )
  ) {
    alert("먼저 업무현황을 조회하세요.");
    return;
  }

  const selectedOption =
    projectSelect.options[
      projectSelect.selectedIndex
    ];

  const storeName =
    selectedOption
      ? selectedOption.textContent.trim()
      : "선택 점포";

  const today =
    new Date();

  const printDate =
    today.getFullYear() + "년 " +
    String(today.getMonth() + 1)
      .padStart(2, "0") + "월 " +
    String(today.getDate())
      .padStart(2, "0") + "일";

  document.getElementById(
    "printScheduleStoreName"
  ).textContent =
    storeName + " 개설 업무 진행현황";

  document.getElementById(
    "printScheduleDate"
  ).textContent =
    "출력일 : " + printDate;

  document.body.classList.add(
    "printing-schedule"
  );

  const originalTitle =
    document.title;

  document.title =
    storeName + " 개설 업무 진행현황";

  const finishPrint = function() {

    document.body.classList.remove(
      "printing-schedule"
    );

    document.title =
      originalTitle;

    window.removeEventListener(
      "afterprint",
      finishPrint
    );
  };

  window.addEventListener(
    "afterprint",
    finishPrint
  );

  window.print();
}