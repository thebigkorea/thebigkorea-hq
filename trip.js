const API_URL="https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec";

let ALL_TRIPS=[];
let COMPANIONS=[];
let HEAD_OFFICE_EMPLOYEES=[];

document.addEventListener("DOMContentLoaded",()=>{
  setToday();
  loadVehicles();
  loadHeadOfficeEmployees();
  loadTrips();

  document.getElementById("tripStartDate")?.addEventListener("change",syncEndDate);
  document.getElementById("userName")?.addEventListener("change",syncSelectedEmployee);
});

function localToday(){
  const d=new Date();
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,"0");
  const day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

function setToday(){
  const t=localToday();
  document.getElementById("tripStartDate").value=t;
  document.getElementById("tripEndDate").value=t;
  document.getElementById("tripEndDate").min=t;
}

function syncEndDate(){
  const s=value_("tripStartDate");
  const e=document.getElementById("tripEndDate");
  e.min=s;
  if(!e.value||e.value<s)e.value=s;
}

async function loadHeadOfficeEmployees(){
  const user=document.getElementById("userName");
  const companion=document.getElementById("companionEmployee");

  try{
    if(user) user.innerHTML='<option value="">본사 직원 불러오는 중...</option>';
    if(companion) companion.innerHTML='<option value="">본사 직원 불러오는 중...</option>';

    const res=await fetch(API_URL+"?action=getHeadOfficeEmployees&_="+Date.now(),{cache:"no-store"});
    const d=await res.json();

    if(!(d.success||d.ok)){
      throw new Error(d.message||"본사 직원 조회 실패");
    }

    HEAD_OFFICE_EMPLOYEES=Array.isArray(d.employees)?d.employees:[];

    [user,companion].forEach(el=>{
      if(!el)return;
      el.innerHTML='<option value="">본사 직원 선택</option>';

      HEAD_OFFICE_EMPLOYEES.forEach(x=>{
        const o=document.createElement("option");
        o.value=x.name||"";
        o.dataset.employeeId=x.employeeId||"";
        o.dataset.department=x.department||"";
        o.dataset.position=x.position||"";
        o.textContent=[x.name,x.department,x.position].filter(Boolean).join(" · ");
        el.appendChild(o);
      });
    });

    if(!HEAD_OFFICE_EMPLOYEES.length){
      if(user) user.innerHTML='<option value="">등록된 본사 재직 직원 없음</option>';
      if(companion) companion.innerHTML='<option value="">등록된 본사 재직 직원 없음</option>';
    }
  }catch(e){
    console.error("본사 직원 조회 오류:",e);
    if(user) user.innerHTML='<option value="">본사 직원 조회 실패</option>';
    if(companion) companion.innerHTML='<option value="">본사 직원 조회 실패</option>';
  }
}

function syncSelectedEmployee(){
  const name=value_("userName");
  const emp=HEAD_OFFICE_EMPLOYEES.find(x=>x.name===name);
  const department=document.getElementById("department");
  if(emp&&department){
    department.value=emp.department||"";
  }
}

async function loadVehicles(){
  try{
    const d=await(await fetch(API_URL+"?action=getVehicles&_="+Date.now(),{cache:"no-store"})).json();
    const s=document.getElementById("carNumber");
    if(!s)return;

    s.innerHTML='<option value="">차량 선택</option>';

    if(!(d.success||d.ok))return;

    (d.vehicles||[]).forEach(v=>{
      const o=document.createElement("option");
      o.value=v.carNumber||"";
      o.textContent=[v.carNumber,v.carModel].filter(Boolean).join(" / ");
      s.appendChild(o);
    });
  }catch(e){
    console.error("차량 조회 오류:",e);
  }
}

function addCompanion(name){
  name=String(name||"").trim();
  if(!name)return;

  if(name===value_("userName")){
    alert("출장자 본인은 동행자로 추가할 수 없습니다.");
    return;
  }

  if(COMPANIONS.includes(name))return;

  COMPANIONS.push(name);
  renderCompanionTags();
}

function addSelectedCompanion(){
  const select=document.getElementById("companionEmployee");
  if(!select||!select.value){
    alert("추가할 본사 직원을 선택해주세요.");
    return;
  }
  addCompanion(select.value);
  select.value="";
}

function addDirectCompanions(){
  const input=document.getElementById("companionDirect");
  const names=(input?.value||"")
    .split(/[,，\n]/)
    .map(v=>v.trim())
    .filter(Boolean);

  if(!names.length){
    alert("직접 입력할 동행자 이름을 입력해주세요.");
    return;
  }

  names.forEach(addCompanion);
  input.value="";
}

function removeCompanion(name){
  COMPANIONS=COMPANIONS.filter(x=>x!==name);
  renderCompanionTags();
}

