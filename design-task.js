const API_URL =
  "https://script.google.com/macros/s/AKfycbwBT9t47oyGSXCahuJAfqx0LV08wmOQuACFyL_yHcJWCuXSTua2quhgDHPjqFdNV8JQ/exec";

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  setToday();
  loadTasks();
});

function showTab(id, btn){

  document.querySelectorAll(".panel")
    .forEach(p => p.classList.remove("active"));

  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

  document.getElementById(id).classList.add("active");
  btn.classList.add("active");

  if(id === "list"){
    loadTasks();
  }

  if(id === "done"){
    renderDoneTasks();
  }
}

function setToday(){
  const today = new Date().toISOString().slice(0,10);

  const requestDate = document.getElementById("requestDate");
  if(requestDate && !requestDate.value){
    requestDate.value = today;
  }
}

async function saveTask(){

  const data = {
    action:"save",
    storeName: getValue("storeName"),
    category: getValue("category"),
    title: getValue("title"),
    requester: getValue("requester"),
    owner: getValue("owner"),
    requestDate: getValue("requestDate"),
    dueDate: getValue("dueDate"),
    priority: getValue("priority"),
    status: getValue("status"),
    progress: getValue("progress") || "0",
    detail: getValue("detail"),
    delayReason: getValue("delayReason"),
    feedback: getValue("feedback")
  };

  if(!data.storeName){
    alert("관련 점포를 선택하세요.");
    return;
  }

  if(!data.title){
    alert("업무명을 입력하세요.");
    return;
  }

  if(!data.dueDate){
    alert("목표일을 입력하세요.");
    return;
  }

  try{
    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify(data)
    });

    const result = await res.json();

    if(result.success){
      alert("디자인 업무가 저장되었습니다.");
      clearForm();
      await loadTasks();
      showTab("list", document.querySelectorAll(".tab")[1]);
    }else{
      alert(result.message || "저장에 실패했습니다.");
    }

  }catch(err){
    alert("저장 중 오류가 발생했습니다.");
    console.error(err);
  }
}

async function loadTasks(){

  try{
    const res = await fetch(API_URL + "?action=list&t=" + Date.now());
    tasks = await res.json();

    if(!Array.isArray(tasks)){
      tasks = [];
    }

    renderSummary();
    renderTasks();

  }catch(err){
    console.error(err);
    alert("업무 목록을 불러오지 못했습니다.");
  }
}

function renderSummary(){

  const today = getTodayDate();

  const active = tasks.filter(t =>
    t.status !== "완료"
  ).length;

  const urgent = tasks.filter(t =>
    t.priority === "긴급" && t.status !== "완료"
  ).length;

  const overdue = tasks.filter(t => {
    if(!t.dueDate || t.status === "완료") return false;
    return new Date(t.dueDate) < today;
  }).length;

  const done = tasks.filter(t =>
    t.status === "완료"
  ).length;

  setText("activeCount", active);
  setText("urgentCount", urgent);
  setText("overdueCount", overdue);
  setText("doneCount", done);
}

function renderTasks(){

  const box = document.getElementById("taskList");
  if(!box) return;

  const statusFilter = getValue("filterStatus");
  const priorityFilter = getValue("filterPriority");
  const storeFilter = getValue("filterStore");

  let list = tasks.filter(t => t.status !== "완료");

  if(statusFilter){
    list = list.filter(t => t.status === statusFilter);
  }

  if(priorityFilter){
    list = list.filter(t => t.priority === priorityFilter);
  }

  if(storeFilter){
    list = list.filter(t => t.storeName === storeFilter);
  }

  list.sort((a,b) => {
    const da = a.dueDate || "9999-12-31";
    const db = b.dueDate || "9999-12-31";
    return da.localeCompare(db);
  });

  if(list.length === 0){
    box.innerHTML = "<p>진행중인 디자인 업무가 없습니다.</p>";
    return;
  }

  const today = getTodayDate();

  box.innerHTML = list.map(t => taskCardHtml(t, today)).join("");
}

