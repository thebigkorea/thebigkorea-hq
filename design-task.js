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
    detail: getValue("detail"),
    feedback: getValue("feedback")
  };

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
      loadTasks();
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
    const res = await fetch(API_URL + "?action=list");
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

  const total = tasks.length;

  const urgent = tasks.filter(t =>
    t.priority === "긴급" && t.status !== "완료"
  ).length;

  const overdue = tasks.filter(t => {
    if(!t.dueDate || t.status === "완료") return false;
    return new Date(t.dueDate) < today;
  }).length;

  document.getElementById("totalCount").innerText = total;
  document.getElementById("urgentCount").innerText = urgent;
  document.getElementById("overdueCount").innerText = overdue;
}

function renderTasks(){

  const box = document.getElementById("taskList");
  if(!box) return;

  const statusFilter = document.getElementById("filterStatus").value;
  const priorityFilter = document.getElementById("filterPriority").value;

  let list = tasks.slice();

  if(statusFilter){
    list = list.filter(t => t.status === statusFilter);
  }

  if(priorityFilter){
    list = list.filter(t => t.priority === priorityFilter);
  }

  list.sort((a,b) => {
    const da = a.dueDate || "9999-12-31";
    const db = b.dueDate || "9999-12-31";
    return da.localeCompare(db);
  });

  if(list.length === 0){
    box.innerHTML = "<p>등록된 디자인 업무가 없습니다.</p>";
    return;
  }

  const today = getTodayDate();

  box.innerHTML = list.map(t => {

    const overdue =
      t.dueDate &&
      t.status !== "완료" &&
      new Date(t.dueDate) < today;

    let badge = "";

    if(t.status === "완료"){
      badge = `<span class="badge done">완료</span>`;
    }else if(overdue){
      badge = `<span class="badge danger">기한초과</span>`;
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

        <label>상태 변경
          <select onchange="updateStatus('${t.id}', this.value)">
            ${statusOptions(t.status)}
          </select>
        </label>

        <p><b>관리자 상세 요청사항</b></p>
        <div class="memo-box">${escapeHtml(t.detail || "-")}</div>

        <p><b>디자인팀 피드백</b></p>
        <textarea id="feedback_${t.id}">${escapeHtml(t.feedback || "")}</textarea>

        <button class="small-btn" onclick="updateFeedback('${t.id}')">
          피드백 저장
        </button>

      </div>
    `;
  }).join("");
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

function statusOptions(current){
  const list = [
    "요청",
    "확인중",
    "진행중",
    "피드백대기",
    "수정중",
    "완료",
    "보류"
  ];

  return list.map(s =>
    `<option ${s === current ? "selected" : ""}>${s}</option>`
  ).join("");
}

function clearForm(){
  [
    "storeName",
    "title",
    "requester",
    "owner",
    "dueDate",
    "detail",
    "feedback"
  ].forEach(id => {
    document.getElementById(id).value = "";
  });

  document.getElementById("category").value = "간판";
  document.getElementById("priority").value = "보통";
  document.getElementById("status").value = "요청";

  setToday();
}

function getValue(id){
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function getTodayDate(){
  const today = new Date();
  today.setHours(0,0,0,0);
  return today;
}

function escapeHtml(value){
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}