function renderCompanionTags(){
  const box=document.getElementById("companionTags");
  if(!box)return;

  if(!COMPANIONS.length){
    box.innerHTML='<span class="companion-empty">등록된 동행자가 없습니다.</span>';
    return;
  }

  box.innerHTML=COMPANIONS.map(n=>
    `<span class="companion-tag">
      <span>${escapeHtml(n)}</span>
      <button type="button" class="companion-remove" aria-label="${escapeHtml(n)} 삭제"
        onclick='removeCompanion(${JSON.stringify(n)})'>×</button>
    </span>`
  ).join("");
}

async function saveTrip(){
  const start=value_("tripStartDate");
  const end=value_("tripEndDate");

  if(!start||!end)return alert("출장 시작일과 종료일을 입력해주세요.");
  if(end<start)return alert("출장 종료일은 시작일보다 빠를 수 없습니다.");
  if(!value_("userName"))return alert("출장자를 선택해주세요.");

  const emp=HEAD_OFFICE_EMPLOYEES.find(x=>x.name===value_("userName"))||{};

  const body={
    action:"saveTrip",
    tripStartDate:start,
    tripEndDate:end,
    employeeId:emp.employeeId||"",
    userName:value_("userName"),
    companions:COMPANIONS,
    department:value_("department"),
    transportType:value_("transportType"),
    carNumber:value_("carNumber"),
    destination:value_("destination"),
    purpose:value_("purpose"),
    memo:value_("memo"),
    status:"승인대기"
  };

  try{
    const d=await(await fetch(API_URL,{
      method:"POST",
      body:JSON.stringify(body)
    })).json();

    if(d.success||d.ok){
      alert("출장 신청이 저장되었습니다.");
      clearForm();
      loadTrips();
    }else{
      alert(d.message||"오류가 발생했습니다.");
    }
  }catch(e){
    console.error(e);
    alert("서버 연결 실패");
  }
}

async function loadTrips(){
  try{
    const d=await(await fetch(API_URL+"?action=getTrips&_="+Date.now(),{cache:"no-store"})).json();
    if(!(d.success||d.ok))return;
    ALL_TRIPS=d.trips||[];
    renderTrips();
    updateSummary();
  }catch(e){
    console.error(e);
  }
}

function renderTrips(){
  const c=document.getElementById("tripList");
  if(!c)return;

  c.innerHTML="";

  if(!ALL_TRIPS.length){
    c.innerHTML='<div class="empty">출장 신청내역이 없습니다.</div>';
    return;
  }

  ALL_TRIPS.forEach(t=>{
    const div=document.createElement("div");
    div.className="trip-item";

    const start=t.tripStartDate||t.tripDate||"";
    const end=t.tripEndDate||t.tripDate||"";
    const period=start===end?start:`${start} ~ ${end}`;
    const companions=t.companions
      ?`<div>동행자 : ${escapeHtml(Array.isArray(t.companions)?t.companions.join(", "):t.companions)}</div>`
      :"";

    div.innerHTML=`
      <div class="trip-top">
        <div class="trip-name">${escapeHtml(t.userName)}</div>
        <div class="trip-date">${escapeHtml(period)}</div>
      </div>
      <div class="trip-body">
        <div>부서 : ${escapeHtml(t.department||"-")}</div>
        ${companions}
        <div>차량 : ${escapeHtml(t.carNumber||"-")}</div>
        <div>방문처 : ${escapeHtml(t.destination||"-")}</div>
        <div>출장목적 : ${escapeHtml(t.purpose||"-")}</div>
        <div>상태 : ${escapeHtml(t.status||"-")}</div>
      </div>`;
    c.appendChild(div);
  });
}

function updateSummary(){
  const count=document.getElementById("tripCount");
  const todayCount=document.getElementById("todayTripCount");

  if(count)count.textContent=number_(ALL_TRIPS.length);

  const today=localToday();
  if(todayCount){
    todayCount.textContent=number_(ALL_TRIPS.filter(t=>{
      const s=t.tripStartDate||t.tripDate||"";
      const e=t.tripEndDate||t.tripDate||"";
      return s<=today&&e>=today;
    }).length);
  }
}

function clearForm(){
  ["department","destination","purpose","memo","companionDirect"].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.value="";
  });

  if(document.getElementById("userName"))document.getElementById("userName").value="";
  if(document.getElementById("carNumber"))document.getElementById("carNumber").value="";
  if(document.getElementById("companionEmployee"))document.getElementById("companionEmployee").value="";

  COMPANIONS=[];
  renderCompanionTags();
  setToday();
}

function value_(id){
  return document.getElementById(id)?.value||"";
}

function number_(n){
  return Number(n||0).toLocaleString();
}

function escapeHtml(v){
  return String(v??"").replace(/[&<>"']/g,m=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[m]));
}