function taskCardHtml(t, today){

  const overdue =
    t.dueDate &&
    t.status !== "완료" &&
    new Date(t.dueDate) < today;

  const progress =
    Number(t.progress || 0);

  let badge = "";

  if(t.status === "지연" || overdue){
    badge = `<span class="badge danger">지연</span>`;
  }else if(t.priority === "긴급"){
    badge = `<span class="badge danger">긴급</span>`;
  }else if(t.priority === "중요"){
    badge = `<span class="badge warning">중요</span>`;
  }else{
    badge = `<span class="badge">진행</span>`;
  }

  return `
    <div class="task-card">

      <h3>${badge}${escapeHtml(t.title || "")}</h3>

      <p><b>관련 점포:</b> ${escapeHtml(t.storeName || "-")}</p>
      <p><b>업무유형:</b> ${escapeHtml(t.category || "-")}</p>
      <p><b>요청자:</b> ${escapeHtml(t.requester || "-")}</p>
      <p><b>디자인 담당자:</b> ${escapeHtml(t.owner || "-")}</p>
      <p><b>요청일:</b> ${escapeHtml(t.requestDate || "-")}</p>
      <p><b>목표일:</b> ${escapeHtml(t.dueDate || "-")}</p>
      <p><b>중요도:</b> ${escapeHtml(t.priority || "-")}</p>
      <p><b>현재 상태:</b> ${escapeHtml(t.status || "-")}</p>

      <label>진행률(%)
        <input type="number"
               id="progress_${t.id}"
               value="${progress}"
               min="0"
               max="100">
      </label>

      <div class="progress-wrap">
        <div class="progress-bar" style="width:${progress}%"></div>
      </div>

      <p><b>관리자 상세 요청사항</b></p>
      <div class="memo-box">${escapeHtml(t.detail || "-")}</div>

      <p><b>지연사유</b></p>
      <textarea id="delay_${t.id}">${escapeHtml(t.delayReason || "")}</textarea>

      <p><b>디자인팀 피드백</b></p>
      <textarea id="feedback_${t.id}">${escapeHtml(t.feedback || "")}</textarea>

      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">

        <button class="small-btn" onclick="updateProgress('${t.id}')">
          진행수정
        </button>

        <button class="small-btn warning-btn" onclick="delayTask('${t.id}')">
          지연등록
        </button>

        <button class="small-btn" onclick="updateFeedback('${t.id}')">
          피드백 저장
        </button>

        <button class="small-btn done-btn" onclick="completeTask('${t.id}')">
          완료처리
        </button>

      </div>

    </div>
  `;
}

async function updateProgress(id){

  const progress =
    document.getElementById("progress_" + id)?.value || "0";

  const feedback =
    document.getElementById("feedback_" + id)?.value || "";

  try{
    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify({
        action:"updateProgress",
        id,
        progress,
        feedback,
        status: Number(progress) >= 100 ? "완료" : "진행중"
      })
    });

    const result = await res.json();

    if(result.success){
      alert("진행률이 수정되었습니다.");
      await loadTasks();
    }else{
      alert(result.message || "진행률 수정 실패");
    }

  }catch(err){
    console.error(err);
    alert("진행률 수정 중 오류가 발생했습니다.");
  }
}

async function delayTask(id){

  const progress =
    document.getElementById("progress_" + id)?.value || "0";

  const delayReason =
    document.getElementById("delay_" + id)?.value ||
    prompt("지연사유를 입력하세요.", "") ||
    "";

  if(!delayReason){
    alert("지연사유를 입력하세요.");
    return;
  }

  try{
    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify({
        action:"delayTask",
        id,
        status:"지연",
        progress,
        delayReason
      })
    });

    const result = await res.json();

    if(result.success){
      alert("지연으로 등록되었습니다.");
      await loadTasks();
    }else{
      alert(result.message || "지연 등록 실패");
    }

  }catch(err){
    console.error(err);
    alert("지연 등록 중 오류가 발생했습니다.");
  }
}

async function completeTask(id){

  const ok =
    confirm("이 디자인 업무를 완료 처리하시겠습니까?");

  if(!ok) return;

  const feedback =
    document.getElementById("feedback_" + id)?.value || "";

  try{
    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify({
        action:"completeTask",
        id,
        status:"완료",
        progress:"100",
        feedback,
        completedAt:getTodayString()
      })
    });

    const result = await res.json();

    if(result.success){
      alert("업무가 완료 처리되었습니다.");
      await loadTasks();
    }else{
      alert(result.message || "완료 처리 실패");
    }

  }catch(err){
    console.error(err);
    alert("완료 처리 중 오류가 발생했습니다.");
  }
}

