const API_URL="https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec";

let ALL_TRIPS=[];
let SETTLE_ID="";

document.addEventListener("DOMContentLoaded",()=>{
  loadTrips();

  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"&&!document.getElementById("settleModal").hidden){
      closeSettle();
    }
  });
});

async function loadTrips(){
  const body=document.getElementById("expenseTable");

  try{
    const response=await fetch(API_URL+"?action=getTrips&_="+Date.now(),{
      cache:"no-store"
    });
    const d=await response.json();

    if(!d.success){
      if(body){
        body.innerHTML=`<tr><td colspan="11" class="empty">${esc(d.message||"출장 내역을 불러오지 못했습니다.")}</td></tr>`;
      }
      return;
    }

    ALL_TRIPS=d.trips||[];
    renderExpenses();
    updateExpenseSummary();
  }catch(e){
    console.error(e);
    if(body){
      body.innerHTML='<tr><td colspan="11" class="empty">서버 연결에 실패했습니다.</td></tr>';
    }
  }
}

function renderExpenses(){
  const b=document.getElementById("expenseTable");
  b.innerHTML="";

  if(!ALL_TRIPS.length){
    b.innerHTML='<tr><td colspan="11" class="empty">출장 내역이 없습니다.</td></tr>';
    return;
  }

  ALL_TRIPS.forEach(t=>{
    const tr=document.createElement("tr");
    const start=t.tripStartDate||t.tripDate||"";
    const end=t.tripEndDate||t.tripDate||start;
    const period=start===end?start:`${start} ~ ${end}`;
    const done=t.settlementStatus==="정산완료";

    const status=done
      ?'<span class="status-badge done">정산완료</span>'
      :'<span class="status-badge pending">미정산</span>';

    const manage=done
      ?'<span class="done-label">완료</span>'
      :`<button type="button" class="btn-settle" onclick='openSettle(${JSON.stringify(t.id)})'>정산 입력</button>`;

    tr.innerHTML=`
      <td>${esc(period)}</td>
      <td>${esc(t.userName||"-")}</td>
      <td>${esc(t.companions||"-")}</td>
      <td>${esc(t.department||"-")}</td>
      <td>${esc(t.transportType||"-")}</td>
      <td>${esc(t.carNumber||"-")}</td>
      <td>${esc(t.destination||"-")}</td>
      <td class="num-col">${done?number_(t.fuelCost)+" 원":"-"}</td>
      <td class="num-col">${done?number_(t.distance)+" km":"-"}</td>
      <td>${status}</td>
      <td>${manage}</td>`;

    b.appendChild(tr);
  });
}

function updateExpenseSummary(){
  const done=ALL_TRIPS.filter(t=>t.settlementStatus==="정산완료");

  document.getElementById("totalFuelCost").textContent=
    number_(done.reduce((a,t)=>a+Number(t.fuelCost||0),0))+" 원";

  document.getElementById("totalDistance").textContent=
    number_(done.reduce((a,t)=>a+Number(t.distance||0),0))+" km";

  document.getElementById("unsettledCount").textContent=
    number_(ALL_TRIPS.filter(t=>t.settlementStatus!=="정산완료").length)+" 건";
}

function openSettle(id){
  const t=ALL_TRIPS.find(x=>x.id===id);
  if(!t)return;

  SETTLE_ID=id;

  const start=t.tripStartDate||t.tripDate||"";
  const end=t.tripEndDate||t.tripDate||start;
  const period=start===end?start:`${start} ~ ${end}`;

  document.getElementById("settleInfo").innerHTML=
    `<strong>${esc(t.userName||"")}</strong><br>${esc(period)} · ${esc(t.destination||"-")}`;

  document.getElementById("settleFuel").value=Number(t.fuelCost||0);
  document.getElementById("settleDistance").value=Number(t.distance||0);
  document.getElementById("settleModal").hidden=false;

  setTimeout(()=>document.getElementById("settleFuel").focus(),30);
}

function closeSettle(){
  document.getElementById("settleModal").hidden=true;
  SETTLE_ID="";
}

async function saveSettlement(){
  if(!SETTLE_ID)return;

  const fuel=Number(document.getElementById("settleFuel").value||0);
  const distance=Number(document.getElementById("settleDistance").value||0);

  if(fuel<0||distance<0){
    alert("주유비와 운행거리는 0 이상으로 입력해주세요.");
    return;
  }

  const button=document.getElementById("saveSettlementBtn");
  button.disabled=true;
  button.textContent="저장 중...";

  const body={
    action:"settleTrip",
    tripId:SETTLE_ID,
    fuelCost:fuel,
    distance:distance
  };

  try{
    const d=await(await fetch(API_URL,{
      method:"POST",
      body:JSON.stringify(body)
    })).json();

    if(d.success){
      closeSettle();
      await loadTrips();
      alert("출장 정산이 완료되었습니다.");
    }else{
      alert(d.message||"정산에 실패했습니다.");
    }
  }catch(e){
    console.error(e);
    alert("서버 연결에 실패했습니다.");
  }finally{
    button.disabled=false;
    button.textContent="정산 완료";
  }
}

function number_(n){
  return Number(n||0).toLocaleString();
}

function esc(v){
  return String(v??"").replace(/[&<>"']/g,m=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[m]));
}
