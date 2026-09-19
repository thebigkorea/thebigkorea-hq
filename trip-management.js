const API_URL="https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec";
let TRIPS=[],ACTIVE_FILTER="DASHBOARD",SETTLE_ID="";

document.addEventListener("DOMContentLoaded",()=>{
  loadTrips();

  document.querySelectorAll(".tab[data-filter]").forEach(btn=>{
    btn.addEventListener("click",()=>openList(btn.dataset.filter));
  });

  document.getElementById("searchInput")?.addEventListener("input",renderTable);
  document.getElementById("statusFilter")?.addEventListener("change",renderTable);
});

async function loadTrips(){
  try{
    const d=await(await fetch(API_URL+"?action=getTrips&_="+Date.now(),{cache:"no-store"})).json();
    if(!d.success) throw new Error(d.message||"조회 실패");
    TRIPS=d.trips||[];
    updateAllViews();
  }catch(e){
    console.error(e);
    const recent=document.getElementById("recentTable");
    const table=document.getElementById("tripTable");
    if(recent) recent.innerHTML='<tr><td colspan="7" class="empty">출장내역을 불러오지 못했습니다.</td></tr>';
    if(table) table.innerHTML='<tr><td colspan="9" class="empty">출장내역을 불러오지 못했습니다.</td></tr>';
  }
}

function updateAllViews(){
  updateCards();
  renderTodo();
  renderRecent();
  if(ACTIVE_FILTER!=="DASHBOARD") renderTable();
}

function isApproved(t){return t.status==="승인"||t.status==="승인완료";}
function isPending(t){return t.status==="승인대기";}
function isRejected(t){return t.status==="부결";}
function isSettled(t){return t.settlementStatus==="정산완료";}
function isSettleWait(t){return isApproved(t)&&!isSettled(t);}

function updateCards(){
  const pending=TRIPS.filter(isPending).length;
  const approved=TRIPS.filter(isApproved).length;
  const settle=TRIPS.filter(isSettleWait).length;
  const settled=TRIPS.filter(isSettled).length;
  set("totalCount",TRIPS.length); set("pendingCount",pending); set("approvedCount",approved);
  set("settleCount",settle); set("settledCount",settled);
  set("tabPending",pending); set("tabSettle",settle);
}

function renderTodo(){
  const box=document.getElementById("todoList");
  if(!box)return;
  const items=[
    ...TRIPS.filter(isPending).map(t=>({t,type:"approve"})),
    ...TRIPS.filter(isSettleWait).map(t=>({t,type:"settle"}))
  ].slice(0,8);

  if(!items.length){
    box.innerHTML='<div class="empty dashboard-empty">현재 처리할 출장업무가 없습니다.</div>';
    return;
  }

  box.innerHTML=items.map(({t,type})=>{
    const text=type==="approve"?"승인 필요":"정산 필요";
    const action=type==="approve"
      ?`<button class="todo-action" onclick="openList('승인대기')">승인 확인</button>`
      :`<button class="todo-action" onclick='openSettle(${JSON.stringify(t.id)})'>정산입력</button>`;
    return `<div class="todo"><div class="todo-main"><strong>${esc(t.userName)} · ${text}</strong><span>${esc(period(t))} · ${esc(t.destination||"-")}</span></div>${action}</div>`;
  }).join("");
}

function approvalBadge(t){
  if(isPending(t)) return '<span class="badge wait">승인대기</span>';
  if(isApproved(t)) return '<span class="badge ok">승인완료</span>';
  if(isRejected(t)) return '<span class="badge neutral">부결</span>';
  return `<span class="badge neutral">${esc(t.status||"-")}</span>`;
}

function settlementBadge(t){
  if(isSettled(t)) return '<span class="badge ok">정산완료</span>';
  if(isApproved(t)) return '<span class="badge wait">정산대기</span>';
  return '<span class="badge neutral">승인 전</span>';
}