async function updateStatus(id, status){

  try{
    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify({
        action:"updateStatus",
        id,
        status
      })
    });

    const result = await res.json();

    if(result.success){
      await loadTasks();
    }else{
      alert(result.message || "상태 변경 실패");
    }

  }catch(err){
    console.error(err);
    alert("상태 변경 중 오류가 발생했습니다.");
  }
}

async function updateFeedback(id){

  const el = document.getElementById("feedback_" + id);
  const feedback = el ? el.value : "";

  try{
    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify({
        action:"updateFeedback",
        id,
        feedback
      })
    });

    const result = await res.json();

    if(result.success){
      alert("피드백이 저장되었습니다.");
      await loadTasks();
    }else{
      alert(result.message || "피드백 저장 실패");
    }

  }catch(err){
    console.error(err);
    alert("피드백 저장 중 오류가 발생했습니다.");
  }
}

function renderDoneTasks(){

  const box =
    document.getElementById("doneTaskList");

  if(!box) return;

  const store =
    getValue("doneStore");

  const start =
    getValue("doneStartDate");

  const end =
    getValue("doneEndDate");

  let list =
    tasks.filter(t => t.status === "완료");

  if(store){
    list = list.filter(t => t.storeName === store);
  }

  if(start){
    list = list.filter(t =>
      (t.completedAt || t.dueDate || "") >= start
    );
  }

  if(end){
    list = list.filter(t =>
      (t.completedAt || t.dueDate || "") <= end
    );
  }

  list.sort((a,b) => {
    const da = a.completedAt || a.dueDate || "1900-01-01";
    const db = b.completedAt || b.dueDate || "1900-01-01";
    return db.localeCompare(da);
  });

  if(list.length === 0){
    box.innerHTML = "<p>조회된 완료 업무가 없습니다.</p>";
    return;
  }

  box.innerHTML = list.map(t => `
    <div class="task-card">
      <h3><span class="badge done">완료</span>${escapeHtml(t.title || "")}</h3>
      <p><b>관련 점포:</b> ${escapeHtml(t.storeName || "-")}</p>
      <p><b>업무유형:</b> ${escapeHtml(t.category || "-")}</p>
      <p><b>요청자:</b> ${escapeHtml(t.requester || "-")}</p>
      <p><b>디자인 담당자:</b> ${escapeHtml(t.owner || "-")}</p>
      <p><b>요청일:</b> ${escapeHtml(t.requestDate || "-")}</p>
      <p><b>목표일:</b> ${escapeHtml(t.dueDate || "-")}</p>
      <p><b>완료일:</b> ${escapeHtml(t.completedAt || "-")}</p>
      <p><b>진행률:</b> ${escapeHtml(t.progress || "100")}%</p>
      <p><b>요청사항:</b></p>
      <div class="memo-box">${escapeHtml(t.detail || "-")}</div>
      <p><b>피드백:</b></p>
      <div class="memo-box">${escapeHtml(t.feedback || "-")}</div>
    </div>
  `).join("");
}

function statusOptions(current){
  const list = [
    "요청",
    "확인중",
    "진행중",
    "피드백대기",
    "수정중",
    "지연",
    "완료",
    "보류"
  ];

  return list.map(s =>
    `<option ${s === current ? "selected" : ""}>${s}</option>`
  ).join("");
}

function clearForm(){
  [
    "title",
    "requester",
    "dueDate",
    "detail",
    "delayReason",
    "feedback"
  ].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = "";
  });

  document.getElementById("storeName").value = "";
  document.getElementById("category").value = "간판";
  document.getElementById("priority").value = "보통";
  document.getElementById("status").value = "요청";
  document.getElementById("progress").value = "0";
  document.getElementById("owner").value = "김병식";

  setToday();
}

function getValue(id){
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.innerText = value;
}

function getTodayDate(){
  const today = new Date();
  today.setHours(0,0,0,0);
  return today;
}

function getTodayString(){
  return new Date().toISOString().slice(0,10);
}

function escapeHtml(value){
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}