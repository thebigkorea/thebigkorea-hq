const API_URL =
  "https://script.google.com/macros/s/AKfycbx1Yc28RHFH_rsl11OnZCyVPH7QvzjEI36lzjqhXZZUQSQMEo-n4fs--bEjPxI5Zbd4/exec";

let projects = [];
let tasks = [];
let checklistItems = [];
let taskProcessHistories = [];

document.addEventListener("DOMContentLoaded", () => {
  setupChecklistTaskLinks();
  loadInitialData();
});

function showTab(id, btn) {
  document.querySelectorAll(".panel")
    .forEach(p => p.classList.remove("active"));

  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

  document.getElementById(id).classList.add("active");
  btn.classList.add("active");


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



const CACHE_TTL = 5 * 60 * 1000;
let projectsLoadedAt = 0;
let checklistLoadedAt = 0;

async function loadInitialData() {
  const checklistBox = document.getElementById("openingChecklist");
  if (checklistBox) {
    checklistBox.innerHTML = `
      <div class="checklist-loading">
        신규점포 데이터를 불러오는 중입니다...
      </div>
    `;
  }

  try {
    const data = await api({ action: "getOpeningBootstrap" });

    if (!data || data.success === false) {
      throw new Error(data && data.message ? data.message : "초기 데이터 조회 실패");
    }

    projects = Array.isArray(data.projects) ? data.projects : [];
    checklistItems = Array.isArray(data.checklistItems) ? data.checklistItems : [];

    const now = Date.now();
    projectsLoadedAt = now;
    checklistLoadedAt = now;

    renderProjects();
    renderChecklistItems();
  } catch (err) {
    console.error(err);
    // 구버전 Apps Script가 잠시 남아 있어도 화면은 동작하도록 fallback
    await Promise.all([
      loadProjects(true),
      loadChecklistItems(true)
    ]);
  }
}

function renderProjects() {
  document.getElementById("totalProjects").textContent = projects.length;

  let activeProjectCount = 0;
  let openSoonCount = 0;
  const list = document.getElementById("projectList");
  if (list) list.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cards = [];

  projects.forEach(p => {
    const progress = Number(p.progress || 0);

    if (p.status !== "오픈완료" && progress < 100) {
      activeProjectCount++;
    }

    if (p.openDate) {
      const openDate = new Date(p.openDate + "T00:00:00");
      const diffDays = Math.ceil((openDate - today) / 86400000);
      if (diffDays >= 0 && diffDays <= 30) openSoonCount++;
    }

    cards.push(`
      <div class="project-card project-card-clickable"
           role="button"
           tabindex="0"
           onclick="openProjectDetail('${safeText(p.projectId)}')"
           onkeydown="if(event.key==='Enter'){openProjectDetail('${safeText(p.projectId)}')}">
        <div class="project-title">${safeText(p.storeName || "")}</div>
        <div class="project-meta">
          브랜드 : ${safeText(p.brand || "")}<br>
          유통사 : ${safeText(p.retailer || "")}<br>
          담당 : ${safeText(p.owner || "")}<br>
          오픈예정 : ${safeText(p.openDate || "")}<br>
          상태 : ${safeText(p.status || "")}<br>
          진행률 : ${progress}%
        </div>
        <div class="progress-wrap">
          <div class="progress-bar" style="width:${Math.max(0, Math.min(100, progress))}%"></div>
        </div>
      </div>
    `);
  });

  if (list) list.innerHTML = cards.join("");

  const activeEl = document.getElementById("avgProgress");
  if (activeEl) activeEl.textContent = activeProjectCount;

  const openSoonEl = document.getElementById("openSoon");
  if (openSoonEl) openSoonEl.textContent = openSoonCount;

  fillProjectSelects();
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
  loadProjects(true);
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

  await loadProjects(true);
  if (val("scheduleProjectId")) {
    await loadSchedule();
  }
}

async function loadProjects(force = false) {
  if (!force && projects.length && (Date.now() - projectsLoadedAt) < CACHE_TTL) {
    renderProjects();
    return projects;
  }

  const data = await api({
    action: "getStoreOpenings"
  });

  projects = Array.isArray(data.projects) ? data.projects : [];
  projectsLoadedAt = Date.now();
  renderProjects();
  return projects;
}


function openProjectDetail(projectId) {
  const p = projects.find(row => String(row.projectId) === String(projectId));
  if (!p) {
    alert("점포 정보를 찾지 못했습니다.");
    return;
  }

  document.getElementById("detailProjectId").value = p.projectId || "";
  document.getElementById("projectDetailTitle").textContent =
    (p.storeName || "점포") + " 상세정보";

  const memo = safeText(p.memo || "등록된 메모·주의사항이 없습니다.").replace(/\n/g, "<br>");

  document.getElementById("projectDetailBody").innerHTML = `
    <div class="project-detail-grid">
      ${detailItem("브랜드", p.brand)}
      ${detailItem("점포명", p.storeName)}
      ${detailItem("유통사", p.retailer)}
      ${detailItem("위치", p.location)}
      ${detailItem("MD 담당자", p.mdName)}
      ${detailItem("내부 담당자", p.owner)}
      ${detailItem("계약예정일", p.contractDate)}
      ${detailItem("공사시작일", p.constructionStart)}
      ${detailItem("가오픈일", p.preOpenDate)}
      ${detailItem("정식오픈일", p.openDate)}
      ${detailItem("현재상태", p.status)}
      ${detailItem("진행률", (p.progress || 0) + "%")}
    </div>

    <div class="project-detail-memo">
      <div class="project-detail-memo-title">메모 · 주의사항</div>
      <div class="project-detail-memo-content">${memo}</div>
    </div>
  `;

  const modal = document.getElementById("projectDetailModal");
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function detailItem(label, value) {
  return `
    <div class="project-detail-item">
      <span>${safeText(label)}</span>
      <strong>${safeText(value || "-")}</strong>
    </div>
  `;
}

function closeProjectDetailModal() {
  const modal = document.getElementById("projectDetailModal");
  if (modal) modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function editProjectFromDetail() {
  const projectId = val("detailProjectId");
  const p = projects.find(row => String(row.projectId) === String(projectId));
  if (!p) return;

  const projectTab = Array.from(document.querySelectorAll(".tab"))
    .find(btn => btn.textContent.includes("점포등록"));

  closeProjectDetailModal();
  if (projectTab) showTab("project", projectTab);

  const values = {
    brand: p.brand,
    storeName: p.storeName,
    retailer: p.retailer,
    location: p.location,
    mdName: p.mdName,
    owner: p.owner,
    contractDate: p.contractDate,
    constructionStart: p.constructionStart,
    preOpenDate: p.preOpenDate,
    openDate: p.openDate,
    status: p.status,
    progress: p.progress,
    projectMemo: p.memo
  };

  Object.entries(values).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.value = value || "";
  });

  // 현재 서버 저장 방식은 신규등록 중심이므로 수정 화면임을 사용자에게 표시합니다.
  const title = document.querySelector("#project h2");
  if (title) title.textContent = "신규점포 정보 확인 · 수정";
}

function openProjectSchedule() {
  const projectId = val("detailProjectId");
  if (!projectId) return;

  const scheduleTab = Array.from(document.querySelectorAll(".tab"))
    .find(btn => btn.textContent.includes("업무현황"));

  closeProjectDetailModal();
  if (scheduleTab) showTab("schedule", scheduleTab);

  const select = document.getElementById("scheduleProjectId");
  if (select) {
    select.value = projectId;
    loadSchedule();
  }
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
      업무처리현황을 불러오는 중입니다...
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
            : "업무처리현황을 불러오지 못했습니다."}
        </div>
      `;

      return;
    }

    const schedules =
      Array.isArray(data.schedules)
        ? data.schedules
        : [];

    taskProcessHistories =
      Array.isArray(data.histories)
        ? data.histories
        : [];

    renderSchedule(schedules);

  } catch (err) {

    console.error(err);

    box.innerHTML = `
      <div class="schedule-empty">
        업무처리현황을 불러오지 못했습니다.
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



function renderTaskProcessHistory(taskId) {
  const rows = taskProcessHistories
    .filter(row => String(row.taskId) === String(taskId))
    .sort((a,b) => String(b.processedAt || "").localeCompare(String(a.processedAt || "")));

  if (!rows.length) return "";

  return `
    <div class="task-process-history">
      <strong>업무 처리이력</strong>
      ${rows.map(row => `
        <div class="task-process-history-item">
          <span>${safeText(row.processedAt || "")} · ${safeText(row.status || "")}</span>
          <p>${safeText(row.processContent || "-")}</p>
          ${row.followUp ? `<small>후속조치: ${safeText(row.followUp)}</small>` : ""}
          ${row.issue ? `<small>특이사항/문제점: ${safeText(row.issue)}</small>` : ""}
        </div>
      `).join("")}
    </div>
  `;
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

        ${renderTaskProcessHistory(task.taskId)}

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

      ${renderTaskProcessHistory(task.taskId)}

    </article>
  `;
}


async function updateTaskProgress(taskId) {
  if (!taskId) return alert("업무 ID가 없습니다.");

  let progress = prompt("현재 진행률을 입력하세요. 예: 30, 50, 80");
  if (progress === null) return;
  progress = Math.max(0, Math.min(100, Number(String(progress).replace(/[^0-9]/g, "") || 0)));

  const processContent = prompt("이번에 처리한 업무 내용을 구체적으로 입력하세요.", "");
  if (processContent === null || !processContent.trim()) {
    return alert("업무 처리내용을 입력하세요.");
  }
  const followUp = prompt("후속조치 또는 다음 할 일을 입력하세요.", "") || "";
  const status = progress >= 100 ? "완료" : "진행중";

  const data = await api({
    action: "processOpeningTask",
    taskId,
    status,
    progress,
    processContent,
    followUp,
    issue: ""
  });

  alert(data.message || "업무 처리내용이 등록되었습니다.");
  await Promise.all([loadProjects(true), loadSchedule()]);
}
async function delayTask(taskId) {
  if (!taskId) return alert("업무 ID가 없습니다.");

  const issue = prompt("지연 사유 또는 문제점을 입력하세요.", "");
  if (issue === null || !issue.trim()) return;

  let progress = prompt("현재 진행률을 입력하세요.", "0");
  if (progress === null) return;
  progress = Math.max(0, Math.min(100, Number(String(progress).replace(/[^0-9]/g, "") || 0)));

  const processContent = prompt("현재까지 처리한 내용을 입력하세요.", "") || "";
  const followUp = prompt("후속조치 또는 해결계획을 입력하세요.", "") || "";

  const data = await api({
    action: "processOpeningTask",
    taskId,
    status: "지연",
    progress,
    processContent,
    followUp,
    issue
  });

  alert(data.message || "지연 처리내용이 등록되었습니다.");
  await Promise.all([loadProjects(true), loadSchedule()]);
}
async function completeTask(taskId) {
  if (!taskId) return alert("업무 ID가 없습니다.");
  if (!confirm("이 업무를 완료 처리하시겠습니까?")) return;

  const processContent = prompt("최종 업무 처리내용을 입력하세요.", "");
  if (processContent === null || !processContent.trim()) {
    return alert("완료 처리내용을 입력하세요.");
  }
  const followUp = prompt("후속조치가 있으면 입력하세요.", "") || "";

  const data = await api({
    action: "processOpeningTask",
    taskId,
    status: "완료",
    progress: "100",
    processContent,
    followUp,
    issue: ""
  });

  alert(data.message || "업무가 완료 처리되었습니다.");
  await Promise.all([loadProjects(true), loadSchedule()]);
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

      if (!val("taskProjectId")) {
        alert("먼저 업무등록 대상 점포를 선택하세요.");
        checkbox.checked = false;
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
    storeName + " 개설 업무처리현황";

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
    storeName + " 개설 업무처리현황";

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
const CHECKLIST_GROUPS = [

  {
    groupName: "계약·승인",
    taskCategory: "계약",
    number: "01",
    description:
      "계약 체결부터 브랜드·유통사 승인까지"
  },

  {
    groupName: "도면·시설",
    taskCategory: "도면",
    number: "02",
    description:
      "시설조건과 공사범위를 사전에 확정합니다."
  },

  {
    groupName: "공사",
    taskCategory: "공사",
    number: "03",
    description:
      "철수부터 공사완료까지 일정을 관리합니다."
  },

  {
    groupName: "집기·장비·물품",
    taskCategory: "집기/장비",
    number: "04",
    description:
      "영업에 필요한 장비와 물품을 준비합니다."
  },

  {
    groupName: "인허가",
    taskCategory: "인허가",
    number: "05",
    description:
      "영업에 필요한 신고와 행정절차를 완료합니다."
  },

  {
    groupName: "채용",
    taskCategory: "채용",
    number: "06",
    description:
      "오픈일에 맞춰 필요한 인력을 확보합니다."
  }

];


async function loadChecklistItems(force = false) {

  const box =
    document.getElementById(
      "openingChecklist"
    );

  if (!box) return;

  if (!force && checklistItems.length && (Date.now() - checklistLoadedAt) < CACHE_TTL) {
    renderChecklistItems();
    return checklistItems;
  }

  box.innerHTML = `
    <div class="checklist-loading">
      체크리스트를 불러오는 중입니다...
    </div>
  `;

  try {

    const data = await api({
      action: "getChecklistItems"
    });

    if (
      !data ||
      data.success === false
    ) {

      box.innerHTML = `
        <div class="checklist-loading">
          ${
            data && data.message
              ? safeText(data.message)
              : "체크리스트를 불러오지 못했습니다."
          }
        </div>
      `;

      return;
    }

    checklistItems =
      Array.isArray(data.items)
        ? data.items
        : [];

    checklistLoadedAt = Date.now();
    renderChecklistItems();
    return checklistItems;

  } catch (err) {

    console.error(err);

    box.innerHTML = `
      <div class="checklist-loading">
        체크리스트를 불러오지 못했습니다.
      </div>
    `;
  }
}


function renderChecklistItems() {

  const box =
    document.getElementById(
      "openingChecklist"
    );

  if (!box) return;

  const countElement =
    document.getElementById(
      "checklistTotalCount"
    );

  if (countElement) {
    countElement.textContent =
      checklistItems.length;
  }

  box.innerHTML =
    CHECKLIST_GROUPS
      .map(group => {

        const groupItems =
          checklistItems
            .filter(item =>
              item.groupName ===
              group.groupName
            )
            .sort((a, b) =>
              Number(a.sortOrder || 0) -
              Number(b.sortOrder || 0)
            );

        const itemHtml =
          groupItems.length
            ? groupItems
                .map(item =>
                  renderChecklistItem(item)
                )
                .join("")
            : `
              <div class="checklist-empty">
                등록된 항목이 없습니다.
              </div>
            `;

        return `
          <section
            class="checklist-group"
            data-group-name="${safeText(group.groupName)}">

            <div class="checklist-group-title">

              <span class="checklist-icon">
                ${group.number}
              </span>

              <div class="checklist-group-info">

                <h3>
                  ${safeText(group.groupName)}
                </h3>

                <p>
                  ${safeText(group.description)}
                </p>

              </div>

              <button
                type="button"
                class="checklist-add-button"
                onclick="openChecklistModalForAdd('${group.groupName}')">
                + 신규항목
              </button>

            </div>

            <div class="checklist-items">
              ${itemHtml}
            </div>

          </section>
        `;

      })
      .join("");
}


function renderChecklistItem(item) {

  return `
    <div
      class="checklist-item"
      data-checklist-id="${safeText(item.checklistId)}">

      <label class="checklist-task-link">

        <input type="checkbox">

        <span class="checkmark"></span>

        <span class="checklist-content">

          <strong>
            ${safeText(item.title)}
          </strong>

          <small>
            ${safeText(item.description || "-")}
          </small>

        </span>

      </label>

      <button
        type="button"
        class="checklist-edit-button"
        onclick="openChecklistModalForEdit('${item.checklistId}')">
        수정
      </button>

    </div>
  `;
}


function getChecklistGroup(groupName) {

  return CHECKLIST_GROUPS.find(
    group =>
      group.groupName === groupName
  );
}


function openChecklistModalForAdd(
  groupName
) {

  const group =
    getChecklistGroup(groupName);

  if (!group) return;

  const sameGroupItems =
    checklistItems.filter(
      item =>
        item.groupName === groupName
    );

  const maxOrder =
    sameGroupItems.reduce(
      (max, item) =>
        Math.max(
          max,
          Number(item.sortOrder || 0)
        ),
      0
    );

  document.getElementById(
    "checklistModalTitle"
  ).textContent =
    "체크리스트 신규항목 추가";

  document.getElementById(
    "checklistId"
  ).value = "";

  document.getElementById(
    "checklistGroupName"
  ).value =
    group.groupName;

  document.getElementById(
    "checklistTaskCategory"
  ).value =
    group.taskCategory;

  document.getElementById(
    "checklistSortOrder"
  ).value =
    maxOrder + 1;

  document.getElementById(
    "checklistTitle"
  ).value = "";

  document.getElementById(
    "checklistDescription"
  ).value = "";

  document.getElementById(
    "disableChecklistBtn"
  ).classList.add("hidden");

  openChecklistModal();
}


function openChecklistModalForEdit(
  checklistId
) {

  const item =
    checklistItems.find(
      row =>
        row.checklistId === checklistId
    );

  if (!item) {
    alert(
      "수정할 체크리스트 항목을 찾지 못했습니다."
    );
    return;
  }

  document.getElementById(
    "checklistModalTitle"
  ).textContent =
    "체크리스트 항목 수정";

  document.getElementById(
    "checklistId"
  ).value =
    item.checklistId;

  document.getElementById(
    "checklistGroupName"
  ).value =
    item.groupName;

  document.getElementById(
    "checklistTaskCategory"
  ).value =
    item.taskCategory;

  document.getElementById(
    "checklistSortOrder"
  ).value =
    Number(item.sortOrder || 1);

  document.getElementById(
    "checklistTitle"
  ).value =
    item.title || "";

  document.getElementById(
    "checklistDescription"
  ).value =
    item.description || "";

  document.getElementById(
    "disableChecklistBtn"
  ).classList.remove("hidden");

  openChecklistModal();
}


function openChecklistModal() {

  const modal =
    document.getElementById(
      "checklistModal"
    );

  if (!modal) return;

  modal.classList.remove("hidden");

  document.body.classList.add(
    "modal-open"
  );

  setTimeout(() => {

    document.getElementById(
      "checklistTitle"
    )?.focus();

  }, 50);
}


function closeChecklistModal() {

  const modal =
    document.getElementById(
      "checklistModal"
    );

  if (!modal) return;

  modal.classList.add("hidden");

  document.body.classList.remove(
    "modal-open"
  );
}


async function saveChecklistItemFromModal() {

  const checklistId =
    val("checklistId");

  const groupName =
    val("checklistGroupName");

  const taskCategory =
    val("checklistTaskCategory");

  const title =
    val("checklistTitle");

  const description =
    val("checklistDescription");

  const sortOrder =
    val("checklistSortOrder");

  if (!title) {
    alert("업무명을 입력하세요.");
    return;
  }

  setButtonLoading(
    "saveChecklistBtn",
    true,
    "저장",
    "저장 중..."
  );

  try {

    const response = await fetch(
      API_URL,
      {
        method: "POST",
        body: JSON.stringify({
          action: "saveChecklistItem",
          checklistId: checklistId,
          groupName: groupName,
          taskCategory: taskCategory,
          title: title,
          description: description,
          sortOrder: sortOrder,
          useYn: "Y"
        })
      }
    );

    const data =
      await response.json();

    if (!data.success) {
      alert(
        data.message ||
        "체크리스트 저장에 실패했습니다."
      );
      return;
    }

    alert(
      data.message ||
      "체크리스트가 저장되었습니다."
    );

    closeChecklistModal();

    await loadChecklistItems(true);

  } catch (err) {

    console.error(err);

    alert(
      "체크리스트 저장 중 오류가 발생했습니다."
    );

  } finally {

    setButtonLoading(
      "saveChecklistBtn",
      false,
      "저장",
      "저장 중..."
    );

  }
}


async function disableChecklistItem() {

  const checklistId =
    val("checklistId");

  if (!checklistId) return;

  const confirmed =
    confirm(
      "이 항목을 사용중지하시겠습니까?\n체크리스트 화면에서 숨겨집니다."
    );

  if (!confirmed) return;

  setButtonLoading(
    "disableChecklistBtn",
    true,
    "사용중지",
    "처리 중..."
  );

  try {

    const response = await fetch(
      API_URL,
      {
        method: "POST",
        body: JSON.stringify({
          action: "saveChecklistItem",
          checklistId: checklistId,
          groupName:
            val("checklistGroupName"),
          taskCategory:
            val("checklistTaskCategory"),
          title:
            val("checklistTitle"),
          description:
            val("checklistDescription"),
          sortOrder:
            val("checklistSortOrder"),
          useYn: "N"
        })
      }
    );

    const data =
      await response.json();

    if (!data.success) {
      alert(
        data.message ||
        "사용중지 처리에 실패했습니다."
      );
      return;
    }

    alert(
      data.message ||
      "사용중지 처리되었습니다."
    );

    closeChecklistModal();

    await loadChecklistItems(true);

  } catch (err) {

    console.error(err);

    alert(
      "사용중지 처리 중 오류가 발생했습니다."
    );

  } finally {

    setButtonLoading(
      "disableChecklistBtn",
      false,
      "사용중지",
      "처리 중..."
    );

  }
}


document.addEventListener(
  "keydown",
  function(event) {

    if (event.key !== "Escape") {
      return;
    }

    const modal =
      document.getElementById(
        "checklistModal"
      );

    if (
      modal &&
      !modal.classList.contains(
        "hidden"
      )
    ) {
      closeChecklistModal();
    }

  }
);