function renderRecent(){
  const b=document.getElementById("recentTable");
  if(!b)return;
  const list=[...TRIPS].sort((a,b)=>String(b.createdAt||"").localeCompare(String(a.createdAt||""))).slice(0,5);

  if(!list.length){
    b.innerHTML='<tr><td colspan="7" class="empty">등록된 출장내역이 없습니다.</td></tr>';
    return;
  }

  b.innerHTML=list.map(t=>`<tr><td>${esc(period(t))}</td><td>${esc(t.userName||"-")}</td><td>${esc(t.companions||"-")}</td><td>${esc(t.department||"-")}</td><td>${esc(t.destination||"-")}</td><td>${approvalBadge(t)}</td><td>${settlementBadge(t)}</td></tr>`).join("");
}

function openList(filter){
  ACTIVE_FILTER=filter||"ALL";
  document.getElementById("dashboardView").hidden=true;
  document.getElementById("listView").hidden=false;
  document.querySelectorAll(".tab[data-filter]").forEach(btn=>btn.classList.toggle("active",btn.dataset.filter===ACTIVE_FILTER));

  const titles={
    "ALL":["출장 전체내역","등록된 모든 출장내역입니다."],
    "승인대기":["승인대기 출장","승인 또는 부결 처리가 필요한 출장만 표시합니다."],
    "승인":["승인완료 출장","승인이 완료된 출장만 표시합니다."],
    "SETTLE":["정산대기 출장","출장 후 정산이 필요한 출장만 표시합니다."],
    "정산완료":["정산완료 출장","정산이 완료된 출장만 표시합니다."]
  };
  const info=titles[ACTIVE_FILTER]||titles.ALL;
  document.getElementById("listTitle").textContent=info[0];
  document.getElementById("listDescription").textContent=info[1];
  document.getElementById("statusFilter").value="";
  renderTable();
  window.scrollTo({top:0,behavior:"smooth"});
}

function showDashboard(){
  ACTIVE_FILTER="DASHBOARD";
  document.getElementById("dashboardView").hidden=false;
  document.getElementById("listView").hidden=true;
  document.querySelectorAll(".tab[data-filter]").forEach(btn=>btn.classList.remove("active"));
  renderTodo(); renderRecent();
  window.scrollTo({top:0,behavior:"smooth"});
}

function filteredTrips(){
  const q=(document.getElementById("searchInput")?.value||"").trim().toLowerCase();
  const sf=document.getElementById("statusFilter")?.value||"";

  return TRIPS.filter(t=>{
    if(ACTIVE_FILTER==="승인대기"&&!isPending(t))return false;
    if(ACTIVE_FILTER==="승인"&&!isApproved(t))return false;
    if(ACTIVE_FILTER==="SETTLE"&&!isSettleWait(t))return false;
    if(ACTIVE_FILTER==="정산완료"&&!isSettled(t))return false;

    if(sf==="승인대기"&&!isPending(t))return false;
    if(sf==="승인"&&!isApproved(t))return false;
    if(sf==="미정산"&&!isSettleWait(t))return false;
    if(sf==="정산완료"&&!isSettled(t))return false;

    if(q){
      const hay=[t.userName,t.companions,t.destination,t.department,t.purpose].join(" ").toLowerCase();
      if(!hay.includes(q))return false;
    }
    return true;
  });
}

function renderTable(){
  const b=document.getElementById("tripTable");
  if(!b)return;
  const list=filteredTrips();
  b.innerHTML="";

  if(!list.length){
    b.innerHTML='<tr><td colspan="9" class="empty">조건에 맞는 출장내역이 없습니다.</td></tr>';
    return;
  }

  list.forEach(t=>{
    let manage='<div class="manage">';
    if(isPending(t)){
      manage+=`<button class="mini approve" onclick='processApproval(${JSON.stringify(t.id)},"승인",this)'>승인</button>`;
      manage+=`<button class="mini reject" onclick='processApproval(${JSON.stringify(t.id)},"부결",this)'>부결</button>`;
    }
    if(isSettleWait(t)) manage+=`<button class="mini settle" onclick='openSettle(${JSON.stringify(t.id)})'>정산</button>`;
    manage+='</div>';

    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${esc(period(t))}</td><td>${esc(t.userName||"-")}</td><td>${esc(t.companions||"-")}</td><td>${esc(t.department||"-")}</td><td>${esc(t.destination||"-")}</td><td>${esc(t.transportType||"-")}</td><td>${approvalBadge(t)}</td><td>${settlementBadge(t)}</td><td>${manage}</td>`;
    b.appendChild(tr);
  });
}

async function processApproval(id,decision,btn){
  const t=TRIPS.find(x=>x.id===id);
  if(!t||!isPending(t))return;

  let rejectReason="";
  if(decision==="부결"){
    rejectReason=prompt("부결 사유를 입력해주세요.","")?.trim()||"";
    if(!rejectReason)return;
  }else{
    if(!confirm(`${t.userName||"해당 직원"}의 출장을 승인하시겠습니까?`))return;
  }

  const original=btn.textContent;
  btn.disabled=true;
  btn.textContent="처리중";

  try{
    const d=await(await fetch(API_URL,{
      method:"POST",
      body:JSON.stringify({
        action:"processTripApproval",
        tripId:id,
        decision,
        rejectReason
      })
    })).json();

    if(!d.success) throw new Error(d.message||`${decision} 처리 실패`);

    // 전체 목록 재조회 없이 현재 메모리와 화면만 갱신
    t.status=decision==="승인"?"승인":"부결";
    if(decision==="부결"){
      t.rejectReason=rejectReason;
      t.settlementStatus="미정산";
    }
    updateAllViews();
    alert(d.message||`${decision} 처리되었습니다.`);
  }catch(e){
    console.error(e);
    alert(e.message||"서버 연결 실패");
    btn.disabled=false;
    btn.textContent=original;
  }
}

function period(t){
  const s=t.tripStartDate||t.tripDate||"";
  const e=t.tripEndDate||t.tripDate||s;
  return s===e?s:`${s} ~ ${e}`;
}

function openSettle(id){
  const t=TRIPS.find(x=>x.id===id);
  if(!t)return;
  SETTLE_ID=id;
  document.getElementById("settleInfo").innerHTML=`<strong>${esc(t.userName)}</strong><br>${esc(period(t))} · ${esc(t.destination||"-")}`;
  document.getElementById("fuel").value=Number(t.fuelCost||0);
  document.getElementById("distance").value=Number(t.distance||0);
  document.getElementById("settleModal").hidden=false;
}

function closeSettle(){
  document.getElementById("settleModal").hidden=true;
  SETTLE_ID="";
}

async function saveSettlement(){
  if(!SETTLE_ID)return;
  const id=SETTLE_ID;
  const t=TRIPS.find(x=>x.id===id);
  const btn=document.getElementById("settleSave");
  const body={
    action:"settleTrip",
    tripId:id,
    fuelCost:Number(document.getElementById("fuel").value||0),
    distance:Number(document.getElementById("distance").value||0)
  };
  if(body.fuelCost<0||body.distance<0)return alert("0 이상으로 입력해주세요.");

  btn.disabled=true; btn.textContent="저장 중...";
  try{
    const d=await(await fetch(API_URL,{method:"POST",body:JSON.stringify(body)})).json();
    if(!d.success)throw new Error(d.message||"정산 실패");

    // 정산 후에도 전체 재조회하지 않음
    if(t){
      t.fuelCost=body.fuelCost;
      t.distance=body.distance;
      t.settlementStatus="정산완료";
    }
    closeSettle();
    updateAllViews();
    alert("출장 정산이 완료되었습니다.");
  }catch(e){
    console.error(e);
    alert(e.message||"서버 연결 실패");
  }finally{
    btn.disabled=false;
    btn.textContent="정산 완료";
  }
}

function set(id,v){
  const el=document.getElementById(id);
  if(el)el.textContent=Number(v||0).toLocaleString();
}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
