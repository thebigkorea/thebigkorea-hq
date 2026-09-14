
const HQ_BASE = "https://thebigkorea.github.io/thebigkorea-hq/";

const PAGE_META = {
  home:["ERP 홈","더큰코리아 전체 경영현황을 한눈에 확인합니다."],
  hr:["통합인사","기존 본사 인사·증명서·퇴직 시스템을 한곳에서 연결합니다."],
  attendance:["근태 · 휴가","기존 출퇴근 및 연월차 시스템을 그대로 연결합니다."],
  contract:["전자계약","기존 정규직·아르바이트·용역계약과 계약관리대장을 연결합니다."],
  payroll:["급여관리","직영점 통합급여·아르바이트·일용직 시스템을 연결합니다."],
  tax:["4대보험 · 세무","4대보험 및 세무관리 기능을 순차적으로 통합합니다."],
  stores:["점포관리","기존 지점 인트라넷·출퇴근 관리자·영업실적 원장을 점포별로 연결합니다."],
  schedule:["근무스케줄","기존 점포별 주간·월간 스케줄 시스템을 연결합니다."],
  sales:["매출관리","기존 영업실적 대시보드·영업점 매출입력·통합실적원장을 연결합니다."],
  opening:["신규점포 개설","기존 신규점포 관리·원장·디자인 업무관리 시스템을 연결합니다."],
  hqtasks:["본사 업무관리","본사에서 매일·매월·분기별로 처리해야 하는 업무와 마감일정을 관리합니다."],
  operations:["운영지원","기존 매장점검대시보드와 공지사항을 연결합니다."],
  settlement:["월정산","기존 점포별 정산입력·정산관리·월별합산·원장을 연결합니다."],
  travel:["차량 · 출장","법인차량 관리와 출장 신청·승인·정산을 통합 연결합니다."],
  tools:["업무도구","본사에서 사용하는 네이버웍스 메일과 공용 드라이브를 연결합니다."],
  admin:["원장 · 관리자","기존 본사 원장과 관리자 화면을 한곳에서 연결합니다."],
  purchase:["매입 · 원가","직영점을 중심으로 발주·매입·식재료 원가를 관리합니다."],
  fund:["경비 · 자금","ECOUNT에서 수집되는 법인계좌 거래를 기반으로 현재잔액·최근 입출금·회계반영 상태를 조회합니다."],
  profit:["손익관리","직영점 실제손익과 위탁점 관리지표를 구분해 조회합니다."],
  analysis:["경영분석","매출·인건비·원가·이익 추이를 비교 분석합니다."]
};

const MODULES = {
  hr:[
    ["직원정보 기본입력","신규 직원정보 입력 및 기본정보 수정","기본입력",HQ_BASE+"employee-info.html"],
    ["인사관리대장","직원 인사정보 및 재직상태 관리","인사대장",HQ_BASE+"employee-admin.html"],
    ["통합 인사DB","본사 통합 인사DB 원장","통합DB","https://docs.google.com/spreadsheets/d/1RT5y2BfSMy8QdlhQvuB3vNG9R581ce538b-f8uAOVo8/edit?usp=drivesdk"],
    ["재직증명서","재직증명서 발급","재직증명서",HQ_BASE+"certificate.html"],
    ["경력증명서","경력증명서 발급","경력증명서",HQ_BASE+"career.html"],
    ["외국인 근로자 비자","비자별 채용 가능 여부 확인","비자 확인",HQ_BASE+"foreign-worker-visa.html"],
    ["퇴직서 작성","퇴직서 작성 및 제출","퇴직서","https://thebigkorea.github.io/hr-system/retirement-admin.html"],
    ["퇴직자 관리자","퇴직자 관리 화면","퇴직자 관리","https://thebigkorea.github.io/hr-system/retirement-list.html"],
    ["퇴직자 조회 원장","퇴직자 인증·조회 원장","퇴직 원장","https://thebigkorea.github.io/hr-system/retirement-auth.html"]
  ],
  attendance:[
    ["출퇴근 등록 앱","직원 출퇴근 등록","출퇴근 등록","https://thebigkorea.github.io/thebigkorea-attendance/"],
    ["관리자 출퇴근 조회","출퇴근·출장·연차·미휴무 등 근무현황 조회","관리자 조회","https://thebigkorea.github.io/thebigkorea-attendance/admin.html"],
    ["연월차 신청","연월차 신청 및 사용내역 확인","연월차 신청","https://thebigkorea.github.io/thebigkorea-leave-new/"],
    ["연월차 관리자 승인","연월차·미휴무 관리자 승인 및 원장","관리자 승인","https://thebigkorea.github.io/thebigkorea-leave-new/admin.html"],
    ["연월차 관리 시트 원장","기존 연월차 관리 Google Sheet 원장","원장 열기","https://docs.google.com/spreadsheets/d/1HzUpTGgVmd74kz1DB4QWbe5t9SutlYunGCf2iLbVaE4/edit?gid=319299006#gid=319299006"]
  ],
  contract:[
    ["정규직 근로계약","기존 본사 정규직 전자계약","정규직 계약",HQ_BASE+"regular-contract.html"],
    ["아르바이트 근로계약","기존 계약직·아르바이트 전자계약","알바 계약",HQ_BASE+"part-contract.html"],
    ["사업소득·용역계약","기존 사업소득자·용역 계약","용역계약",HQ_BASE+"service-contract.html"],
    ["계약관리 / 대장","계약 서명상태 및 계약내역 관리","계약관리",HQ_BASE+"contract-admin.html"]
  ],
  payroll:[
    ["직영점 통합 급여관리","기존 직영점 통합 급여 작성·확정·명세서","통합급여","https://script.google.com/macros/s/AKfycbyzLLU_vboJprliPHe_MELBe-M9crwK9xRSHB20BoRCMjC-DFwJG5MEE3D_EtBCjGp0gg/exec"],
    ["일용직 관리","통합 근무내역·지급·신고자료 관리","일용직",HQ_BASE+"daily-worker.html"],
    ["한국의집 아르바이트","한국의집 롯데월드몰점 아르바이트 관리","관리화면","https://script.google.com/macros/s/AKfycbxvr3itmxIu-yO8yzKkcN0EcBH9TY41f4-E_jVIrCeGn8BxSmuAbmARlV9cXKGAN-aPRA/exec"],
    ["길채정 아르바이트","길채정 압구정점 아르바이트 관리","관리화면","https://script.google.com/macros/s/AKfycbzPPPkbG-BS0M1NFMGkU8aAplXY-ix3knA9OjsUpz9n2HD0BJOwXTHZTdG8wefHrpWC/exec"],
    ["효종갱 파주 아르바이트","한국의집 효종갱 파주점 아르바이트 관리","관리화면","https://script.google.com/macros/s/AKfycbxrQIoPLOsYMbnkAMO4oeBjfWqwQCagCz7EJGGSBM7eLh2hPQGrth7tmTAeFJQzs9_PlQ/exec"],
    ["소바공방 평촌 아르바이트","소바공방 평촌점 아르바이트 관리","관리화면","https://script.google.com/macros/s/AKfycbw18xcPkkzKQJ0VcNgQF-wfc4Utbb7YZCl4Yz3RKgearuU8nveasQSiSUoCLD5_AJHWsw/exec"]
  ],
  tax:[
    ["4대보험 관리","국민연금·건강보험·장기요양·고용보험 관리","준비중",null],
    ["근로소득 세무자료","급여 확정자료의 세무신고 관리","준비중",null],
    ["사업소득 3.3%","사업소득 원천징수와 지급내역 관리","준비중",null],
    ["일용근로소득","일용직 지급완료 자료를 신고용으로 관리","일용직 관리",HQ_BASE+"daily-worker.html"]
  ],
  stores:[
    ["한국의집 롯데월드몰 인트라넷","한국의집 점포 인트라넷","인트라넷","https://thebigkorea.github.io/koreahouse-intranet/"],
    ["한국의집 출퇴근 관리자","한국의집 출퇴근 관리자 조회","출퇴근 조회","https://thebigkorea.github.io/koreahouse-attendance/admin.html"],
    ["한국의집 영업실적 원장","한국의집 영업실적 Google Sheet","실적 원장","https://docs.google.com/spreadsheets/d/1VXAFKtm7IaK6Ns_QbrRzpP8XnzBHau6e49GXhNe0uQg/edit?gid=949326317#gid=949326317"],
    ["길채정 압구정 인트라넷","길채정 압구정점 인트라넷","인트라넷","https://thebigkorea.github.io/gilchaejeong-apgujeong-intranet/"],
    ["길채정 출퇴근 관리자","길채정 압구정점 출퇴근 관리자 조회","출퇴근 조회","https://thebigkorea.github.io/gilchaejeong-apgujeong/admin.html"],
    ["길채정 영업실적 원장","길채정 영업실적 Google Sheet","실적 원장","https://docs.google.com/spreadsheets/d/1mmesI8_0POeqRJwcdyugLauWL0ZH4boPQn4w9YbRiT8/edit?gid=949326317#gid=949326317"],
    ["소바공방 평촌 인트라넷","소바공방 평촌점 인트라넷","인트라넷","https://thebigkorea.github.io/sobagongbang-pyeongchon-intranet/"],
    ["소바공방 출퇴근 관리자","소바공방 평촌점 출퇴근 관리자 조회","출퇴근 조회","https://thebigkorea.github.io/sobagongbang-pyeongchon/admin.html"],
    ["소바공방 영업실적 원장","소바공방 영업실적 Google Sheet","실적 원장","https://docs.google.com/spreadsheets/d/1BN0FdwGuW5KCJ9_6_gkEPQHS46MX26S5zEeB9SbsnNI/edit?gid=949326317#gid=949326317"],
    ["효종갱 파주 인트라넷","한국의집 효종갱 신세계파주 인트라넷","인트라넷","https://thebigkorea.github.io/hyojonggaeng-paju-intranet/"]
  ],
  schedule:[
    ["근무 스케줄","기존 점포별 근무 스케줄 시스템 연결 위치입니다.","기존 링크 확인",null]
  ],
  sales:[
    ["더큰코리아 영업실적 대시보드","전 점포 매출·전년비·월별 실적 조회","대시보드","https://script.google.com/macros/s/AKfycbzX4BEypYJv6h-5FZBTCFx1iJfHk-3DPBIHO9yRJfUmdXyy6xATo7vGnjG_T1swabh7XQ/exec"],
    ["영업점 매출 내역 입력","본사 영업점 매출 일괄 입력","매출 입력","https://script.google.com/macros/s/AKfycbyfytW-OyP84u1yaa4FJIF0EDclm_w6CWpY1rIDszzax7SfVuxF9KsDw5yfd53k0fb6Nw/exec"],
    ["통합 실적 원장","기존 통합 실적 원장","통합 원장","https://script.google.com/macros/s/AKfycbx5BwuumKLdSkx_EB_u0ocLgoRD4JPAGgIE8xiSDpypTCZO5IfmFgwj1tYeEF006t1ngA/exec"]
  ],
  opening:[
    ["신규점포 관리","행정·회계·진행현황·투자비용 관리","관리화면",HQ_BASE+"store-opening.html"],
    ["신규점포 원장조회","기존 신규점포 Google Sheet 원장","원장조회","https://docs.google.com/spreadsheets/d/1sEdpKlRjjPesAvdyG-q55Gw3pJAPZC4WyE4EsAuCaCQ/edit#gid=0"],
    ["디자인 업무관리","신규점포 및 본사 디자인 업무관리","디자인 관리",HQ_BASE+"design-task.html"],
    ["디자인 원장조회","기존 디자인 업무 Google Sheet 원장","원장조회","https://docs.google.com/spreadsheets/d/179hMU4XcS71l30cY2DP0nkg5HLZS4Q3p15dm83S5a8U/edit?gid=0#gid=0"]
  ],
  operations:[
    ["매장점검대시보드","본사 담당자의 점포 피드백·보완요청·조치확인","점검 대시보드",HQ_BASE+"store-dashboard.html"],
    ["공지사항","점포 운영지침·행사·교육·긴급사항 전달","공지사항",HQ_BASE+"notice.html"]
  ],
  settlement:[
    ["정산 입력","점포별 월 정산 입력","정산 입력","https://thebigkorea.github.io/thebigkorea-settlement/settlement.html"],
    ["정산 관리","점포별 정산 관리자 화면","정산 관리","https://thebigkorea.github.io/thebigkorea-settlement/settlement-admin.html"],
    ["월별합산조회","월별 정산 합산 조회","합산조회","https://thebigkorea.github.io/thebigkorea-settlement/settlement-summary.html"],
    ["정산 원장조회","기존 점포별 정산 Google Sheet 원장","원장조회","https://docs.google.com/spreadsheets/d/1YsskSeam5Um3WUcMqmBktG7X751u-lVDZva_mth4z9E/edit?gid=1056348194#gid=1056348194"]
  ],
  travel:[
    ["차량관리","법인차량 운행 등록 및 관리","차량관리",HQ_BASE+"vehicle.html"],
    ["차량 관리자 대시보드","법인차량 관리자 조회","관리자",HQ_BASE+"vehicle-admin.html"],
    ["출장 통합관리","출장 신청·승인·정산 및 전체 출장 현황 관리","통합관리",HQ_BASE+"trip-management.html"],
    ["운행원장","기존 법인차량 운행 Google Sheet 원장","운행원장","https://docs.google.com/spreadsheets/d/18Z9qf4_dQt3qpwk7K5hbIT1q4iRDVZCK1Z-tX6CnBi0/edit?gid=0#gid=0"]
  ],
  tools:[
    ["네이버웍스 메일","본사 네이버웍스 메일","메일 열기","https://mail.worksmobile.com"],
    ["웍스 드라이브","본사 공용 파일 드라이브","드라이브 열기","https://drive.worksmobile.com"]
  ],
  admin:[
    ["인사관리대장","본사 관리자 인사관리대장","인사관리",HQ_BASE+"hr-list.html"],
    ["연월차 관리 시트 원장","연월차 Google Sheet 원장","연월차 원장","https://docs.google.com/spreadsheets/d/1HzUpTGgVmd74kz1DB4QWbe5t9SutlYunGCf2iLbVaE4/edit?gid=319299006#gid=319299006"],
    ["출장 통합관리","출장 신청·승인·정산 및 전체 출장 현황 관리","출장 통합관리",HQ_BASE+"trip-management.html"],
    ["차량 관리자","법인차량 관리자 화면","차량 관리자",HQ_BASE+"vehicle-admin.html"],
    ["통합 실적 원장","기존 통합 실적 원장","실적 원장","https://script.google.com/macros/s/AKfycbx5BwuumKLdSkx_EB_u0ocLgoRD4JPAGgIE8xiSDpypTCZO5IfmFgwj1tYeEF006t1ngA/exec"],
    ["운행원장","법인차량 Google Sheet 원장","운행원장","https://docs.google.com/spreadsheets/d/18Z9qf4_dQt3qpwk7K5hbIT1q4iRDVZCK1Z-tX6CnBi0/edit?gid=0#gid=0"],
    ["통합 인사DB","본사 통합 인사DB 원장","통합 인사DB","https://docs.google.com/spreadsheets/d/1RT5y2BfSMy8QdlhQvuB3vNG9R581ce538b-f8uAOVo8/edit?usp=drivesdk"]
  ],
  purchase:[
    ["거래처 관리","직영점 공급업체와 결제조건 관리","준비중",null],
    ["발주 관리","기존 발주 시스템 통합 위치","준비중",null],
    ["매입 관리","입고·세금계산서·지급대기 흐름 관리","준비중",null],
    ["원가율","직영점 식재료비와 매출을 연결한 원가율 관리","준비중",null]
  ],
  fund:[
    ["계좌 현황","연결된 법인계좌별 현재 잔액과 최근 수집상태를 확인합니다.","계좌",null],
    ["입출금 거래내역","최근 은행 거래를 기간·계좌·입출금 구분으로 조회합니다.","거래내역",null],
    ["회계반영 상태","ECOUNT에서 이미 확인되는 회계반영 여부와 회계전표번호를 조회합니다.","회계상태",null]
  ],
  profit:[
    ["직영점 손익","매출-원가-인건비-임대·수수료-경비 기준 실제손익","준비중",null],
    ["위탁점 관리손익","확인 가능한 매출·수익·계약정보 중심 관리지표","준비중",null],
    ["전사 손익","직영점 손익과 본사비용을 포함한 전사손익","준비중",null]
  ],
  analysis:[
    ["점포 비교","매출·인건비율·원가율·영업이익 비교","준비중",null],
    ["영업실적 대시보드","더큰코리아 통합 영업실적 대시보드","대시보드 열기","https://script.google.com/macros/s/AKfycbzX4BEypYJv6h-5FZBTCFx1iJfHk-3DPBIHO9yRJfUmdXyy6xATo7vGnjG_T1swabh7XQ/exec"],
    ["추세 분석","전월·전년동월 주요 지표 추이","준비중",null]
  ]
};

const SYSTEM_LINKS = {
  managementDashboard: "https://script.google.com/macros/s/AKfycbzX4BEypYJv6h-5FZBTCFx1iJfHk-3DPBIHO9yRJfUmdXyy6xATo7vGnjG_T1swabh7XQ/exec",
  payroll: "https://thebigkorea.github.io/thebigkorea-payroll-test/",
  contractRegular: HQ_BASE+"regular-contract.html",
  leave: "https://thebigkorea.github.io/thebigkorea-leave-new/",
  attendanceAdmin: "https://thebigkorea.github.io/thebigkorea-attendance/admin.html",
  daily: HQ_BASE+"daily-worker.html",
  storeDashboard: HQ_BASE+"store-dashboard.html",
  trip: HQ_BASE+"trip-management.html"
};

const FUND_API_URL = "https://script.google.com/macros/s/AKfycbwr2mdmWMCUbQmHbCVXeXe_SjN-pa39GL7MYmuHlxIv31oU7Eg9MN5J-V-NkYuHBQKO/exec";

const HR_API_URL = "https://script.google.com/macros/s/AKfycbwRGQcXgYhfkTUiklPrHs4uFe7oHpgn8D_jM2jJPpU74tXr3D_h6vGMq72CHXU0EnAb/exec";

/* 네 출퇴근 Apps Script의 최신 /exec 배포 주소 */
const ATTENDANCE_STORES = [
  {name:"더큰코리아 본사",url:"https://script.google.com/macros/s/AKfycbzRL0MceE5NfdEro8Og1VnjLhTc-pcCXKl0d3hXV8u8A3mNoRBBrTEfGdMtp2ohotWx/exec"},
  {name:"평촌 소바공방",url:"https://script.google.com/macros/s/AKfycbwqe8v-KtP_xn3eJ3keFMJ8a4G0zyfk6Rj5lBFZ8oSoVHm370qQ9xjUpi0bzEPbBxed/exec"},
  {name:"압구정 길채정",url:"https://script.google.com/macros/s/AKfycbyJuwQdfCgVrlCu6gH6JepEXu8u4pXrWueGimopd7s5U8Jwm4XqQWSfir-mnixu1mywYg/exec"},
  {name:"효종갱 파주점",url:"https://script.google.com/macros/s/AKfycbwepn9ybkMA6BPSqobW1009eCdxxdbfRv_1yuesYqormK3F1Rr74Rp6m_fN7CKiCud5/exec"}
];
let attendanceStoreData = [];

async function loadAllStoreAttendance(){
  const summary=document.getElementById("attendanceRosterSummary");
  const groups=document.getElementById("attendanceStoreGroups");
  if(!summary||!groups)return;

  summary.textContent="지정된 4개 점포 출퇴근 현황을 불러오는 중입니다.";
  groups.innerHTML='<div class="attendance-roster-empty">출퇴근 명단을 불러오는 중입니다.</div>';
  try{
    attendanceStoreData=await Promise.all(ATTENDANCE_STORES.map(async store=>{
      if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec/.test(store.url)){
        return {storeName:store.name,employees:[],connectionRequired:true};
      }
      try{
        const response=await fetch(store.url+"?action=getTodayAttendanceSummary&t="+Date.now(),{cache:"no-store"});
        const data=await response.json();
        if(!data.success)throw new Error(data.message||"조회 실패");
        const employees=Array.isArray(data.employees)?data.employees:[];
        return {storeName:store.name,employees,workingCount:employees.filter(e=>e.status!=="퇴근 완료").length};
      }catch(error){
        return {storeName:store.name,employees:[],connectionError:true};
      }
    }));
    const total=attendanceStoreData.reduce((sum,store)=>sum+(store.employees||[]).length,0);
    const working=attendanceStoreData.reduce((sum,store)=>sum+(store.workingCount||0),0);
    summary.textContent=`4개 점포 오늘 출근 ${total}명 · 근무 중 ${working}명`;
    buildAttendanceStoreTabs();
    renderAttendanceStores("all");
  }catch(error){
    summary.textContent="출퇴근 시스템 연결을 확인해 주세요.";
    groups.innerHTML='<div class="attendance-roster-empty">출퇴근 명단을 불러오지 못했습니다.</div>';
    console.error("전 점포 출퇴근 조회 실패",error);
  }
}

function buildAttendanceStoreTabs(){
  const tabs=document.getElementById("attendanceStoreTabs");
  if(!tabs)return;
  tabs.innerHTML=['<button class="attendance-store-tab active" type="button" data-store="all">전체</button>']
    .concat(attendanceStoreData.map((store,index)=>`<button class="attendance-store-tab" type="button" data-store="${index}">${escapeHtml(store.storeName||"미분류")}</button>`)).join("");
  tabs.querySelectorAll(".attendance-store-tab").forEach(tab=>tab.addEventListener("click",()=>{
    tabs.querySelectorAll(".attendance-store-tab").forEach(item=>item.classList.toggle("active",item===tab));
    renderAttendanceStores(tab.dataset.store);
  }));
}

function renderAttendanceStores(filter){
  const target=document.getElementById("attendanceStoreGroups");
  if(!target)return;
  const stores=filter==="all"?attendanceStoreData:[attendanceStoreData[Number(filter)]].filter(Boolean);
  if(!stores.length){
    target.innerHTML='<div class="attendance-roster-empty">오늘 출근한 직원이 없습니다.</div>';
    return;
  }
  if(filter==="all"){
    target.innerHTML=`<div class="attendance-all-summary">${stores.map((store,index)=>{
      const employees=Array.isArray(store.employees)?store.employees:[];
      let names="오늘 출근한 직원이 없습니다.";
      if(store.connectionRequired)names="배포 URL 입력 필요";
      else if(store.connectionError)names="출퇴근 API 연결 확인 필요";
      else if(employees.length)names=employees.map(person=>escapeHtml(person.name||"-")).join(", ");
      return `<button class="attendance-summary-row" type="button" data-store-index="${index}"><span><strong>${escapeHtml(store.storeName||"미분류")}</strong><small>${names}</small></span><b>${employees.length}명 ›</b></button>`;
    }).join("")}</div>`;
    target.querySelectorAll(".attendance-summary-row").forEach(row=>row.addEventListener("click",()=>{
      const index=row.dataset.storeIndex;
      const tabs=document.getElementById("attendanceStoreTabs");
      tabs?.querySelectorAll(".attendance-store-tab").forEach(tab=>tab.classList.toggle("active",tab.dataset.store===index));
      renderAttendanceStores(index);
    }));
    return;
  }
  target.innerHTML=stores.map(store=>{
    const employees=Array.isArray(store.employees)?store.employees:[];
    const people=store.connectionRequired?'<div class="attendance-roster-empty">이 점포의 배포 URL을 입력해 주세요.</div>':store.connectionError?'<div class="attendance-roster-empty">이 점포의 출퇴근 API 연결을 확인해 주세요.</div>':employees.length?employees.map(person=>{
      const completed=person.status==="퇴근 완료";
      const times=`출근 ${escapeHtml(person.checkIn||"-")} · 퇴근 ${escapeHtml(person.checkOut||"-")}`;
      return `<div class="attendance-person"><div><strong>${escapeHtml(person.name||"-")}</strong><small>${times}</small></div><span class="attendance-state ${completed?"completed":"working"}">${completed?"퇴근 완료":"근무 중"}</span></div>`;
    }).join(""):'<div class="attendance-roster-empty">오늘 출근한 직원이 없습니다.</div>';
    return `<section class="attendance-store-group"><div class="attendance-store-title"><strong>${escapeHtml(store.storeName||"미분류")}</strong><span>${employees.length}명</span></div><div class="attendance-person-list">${people}</div></section>`;
  }).join("");
}

/* =========================================
   ERP 홈 전 점포 매출 비교
   실제 영업실적 API 연결 시 아래 함수에 데이터를 전달하면 됩니다.

   payload 예시:
   {
     asOfDate: "2026-09-15",
     yesterdaySales: 12345678,
     stores: [
       {
         name: "한국의집 롯데월드몰",
         operationType: "직영",
         current: 120000000,
         previousPeriod: 108000000,
         previousYearPeriod: 99000000
       }
     ]
   }
========================================= */

function numberOrZero(v){
  const n=Number(v);
  return Number.isFinite(n)?n:0;
}

function money(v){
  const n=numberOrZero(v);
  return n.toLocaleString("ko-KR")+"원";
}

function changeRate(current, compare){
  const a=numberOrZero(current);
  const b=numberOrZero(compare);
  if(!b) return null;
  return ((a-b)/b)*100;
}

function changeHtml(current, compare){
  const rate=changeRate(current,compare);
  if(rate===null) return '<span class="sales-change same">-</span>';
  const cls=rate>0?"up":rate<0?"down":"same";
  const arrow=rate>0?"▲":rate<0?"▼":"";
  return `<span class="sales-change ${cls}">${arrow}${Math.abs(rate).toFixed(1)}%</span>`;
}

function setSalesDashboardData(payload){
  payload=payload||{};
  const allStores=Array.isArray(payload.stores)?payload.stores:[];
  const wanted=[
    {label:"한국의집",keys:["한국의집"]},
    {label:"평촌 소바공방",keys:["평촌소바공방","소바공방평촌","소바공방"]},
    {label:"압구정 길채정",keys:["압구정길채정","길채정압구정","길채정"]},
    {label:"효종갱 파주점",keys:["효종갱파주점","효종갱파주","효종갱"]}
  ];
  const normalize=v=>String(v||"").replace(/\s|·|\.|-/g,"").toLowerCase();
  const stores=wanted.map(item=>{
    const found=allStores.find(s=>item.keys.some(key=>normalize(s.name).includes(normalize(key))));
    return {...(found||{}),displayName:item.label,found:Boolean(found)};
  });
  const container=document.getElementById("salesStoreSummary");
  if(!container)return;

  container.innerHTML=stores.map(s=>{
    const current=numberOrZero(s.current ?? s.monthSales ?? s.selectedMonthSales);
    const compare=numberOrZero(s.previousYearPeriod ?? s.previousPeriod ?? s.previousYearSales);
    const comparison=compare ? changeHtml(current,compare) : '<span class="sales-change same">비교자료 없음</span>';
    return `<button class="sales-store-card" type="button" onclick="handleQuickSystem('managementDashboard')">
      <span class="sales-store-name">${escapeHtml(s.displayName)}</span>
      <strong>${s.found?money(current):"자료 없음"}</strong>
      <small>선택 월 매출</small>
      <span class="sales-store-yesterday">전일 매출 <strong>${s.found?money(s.yesterdaySales||0):"-"}</strong></span>
      <span class="sales-store-previous">전년 동기간 매출 <strong>${s.found?money(compare):"-"}</strong></span>
      <span class="sales-store-change">전년도 대비 ${s.found?comparison:'<span class="sales-change same">-</span>'}</span>
      <b>영업실적 대시보드 열기 →</b>
    </button>`;
  }).join("");

  const available=stores.filter(s=>s.found);
  const totalCurrent=available.reduce((a,s)=>a+numberOrZero(s.current ?? s.monthSales ?? s.selectedMonthSales),0);
  const totalPrevious=available.reduce((a,s)=>a+numberOrZero(s.previousPeriod ?? s.previousMonthSales),0);
  const totalYear=available.reduce((a,s)=>a+numberOrZero(s.previousYearPeriod ?? s.previousYearSales),0);
  const totalYearToDate=numberOrZero(payload.totals?.yearToDate) || available.reduce((a,s)=>a+numberOrZero(s.yearToDate),0);
  const allStoreYearToDate=numberOrZero(payload.totals?.allStoreYearToDate);

  document.getElementById("salesSelectedMonth").textContent=money(payload.selectedMonthSales ?? payload.totalCurrent ?? totalCurrent);
  document.getElementById("salesPreviousYearAmount").textContent=money(totalYear);
  document.getElementById("salesYearComparison").innerHTML=totalYear?changeHtml(totalCurrent,totalYear):'<span class="sales-change same">비교자료 없음</span>';
  document.getElementById("salesYearToDate").textContent=money(totalYearToDate);
  document.getElementById("salesYearTotalLabel").textContent=`직영점 ${payload.year||new Date().getFullYear()}년 매출 합계`;
  document.getElementById("salesAllStoreYearToDate").textContent=allStoreYearToDate?money(allStoreYearToDate):"캐시 확인 필요";
  document.getElementById("salesAllStoreYearTotalLabel").textContent=`${payload.year||new Date().getFullYear()}년 더큰코리아 전 점포 매출 합계`;
  document.getElementById("salesAllStoreYearNote").textContent=payload.totals?.allStoreCount?`1월부터 선택 월까지 · ${payload.totals.allStoreCount}개 점포`:"경영대시보드 캐시 기준";

  const status=document.getElementById("salesDataStatus");
  status.textContent=`직영점 ${available.length}/4 연동`;
  status.classList.add("live");

  updateSalesPeriodLabels(payload.asOfDate);
}


function loadErpStoreSales(){
  const monthValue =
    document.getElementById("erpMonth")?.value;

  if(!monthValue){
    return;
  }

  const parts=monthValue.split("-").map(Number);
  const year=parts[0];
  const month=parts[1];

  const status=
    document.getElementById("salesDataStatus");

  if(status){
    status.textContent="매출 데이터 불러오는 중";
    status.classList.remove("live");
  }

  const callbackName=
    "__erpSalesCallback_" + Date.now();

  const scriptTag=
    document.createElement("script");

  let finished=false;

  const cleanup=()=>{
    if(finished)return;
    finished=true;

    try{
      delete window[callbackName];
    }catch(error){
      window[callbackName]=undefined;
    }

    if(scriptTag.parentNode){
      scriptTag.parentNode.removeChild(scriptTag);
    }
  };

  const timer=setTimeout(()=>{
    cleanup();

    if(status){
      status.textContent="매출 데이터 연결 실패";
      status.classList.remove("live");
    }

    const container=document.getElementById("salesStoreSummary");
    if(container){
      container.innerHTML='<div class="sales-store-loading error">영업실적 데이터를 불러오지 못했습니다. 대시보드 연결 상태를 확인해 주세요.</div>';
    }
  },30000);

  window[callbackName]=(payload)=>{
    clearTimeout(timer);

    if(
      payload &&
      payload.ok === true
    ){
      setSalesDashboardData(payload);

      if(
        payload.yesterdayDate &&
        document.getElementById(
          "salesYesterdayDate"
        )
      ){
        document.getElementById(
          "salesYesterdayDate"
        ).textContent=
          payload.yesterdayDate +
          " 실적";
      }
    }else{
      if(status){
        status.textContent="매출 데이터 조회 오류";
        status.classList.remove("live");
      }

      const message=
        payload?.message ||
        "매출 데이터를 조회하지 못했습니다.";

      const container=document.getElementById("salesStoreSummary");
      if(container){
        container.innerHTML=`<div class="sales-store-loading error">${escapeHtml(message)}</div>`;
      }
    }

    cleanup();
  };

  scriptTag.onerror=()=>{
    clearTimeout(timer);
    cleanup();

    if(status){
      status.textContent="매출 데이터 연결 실패";
      status.classList.remove("live");
    }
  };

  const params=
    new URLSearchParams({
      action:"erpSalesComparison",
      year:String(year),
      month:String(month),
      callback:callbackName,
      t:String(Date.now())
    });

  scriptTag.src=
    SYSTEM_LINKS.managementDashboard +
    "?" +
    params.toString();

  document.head.appendChild(scriptTag);
}

function updateSalesPeriodLabels(asOfDate){
  const selected=document.getElementById("erpMonth")?.value;
  if(!selected)return;

  const [year,month]=selected.split("-").map(Number);
  const today=new Date();
  const selectedLastDay=new Date(year,month,0).getDate();
  const isCurrentMonth=today.getFullYear()===year && today.getMonth()+1===month;
  const day=isCurrentMonth ? Math.min(today.getDate(),selectedLastDay) : selectedLastDay;

  const prev=new Date(year,month-2,1);
  const prevLast=new Date(prev.getFullYear(),prev.getMonth()+1,0).getDate();
  const prevDay=Math.min(day,prevLast);

  const currentLabel=`${year}.${month}.1 ~ ${year}.${month}.${day}`;
  const prevLabel=`${prev.getFullYear()}.${prev.getMonth()+1}.1 ~ ${prev.getFullYear()}.${prev.getMonth()+1}.${prevDay}`;
  const yearLabel=`${year-1}.${month}.1 ~ ${year-1}.${month}.${day}`;

  const currentPeriodEl=document.getElementById("salesCurrentPeriod");
  const prevPeriodEl=document.getElementById("salesPrevPeriod");
  const yearPeriodEl=document.getElementById("salesYearPeriod");
  const comparisonGuideEl=document.getElementById("salesComparisonGuide");
  const yesterdayDateEl=document.getElementById("salesYesterdayDate");

  if(currentPeriodEl) currentPeriodEl.textContent=currentLabel;
  if(prevPeriodEl) prevPeriodEl.textContent=prevLabel+" 대비";
  if(yearPeriodEl) yearPeriodEl.textContent=yearLabel+" 대비";
  if(comparisonGuideEl){
    comparisonGuideEl.textContent="이 화면은 직영점 4개만 표시합니다. 전체 점포 실적은 ‘영업실적 대시보드 열기’를 눌러 조회하세요.";
  }

  if(yesterdayDateEl){
    const y=new Date();
    y.setDate(y.getDate()-1);
    yesterdayDateEl.textContent=`${y.getFullYear()}.${y.getMonth()+1}.${y.getDate()} 실적`;
  }
}

function escapeHtml(v){
  return String(v??"")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}


async function loadCompanyOperationStatus(){
  const employeeEl=document.getElementById("kpiEmployees");
  const regularEl=document.getElementById("kpiRegularEmployees");
  const partTimeEl=document.getElementById("kpiPartTimeEmployees");
  const businessEl=document.getElementById("kpiBusinessEmployees");
  const contractEl=document.getElementById("kpiContractEmployees");
  const otherEl=document.getElementById("kpiOtherEmployees");
  const managedStoreEl=document.getElementById("kpiManagedStores");

  function normalizeUnifiedEmployee(item){
    item=item||{};
    return {
      employmentType:item.employmentType||"",
      contractType:item.employmentType||item.contractType||"",
      status:item.status||""
    };
  }

  function normalizeEmploymentGroup(item){
    const raw=String(
      item.employmentType ||
      item.contractType ||
      ""
    ).replace(/\s+/g,"").trim();

    if(!raw) return "미분류";
    if(raw.includes("정규") || raw.includes("정직")) return "정규직";
    if(raw.includes("아르바이트") || raw.includes("알바") || raw.includes("시급")) return "아르바이트";
    if(raw.includes("사업소득")) return "사업소득자";
    if(raw.includes("용역")) return "용역";
    if(raw.includes("일용")) return "일용직";
    if(raw.includes("계약")) return "계약직";
    if(raw.includes("파견")) return "파견";
    return raw;
  }

  async function getHrApi(params){
    const query=new URLSearchParams();
    Object.keys(params||{}).forEach(key=>{
      const value=params[key];
      if(value!==undefined && value!==null && String(value)!==""){
        query.set(key,String(value));
      }
    });
    query.set("t",String(Date.now()));

    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),15000);
    try{
      const res=await fetch(HR_API_URL+"?"+query.toString(),{
        cache:"no-store",
        signal:controller.signal
      });
      if(!res.ok) throw new Error("API 응답 오류: HTTP "+res.status);
      return await res.json();
    }finally{
      clearTimeout(timer);
    }
  }

  // 직원 현황과 점포 현황은 서로 독립적으로 처리한다.
  // 점포 API가 실패해도 직원 집계가 사라지지 않도록 분리.
  try{
    const employeeData=await getHrApi({action:"getEmployeesAdmin"});

    if(!employeeData.ok && !employeeData.success){
      throw new Error(employeeData.message||"직원 조회 실패");
    }

    const rows=Array.isArray(employeeData.employees)
      ? employeeData.employees.map(normalizeUnifiedEmployee)
      : [];

    const activeEmployees=rows.filter(item=>
      String(item.status||"").trim()==="재직"
    );

    const grand={};
    activeEmployees.forEach(item=>{
      const group=normalizeEmploymentGroup(item);
      grand[group]=Number(grand[group]||0)+1;
    });

    if(employeeEl) employeeEl.textContent=`${activeEmployees.length}명`;
    if(regularEl) regularEl.textContent=`${Number(grand["정규직"]||0)}명`;
    if(partTimeEl) partTimeEl.textContent=`${Number(grand["아르바이트"]||0)}명`;
    if(businessEl) businessEl.textContent=`${Number(grand["사업소득자"]||0)}명`;
    if(contractEl) contractEl.textContent=`${Number(grand["계약직"]||0)}명`;

    const shownGroups=["정규직","아르바이트","사업소득자","계약직"];
    const otherCount=Object.keys(grand)
      .filter(group=>!shownGroups.includes(group))
      .reduce((sum,group)=>sum+Number(grand[group]||0),0);

    if(otherEl){
      otherEl.textContent=`${otherCount}명`;
      const wrap=otherEl.closest(".employee-breakdown-item");
      if(wrap) wrap.hidden=otherCount===0;
    }
  }catch(error){
    console.error("직원 운영현황 조회 실패:",error);
    [employeeEl,regularEl,partTimeEl,businessEl,contractEl,otherEl].forEach(el=>{
      if(el) el.textContent="-명";
    });
  }

  // 현재 회사 운영 기준은 직영 4개 / 위탁 9개.
  // 점포 API 장애와 관계없이 홈의 위탁점 수는 유지한다.
  if(managedStoreEl) managedStoreEl.textContent="9개";

  // 점포 API는 별도로 확인만 한다. 실패해도 직원 현황에는 영향 없음.
  try{
    const storeData=await getHrApi({action:"getStores"});
    if(!storeData.ok && !storeData.success){
      throw new Error(storeData.message||"점포 조회 실패");
    }
  }catch(error){
    console.warn("점포 운영현황 조회 확인 실패:",error);
  }
}

function init(){
  const month = document.getElementById("erpMonth");
  const now = new Date();
  month.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
  updateSalesPeriodLabels();

  month.addEventListener("change",()=>{
    updateSalesPeriodLabels();
    loadErpStoreSales();
  });

  document.querySelectorAll(".nav-item").forEach(btn=>{
    btn.addEventListener("click",()=>{
      openView(btn.dataset.view);
    });
  });

  document.querySelectorAll("[data-view-target]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      openView(btn.dataset.viewTarget);
    });
  });

  document.getElementById("menuToggle").addEventListener("click",()=>{
    document.getElementById("sidebar").classList.toggle("open");
  });

  document.getElementById("refreshBtn").addEventListener("click",()=>{
    window.location.reload();
  });

  document.querySelectorAll(".quick-card").forEach(btn=>{
    btn.addEventListener("click",()=>handleQuickSystem(btn.dataset.system));
  });

  buildModuleViews();
  buildHqTaskView();
  renderHqTaskView();
  updateHomeHqTaskSummary();
  loadCompanyOperationStatus();
  loadFundData();
  loadAllStoreAttendance();
  loadErpStoreSales();
}

function openView(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(v=>v.classList.toggle("active",v.dataset.view===view));
  const target=document.getElementById(`view-${view}`);
  if(target) target.classList.add("active");
  if(view==="fund" && document.getElementById("fundDashboard")){
    renderFundDashboard();
  }
  if(view==="hqtasks") renderHqTaskView();
  const meta=PAGE_META[view]||["ERP",""];
  document.getElementById("pageTitle").textContent=meta[0];
  document.getElementById("pageSubtitle").textContent=meta[1];
  document.getElementById("sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}


/* =========================================
   경비 · 자금 전용 화면
   ECOUNT 금융거래원장 Apps Script 연동
   - 분개장 조회/자동분류/점포귀속 제거
   - 은행거래 + ECOUNT 회계반영 상태 중심
========================================= */

let fundState = {
  source:"ECOUNT",
  syncedAt:"",
  accounts:[],
  transactions:[],
  filtered:[]
};

function fundNumber(v){
  const n=Number(v);
  return Number.isFinite(n)?n:0;
}

function fundMoney(v){
  return fundNumber(v).toLocaleString("ko-KR")+"원";
}

function fundDateValue(value){
  const raw=String(value||"").trim();
  if(!raw) return "";
  const m=raw.match(/(20\d{2})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/);
  if(m) return `${m[1]}-${String(m[2]).padStart(2,"0")}-${String(m[3]).padStart(2,"0")}`;
  return raw.slice(0,10).replace(/\//g,"-");
}

function fundFormatDateTime(value){
  if(!value) return "-";
  const raw=String(value).trim();
  const m=raw.match(/(20\d{2})[\/\-.](\d{1,2})[\/\-.](\d{1,2})(?:[ T]+(\d{1,2}):?(\d{2})?)?/);
  if(m){
    const date=`${m[1]}-${String(m[2]).padStart(2,"0")}-${String(m[3]).padStart(2,"0")}`;
    const time=m[4]?` ${String(m[4]).padStart(2,"0")}:${String(m[5]||"00").padStart(2,"0")}`:"";
    return date+time;
  }
  return raw.replace("T"," ").replace(/\.000Z$/i,"").slice(0,16);
}

function fundIsPosted(t){
  return String(t?.accountingStatus||"").trim()==="회계반영" ||
         !!String(t?.accountingVoucher||"").trim();
}

function fundSortTransactions(list){
  return [...list].sort((a,b)=>{
    const ad=String(a.datetime||a.date||"");
    const bd=String(b.datetime||b.date||"");
    return bd.localeCompare(ad);
  });
}

function jsonpFund(params){
  return new Promise((resolve,reject)=>{
    const cb="__fundCb_"+Date.now()+"_"+Math.random().toString(36).slice(2);
    const script=document.createElement("script");
    const timer=setTimeout(()=>finish(new Error("금융자료 서버 응답시간 초과")),20000);
    function finish(err,data){
      clearTimeout(timer);
      try{ delete window[cb]; }catch(_){ window[cb]=undefined; }
      script.remove();
      err?reject(err):resolve(data);
    }
    window[cb]=data=>finish(null,data);
    const q=new URLSearchParams({...params,callback:cb,_:Date.now()});
    script.src=FUND_API_URL+"?"+q.toString();
    script.onerror=()=>finish(new Error("금융자료 서버 연결 실패"));
    document.head.appendChild(script);
  });
}

async function loadFundData(){
  try{
    setText("fundSourceStatus","ECOUNT 자동연동 확인중");
    setText("fundSyncTime","금융거래원장 불러오는 중");
    const payload=await jsonpFund({action:"getFundData"});
    if(!payload?.ok) throw new Error(payload?.message||"금융자료 조회 실패");
    setFundData(payload);
  }catch(err){
    console.error("[FUND]",err);
    setText("fundSourceStatus","ECOUNT 연동 오류");
    setText("fundSyncTime",err.message||"금융자료를 불러오지 못했습니다.");
  }
}

function setFundData(payload){
  payload=payload||{};
  fundState.source=payload.source||"ECOUNT";
  fundState.syncedAt=payload.syncedAt||"";
  fundState.accounts=Array.isArray(payload.accounts)?payload.accounts:[];
  fundState.transactions=fundSortTransactions(Array.isArray(payload.transactions)?payload.transactions:[]);
  fundState.filtered=[...fundState.transactions];
  if(document.getElementById("fundDashboard")){
    initFundDateRange(true);
    applyFundFilters(true);
  }
}

function buildFundView(){
  const el=document.getElementById("view-fund");
  if(!el)return;
  el.innerHTML=`
    <section class="module-hero fund-hero">
      <div>
        <span class="eyebrow">CASH & BANK MANAGEMENT</span>
        <h2>경비 · 자금</h2>
        <p>ECOUNT 법인계좌 거래를 자동 수집하여 최근 입출금·현재잔액·회계반영 상태를 확인합니다.</p>
      </div>
      <div class="fund-connection-box">
        <span class="fund-connection-dot ready"></span>
        <div>
          <strong id="fundSourceStatus">ECOUNT 자동연동</strong>
          <small id="fundSyncTime">금융거래원장 연결 확인중</small>
        </div>
      </div>
    </section>

    <div id="fundDashboard">
      <div class="fund-kpi-grid">
        <article class="fund-kpi-card">
          <span>현재 계좌잔액</span>
          <strong id="fundTotalBalance">0원</strong>
          <small id="fundAccountCount">연결 계좌 0개</small>
        </article>
        <article class="fund-kpi-card income">
          <span>최근 3일 입금</span>
          <strong id="fundTotalIncome">0원</strong>
          <small id="fundIncomeCount">0건</small>
        </article>
        <article class="fund-kpi-card expense">
          <span>최근 3일 출금</span>
          <strong id="fundTotalExpense">0원</strong>
          <small id="fundExpenseCount">0건</small>
        </article>
        <article class="fund-kpi-card warning">
          <span>회계 미반영</span>
          <strong id="fundPendingCount">0건</strong>
          <small id="fundPendingAmount">0원</small>
        </article>
        <article class="fund-kpi-card posted">
          <span>회계 반영</span>
          <strong id="fundPostedCount">0건</strong>
          <small id="fundPostedAmount">0원</small>
        </article>
      </div>

      <div class="fund-layout">
        <section class="panel fund-account-panel">
          <div class="panel-head">
            <div><h3>계좌 현황</h3><p>연결된 법인계좌의 현재 잔액</p></div>
            <button class="text-btn" id="fundReloadBtn" type="button">ECOUNT 다시 불러오기</button>
          </div>
          <div id="fundAccountList" class="fund-account-list"></div>
        </section>

        <section class="panel fund-flow-panel">
          <div class="panel-head">
            <div><h3>최근 3일 자금 흐름</h3><p id="fundPeriodLabel">조회기간 기준</p></div>
          </div>
          <div class="fund-flow-row"><span>입금</span><div class="fund-flow-track"><i id="fundIncomeBar" class="in"></i></div><strong id="fundIncomeBarText">0원</strong></div>
          <div class="fund-flow-row"><span>출금</span><div class="fund-flow-track"><i id="fundExpenseBar" class="out"></i></div><strong id="fundExpenseBarText">0원</strong></div>
          <div class="fund-note">분개장 자동조회는 사용하지 않습니다. ECOUNT 은행거래 수집자료와 이미 확인되는 회계반영 상태만 ERP에 표시합니다.</div>
        </section>
      </div>

      <section class="panel fund-transactions-panel">
        <div class="panel-head fund-head-wrap">
          <div>
            <h3>입출금 거래내역</h3>
            <p>거래일시 · 입출금 · 금액 · 잔액 · 적요 · 거래처 · 회계처리 상태를 최근 거래순으로 조회합니다.</p>
          </div>
          <div class="fund-actions">
            <button class="fund-btn secondary" id="fundRecent3Btn" type="button">최근 3일</button>
            <button class="fund-btn primary" id="fundSearchBtn" type="button">조회</button>
          </div>
        </div>

        <div class="fund-filter-grid simple">
          <label>시작일<input type="date" id="fundStartDate"></label>
          <label>종료일<input type="date" id="fundEndDate"></label>
          <label>계좌<select id="fundAccountFilter"><option value="">전체 계좌</option></select></label>
          <label>구분<select id="fundTypeFilter"><option value="">전체</option><option value="입금">입금</option><option value="출금">출금</option></select></label>
          <label>회계상태<select id="fundAccountingFilter"><option value="">전체</option><option value="pending">미반영</option><option value="posted">회계반영</option></select></label>
          <label>검색<input type="search" id="fundKeyword" placeholder="적요·거래처·계좌명"></label>
        </div>

        <div class="fund-tabs">
          <button class="fund-tab active" data-fund-tab="all" onclick="showFundTab('all',this)">전체 거래</button>
          <button class="fund-tab" data-fund-tab="pending" onclick="showFundTab('pending',this)">미반영</button>
          <button class="fund-tab" data-fund-tab="posted" onclick="showFundTab('posted',this)">회계반영</button>
        </div>

        <div class="fund-table-wrap">
          <table class="fund-table compact">
            <thead><tr>
              <th>거래일시</th><th>구분</th><th>계좌명</th><th>적요</th><th>거래처</th>
              <th>입금</th><th>출금</th><th>잔액</th><th>회계처리 상태</th><th>회계전표</th>
            </tr></thead>
            <tbody id="fundTransactionBody"></tbody>
          </table>
        </div>
      </section>
    </div>`;
  document.getElementById("fundReloadBtn")?.addEventListener("click",loadFundData);
  document.getElementById("fundRecent3Btn")?.addEventListener("click",resetFundFilters);
  document.getElementById("fundSearchBtn")?.addEventListener("click",()=>applyFundFilters());
  initFundDateRange(true);
  renderFundDashboard();
}

function initFundDateRange(force=false){
  const endInput=document.getElementById("fundEndDate");
  const startInput=document.getElementById("fundStartDate");
  if(!endInput||!startInput)return;

  // 최근 3일은 수집자료의 마지막 날짜가 아니라 실제 오늘을 기준으로 합니다.
  let end=new Date();
  let start=new Date(end);
  start.setDate(end.getDate()-2); // 오늘 포함 3일

  const fmt=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  if(force||!startInput.value)startInput.value=fmt(start);
  if(force||!endInput.value)endInput.value=fmt(end);
}

function renderFundDashboard(){
  const accounts=fundState.accounts||[];
  const txs=fundSortTransactions(fundState.filtered||[]);

  // 현재잔액: 계좌원장이 있으면 계좌원장, 없으면 계좌별 최신 거래잔액으로 보완
  let totalBalance=accounts.reduce((s,a)=>s+fundNumber(a.balance),0);
  if(!accounts.length && fundState.transactions.length){
    const latestByAccount=new Map();
    fundSortTransactions(fundState.transactions).forEach(t=>{
      const key=String(t.accountId||t.accountNumber||t.accountName||"기본계좌");
      if(!latestByAccount.has(key)) latestByAccount.set(key,t);
    });
    totalBalance=[...latestByAccount.values()].reduce((s,t)=>s+fundNumber(t.balance),0);
  }

  const incomeTx=txs.filter(t=>t.type==="입금");
  const expenseTx=txs.filter(t=>t.type==="출금");
  const pendingTx=txs.filter(t=>!fundIsPosted(t));
  const postedTx=txs.filter(t=>fundIsPosted(t));

  const income=incomeTx.reduce((s,t)=>s+fundNumber(t.amount),0);
  const expense=expenseTx.reduce((s,t)=>s+fundNumber(t.amount),0);
  const pendingAmount=pendingTx.reduce((s,t)=>s+fundNumber(t.amount),0);
  const postedAmount=postedTx.reduce((s,t)=>s+fundNumber(t.amount),0);

  setText("fundTotalBalance",fundMoney(totalBalance));
  setText("fundAccountCount",`연결 계좌 ${Math.max(accounts.length, countFundAccounts())}개`);
  setText("fundTotalIncome",fundMoney(income));
  setText("fundIncomeCount",`${incomeTx.length}건`);
  setText("fundTotalExpense",fundMoney(expense));
  setText("fundExpenseCount",`${expenseTx.length}건`);
  setText("fundPendingCount",`${pendingTx.length}건`);
  setText("fundPendingAmount",fundMoney(pendingAmount));
  setText("fundPostedCount",`${postedTx.length}건`);
  setText("fundPostedAmount",fundMoney(postedAmount));

  setText("fundSourceStatus","ECOUNT 자동연동 정상");
  setText("fundSyncTime",fundState.syncedAt?`최종 동기화 ${fundFormatDateTime(fundState.syncedAt)}`:"금융거래원장 연결됨");

  const start=document.getElementById("fundStartDate")?.value||"";
  const end=document.getElementById("fundEndDate")?.value||"";
  setText("fundPeriodLabel",start&&end?`${start} ~ ${end}`:"조회기간 기준");

  const max=Math.max(income,expense,1);
  const ib=document.getElementById("fundIncomeBar"), eb=document.getElementById("fundExpenseBar");
  if(ib)ib.style.width=`${Math.round(income/max*100)}%`;
  if(eb)eb.style.width=`${Math.round(expense/max*100)}%`;
  setText("fundIncomeBarText",fundMoney(income));
  setText("fundExpenseBarText",fundMoney(expense));

  renderFundAccounts();
  renderFundAccountFilter();
  renderFundTransactions(txs);
}

function setText(id,value){
  const el=document.getElementById(id);
  if(el)el.textContent=value;
}

function countFundAccounts(){
  const keys=new Set();
  fundState.transactions.forEach(t=>{
    const key=String(t.accountId||t.accountNumber||t.accountName||"").trim();
    if(key)keys.add(key);
  });
  return keys.size;
}

function renderFundAccounts(){
  const wrap=document.getElementById("fundAccountList");
  if(!wrap)return;

  let rows=(fundState.accounts||[]).map(a=>({
    id:a.id||a.number||a.name||"",
    bank:a.bank||"",
    name:a.name||a.accountName||"-",
    maskedNumber:a.maskedNumber||a.number||"",
    balance:fundNumber(a.balance),
    status:a.status||"정상"
  }));

  if(!rows.length && fundState.transactions.length){
    const latest=new Map();
    fundSortTransactions(fundState.transactions).forEach(t=>{
      const key=String(t.accountId||t.accountNumber||t.accountName||"기본계좌");
      if(!latest.has(key)){
        latest.set(key,{
          id:key,
          bank:t.bank||"",
          name:t.accountName||"-",
          maskedNumber:t.maskedAccount||t.maskedNumber||"",
          balance:fundNumber(t.balance),
          status:"정상"
        });
      }
    });
    rows=[...latest.values()];
  }

  if(!rows.length){
    wrap.innerHTML='<div class="fund-empty"><strong>연결된 계좌 데이터가 없습니다.</strong><span>ECOUNT 수집기를 실행하면 자동 반영됩니다.</span></div>';
    return;
  }

  wrap.innerHTML=rows.map(a=>`
    <div class="fund-account-item">
      <div class="fund-bank-icon">🏦</div>
      <div class="fund-account-main">
        <strong>${escapeHtml([a.bank,a.name].filter(Boolean).join(" · ")||"-")}</strong>
        <small>${escapeHtml(a.maskedNumber||"계좌번호 마스킹")}</small>
      </div>
      <div class="fund-account-balance">
        <strong>${fundMoney(a.balance)}</strong>
        <small class="ok">${escapeHtml(a.status||"정상")}</small>
      </div>
    </div>`).join("");
}

function renderFundAccountFilter(){
  const select=document.getElementById("fundAccountFilter");
  if(!select)return;
  const current=select.value;
  const map=new Map();

  (fundState.accounts||[]).forEach(a=>{
    const key=String(a.id||a.number||a.name||"");
    if(key)map.set(key,[a.bank,a.name||a.accountName].filter(Boolean).join(" "));
  });
  fundState.transactions.forEach(t=>{
    const key=String(t.accountId||t.accountNumber||t.accountName||"");
    if(key&&!map.has(key))map.set(key,[t.bank,t.accountName].filter(Boolean).join(" "));
  });

  select.innerHTML='<option value="">전체 계좌</option>'+
    [...map.entries()].map(([key,label])=>`<option value="${escapeHtml(key)}">${escapeHtml(label||key)}</option>`).join("");
  select.value=[...map.keys()].includes(current)?current:"";
}

function renderFundTransactions(txs){
  const body=document.getElementById("fundTransactionBody");
  if(!body)return;

  if(!txs.length){
    body.innerHTML='<tr class="fund-empty-row"><td colspan="10"><strong>조회된 거래가 없습니다.</strong><span>조회기간 또는 조건을 변경해 주세요.</span></td></tr>';
    return;
  }

  body.innerHTML=fundSortTransactions(txs).map(t=>{
    const income=t.type==="입금";
    const isPosted=fundIsPosted(t);
    const accountingStatus=isPosted?"회계반영":"미반영";
    const voucher=String(t.accountingVoucher||"").trim()||"-";
    const description=String(t.description||"").trim()||"-";
    const counterpart=String(t.counterparty||"").trim()||"-";

    return `<tr>
      <td>${escapeHtml(fundFormatDateTime(t.datetime||t.date))}</td>
      <td><span class="fund-type ${income?"in":"out"}">${escapeHtml(t.type||"-")}</span></td>
      <td><strong>${escapeHtml(t.accountName||"-")}</strong></td>
      <td>${escapeHtml(description)}</td>
      <td>${escapeHtml(counterpart)}</td>
      <td class="money in">${income?fundMoney(t.amount):"-"}</td>
      <td class="money out">${!income?fundMoney(t.amount):"-"}</td>
      <td class="money">${fundMoney(t.balance)}</td>
      <td><span class="fund-status ${isPosted?"done":"pending"}">${accountingStatus}</span></td>
      <td><strong>${escapeHtml(voucher)}</strong></td>
    </tr>`;
  }).join("");
}

function applyFundFilters(render=true){
  const start=document.getElementById("fundStartDate")?.value||"";
  const end=document.getElementById("fundEndDate")?.value||"";
  const account=document.getElementById("fundAccountFilter")?.value||"";
  const type=document.getElementById("fundTypeFilter")?.value||"";
  const accounting=document.getElementById("fundAccountingFilter")?.value||"";
  const keyword=(document.getElementById("fundKeyword")?.value||"").trim().toLowerCase();

  fundState.filtered=fundSortTransactions(fundState.transactions.filter(t=>{
    const d=fundDateValue(t.date||t.datetime);
    const accountKey=String(t.accountId||t.accountNumber||t.accountName||"");
    const posted=fundIsPosted(t);
    const hay=[t.description,t.counterparty,t.counterpartyCode,t.accountName,t.bank,t.accountingStatus,t.accountingVoucher].join(" ").toLowerCase();

    return (!start||!d||d>=start) &&
           (!end||!d||d<=end) &&
           (!account||accountKey===account) &&
           (!type||t.type===type) &&
           (!accounting||(accounting==="posted"?posted:!posted)) &&
           (!keyword||hay.includes(keyword));
  }));

  if(render)renderFundDashboard();
}

function resetFundFilters(){
  ["fundAccountFilter","fundTypeFilter","fundAccountingFilter","fundKeyword"].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.value="";
  });
  initFundDateRange(true);
  applyFundFilters();
  document.querySelectorAll(".fund-tab").forEach(b=>b.classList.toggle("active",b.dataset.fundTab==="all"));
}

function showFundTab(tab,button){
  document.querySelectorAll(".fund-tab").forEach(b=>b.classList.toggle("active",b===button));
  const accounting=document.getElementById("fundAccountingFilter");
  if(accounting){
    accounting.value=tab==="posted"?"posted":tab==="pending"?"pending":"";
  }
  applyFundFilters();
}


/* =========================================
   본사 업무관리 V1
   - 반복업무 + 직접등록 업무
   - 현재는 브라우저 localStorage 저장
   - 추후 Google Sheet 원장/API로 교체 가능
========================================= */
const HQ_TASK_STORAGE_KEY="thebigkorea_erp_hq_tasks_v1";

const HQ_TASK_DEFAULTS=[
  {id:"daily-worker",title:"일용직 근무·지급내역 확인",category:"인사·급여",cycle:"매일",rule:"DAILY",day:null,months:null,owner:"본사",memo:"일용직 근무내역·지급 및 신고자료 확인"},
  {id:"payroll-10",title:"급여 지급",category:"인사·급여",cycle:"매월 10일",rule:"MONTHLY",day:10,months:null,owner:"본사",memo:"급여 확정 및 지급 처리"},
  {id:"shinsegae-10",title:"신세계 계열 정산",category:"정산",cycle:"매월 10일",rule:"MONTHLY",day:10,months:null,owner:"본사",memo:"신세계 계열 점포 월 정산"},
  {id:"lotte-20",title:"롯데백화점 정산",category:"정산",cycle:"매월 20일",rule:"MONTHLY",day:20,months:null,owner:"본사",memo:"롯데백화점 계열 점포 월 정산"},
  {id:"vat-quarter",title:"부가가치세 신고·정산",category:"세무",cycle:"1·4·7·10월",rule:"MONTHS",day:25,months:[1,4,7,10],owner:"본사",memo:"부가가치세 신고·납부 일정 확인"}
];

function hqTaskDateKey(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function loadHqTaskState(){
  try{return JSON.parse(localStorage.getItem(HQ_TASK_STORAGE_KEY)||'{"custom":[],"done":{}}');}
  catch(e){return {custom:[],done:{}};}
}
function saveHqTaskState(state){localStorage.setItem(HQ_TASK_STORAGE_KEY,JSON.stringify(state));}
function getHqTasks(){const s=loadHqTaskState();return [...HQ_TASK_DEFAULTS,...(s.custom||[])];}
function isHqTaskDue(task,d){
  const m=d.getMonth()+1, day=d.getDate();
  if(task.rule==="DAILY") return true;
  if(task.rule==="MONTHLY") return day===Number(task.day);
  if(task.rule==="MONTHS") return (task.months||[]).includes(m) && day===Number(task.day||25);
  if(task.rule==="DATE") return task.date===hqTaskDateKey(d);
  return false;
}
function hqTaskNextDate(task,from=new Date()){
  let d=new Date(from.getFullYear(),from.getMonth(),from.getDate());
  for(let i=0;i<400;i++){
    if(isHqTaskDue(task,d)) return new Date(d);
    d.setDate(d.getDate()+1);
  }
  return null;
}
function hqTaskStatus(task,d){
  const state=loadHqTaskState(), key=`${task.id}|${hqTaskDateKey(d)}`;
  return !!state.done?.[key];
}
function toggleHqTaskDone(id,dateKey){
  const state=loadHqTaskState(); state.done=state.done||{};
  const key=`${id}|${dateKey}`;
  state.done[key]=!state.done[key];
  saveHqTaskState(state);
  renderHqTaskView();
  updateHomeHqTaskSummary();
}
function addHqTask(){
  const title=document.getElementById("hqTaskTitle")?.value.trim();
  const date=document.getElementById("hqTaskDate")?.value;
  const category=document.getElementById("hqTaskCategory")?.value||"기타";
  const owner=document.getElementById("hqTaskOwner")?.value.trim()||"본사";
  if(!title||!date){alert("업무명과 처리일을 입력해 주세요.");return;}
  const state=loadHqTaskState();state.custom=state.custom||[];
  state.custom.push({id:"custom-"+Date.now(),title,category,cycle:"직접 지정",rule:"DATE",date,owner,memo:""});
  saveHqTaskState(state);
  document.getElementById("hqTaskTitle").value="";
  renderHqTaskView();
  updateHomeHqTaskSummary();
}
function deleteHqTask(id){
  if(!String(id).startsWith("custom-")) return;
  if(!confirm("등록한 업무를 삭제할까요?")) return;
  const state=loadHqTaskState();
  state.custom=(state.custom||[]).filter(x=>x.id!==id);
  saveHqTaskState(state);renderHqTaskView();updateHomeHqTaskSummary();
}
function buildHqTaskView(){
  const el=document.getElementById("view-hqtasks"); if(!el)return;
  el.innerHTML=`
    <section class="module-hero hq-task-hero">
      <div><span class="eyebrow">HEAD OFFICE WORK CALENDAR</span><h2>본사 업무일정 관리</h2>
      <p>매일·매월·분기별 반복업무와 회사 자체 마감업무를 한 원장에 축적합니다.</p></div>
      <div class="legacy-count"><strong id="hqTaskCount">0</strong><span>오늘 처리 업무</span></div>
    </section>
    <div class="hq-task-kpis">
      <article><span>오늘 업무</span><strong id="hqTodayCount">0건</strong><small>오늘 처리 대상</small></article>
      <article><span>완료</span><strong id="hqDoneCount">0건</strong><small>오늘 완료 처리</small></article>
      <article><span>미처리</span><strong id="hqPendingCount">0건</strong><small>확인이 필요한 업무</small></article>
      <article><span>등록 업무</span><strong id="hqTotalCount">0개</strong><small>반복 + 직접등록</small></article>
    </div>
    <div class="hq-task-layout">
      <section class="panel">
        <div class="panel-head"><div><h3>오늘 해야 할 업무</h3><p id="hqTodayLabel"></p></div></div>
        <div id="hqTodayList" class="hq-today-list"></div>
      </section>
      <section class="panel">
        <div class="panel-head"><div><h3>업무 추가</h3><p>회사 자체 마감업무를 계속 등록해 데이터베이스로 축적합니다.</p></div></div>
        <div class="hq-task-form">
          <label>업무명<input id="hqTaskTitle" placeholder="예: 카드매출 정산 확인"></label>
          <div class="hq-form-row">
            <label>처리일<input type="date" id="hqTaskDate"></label>
            <label>구분<select id="hqTaskCategory"><option>정산</option><option>인사·급여</option><option>세무</option><option>점포</option><option>계약</option><option>기타</option></select></label>
          </div>
          <label>담당<input id="hqTaskOwner" placeholder="본사 / 담당자명"></label>
          <button class="hq-add-btn" onclick="addHqTask()">업무 등록</button>
        </div>
      </section>
    </div>
    <section class="panel hq-ledger-panel">
      <div class="panel-head"><div><h3>본사 업무 원장</h3><p>반복업무와 직접 등록한 업무를 함께 관리합니다.</p></div></div>
      <div class="hq-ledger-wrap"><table class="hq-ledger"><thead><tr><th>업무명</th><th>구분</th><th>주기</th><th>담당</th><th>다음 예정일</th><th>비고</th><th>관리</th></tr></thead><tbody id="hqLedgerBody"></tbody></table></div>
    </section>`;
}
function renderHqTaskView(){
  const el=document.getElementById("view-hqtasks");if(!el)return;
  const today=new Date(), key=hqTaskDateKey(today), tasks=getHqTasks();
  const due=tasks.filter(t=>isHqTaskDue(t,today));
  const done=due.filter(t=>hqTaskStatus(t,today));
  document.getElementById("hqTaskCount").textContent=due.length;
  document.getElementById("hqTodayCount").textContent=due.length+"건";
  document.getElementById("hqDoneCount").textContent=done.length+"건";
  document.getElementById("hqPendingCount").textContent=(due.length-done.length)+"건";
  document.getElementById("hqTotalCount").textContent=tasks.length+"개";
  document.getElementById("hqTodayLabel").textContent=`${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 기준`;
  document.getElementById("hqTodayList").innerHTML=due.length?due.map(t=>{
    const completed=hqTaskStatus(t,today);
    return `<div class="hq-today-item ${completed?"done":""}">
      <button class="hq-check" onclick="toggleHqTaskDone('${escapeJs(t.id)}','${key}')">${completed?"✓":""}</button>
      <div><strong>${escapeHtml(t.title)}</strong><small>${escapeHtml(t.category)} · ${escapeHtml(t.owner||"본사")} · ${escapeHtml(t.cycle||"")}</small></div>
      <span class="hq-state ${completed?"done":"pending"}">${completed?"완료":"처리대기"}</span>
    </div>`}).join(""):`<div class="fund-empty"><strong>오늘 예정된 업무가 없습니다.</strong><span>직접 업무를 등록하거나 반복업무를 추가할 수 있습니다.</span></div>`;
  document.getElementById("hqLedgerBody").innerHTML=tasks.map(t=>{
    const next=hqTaskNextDate(t,today);
    return `<tr><td><strong>${escapeHtml(t.title)}</strong></td><td>${escapeHtml(t.category)}</td><td>${escapeHtml(t.cycle||"-")}</td><td>${escapeHtml(t.owner||"-")}</td><td>${next?hqTaskDateKey(next):"-"}</td><td>${escapeHtml(t.memo||"")}</td><td>${String(t.id).startsWith("custom-")?`<button class="hq-delete-btn" onclick="deleteHqTask('${escapeJs(t.id)}')">삭제</button>`:"기본업무"}</td></tr>`;
  }).join("");
}
function updateHomeHqTaskSummary(){
  const today=new Date();
  const todayKey=hqTaskDateKey(today);
  const tasks=getHqTasks();
  const state=loadHqTaskState();

  const dueToday=tasks.filter(t=>isHqTaskDue(t,today));
  const doneToday=dueToday.filter(t=>hqTaskStatus(t,today));
  const pendingToday=dueToday.filter(t=>!hqTaskStatus(t,today));

  const inDays=(base,days)=>{
    const d=new Date(base.getFullYear(),base.getMonth(),base.getDate());
    d.setDate(d.getDate()+days);
    return d;
  };

  const soonEnd=inDays(today,7);
  const soon=tasks.filter(t=>{
    const n=hqTaskNextDate(t,today);
    return n && n>today && n<=soonEnd;
  });

  // 직접 지정 업무 중 기한이 지났는데 완료되지 않은 항목
  const overdue=tasks.filter(t=>{
    if(t.rule!=="DATE" || !t.date) return false;
    const d=new Date(t.date+"T00:00:00");
    if(d>=today) return false;
    return !state.done?.[`${t.id}|${t.date}`];
  });

  // 이번 달에 한 번 이상 발생하는 업무
  const y=today.getFullYear(), m=today.getMonth();
  const monthStart=new Date(y,m,1), monthEnd=new Date(y,m+1,0);
  const monthTasks=tasks.filter(t=>{
    for(let d=new Date(monthStart); d<=monthEnd; d.setDate(d.getDate()+1)){
      if(isHqTaskDue(t,d)) return true;
    }
    return false;
  });

  const setText=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
  setText("homeTaskToday",dueToday.length+"건");
  setText("homeTaskDone",doneToday.length+"건");
  setText("homeTaskPending",pendingToday.length+"건");
  setText("homeTaskSoon",soon.length+"건");
  setText("homeTaskOverdue",overdue.length+"건");
  setText("homeTaskMonth",monthTasks.length+"건");

  const alertList=document.querySelector("#view-home .alert-list");if(!alertList)return;
  const old=document.getElementById("homeHqTaskAlert");if(old)old.remove();
  const item=document.createElement("div");item.id="homeHqTaskAlert";item.className="alert-item";
  item.innerHTML=`<span class="dot ${overdue.length?"red":pendingToday.length?"amber":"green"}"></span><div><strong>${overdue.length?`기한 경과 ${overdue.length}건`:pendingToday.length?`오늘 본사 업무 ${pendingToday.length}건 미처리`:"오늘 본사 업무 처리 완료"}</strong><small>${overdue.length?overdue.slice(0,2).map(x=>escapeHtml(x.title)).join(" · "):pendingToday.length?pendingToday.slice(0,2).map(x=>escapeHtml(x.title)).join(" · "):"오늘 예정 업무를 모두 완료했습니다."}</small></div><b>확인</b>`;
  item.onclick=()=>openView("hqtasks");alertList.prepend(item);
}

function buildStoresView(){
  const el=document.getElementById("view-stores");
  if(!el)return;

  const stores=[
    {
      name:"한국의집 잠실",
      sub:"롯데월드몰",
      links:[
        ["인트라넷","한국의집 롯데월드몰 인트라넷"],
        ["출퇴근 관리자 조회","한국의집 출퇴근 관리자"],
        ["영업실적","한국의집 영업실적 원장"]
      ]
    },
    {
      name:"압구정 길채정",
      sub:"갤러리아 압구정",
      links:[
        ["인트라넷","길채정 압구정 인트라넷"],
        ["출퇴근 관리자 조회","길채정 출퇴근 관리자"],
        ["영업실적","길채정 영업실적 원장"]
      ]
    },
    {
      name:"평촌 소바공방",
      sub:"롯데백화점 평촌점",
      links:[
        ["인트라넷","소바공방 평촌 인트라넷"],
        ["출퇴근 관리자 조회","소바공방 출퇴근 관리자"],
        ["영업실적","소바공방 영업실적 원장"]
      ]
    },
    {
      name:"파주 효종갱",
      sub:"신세계 파주 프리미엄아울렛",
      links:[
        ["인트라넷","효종갱 파주 인트라넷"]
      ]
    }
  ];

  el.innerHTML=`
    <section class="module-hero legacy-hero">
      <div>
        <span class="eyebrow">STORE MANAGEMENT</span>
        <h2>지점 관리</h2>
        <p>기존 본사 업무포털의 지점별 인트라넷과 주요 관리업무를 ERP에서 바로 연결합니다.</p>
      </div>
      <div class="legacy-count"><strong>4</strong><span>직영점 연결</span></div>
    </section>

    <div class="module-grid legacy-module-grid">
      ${stores.map(store=>`
        <article class="module-card linked">
          <div class="module-card-top">
            <span class="system-state live">운영중</span>
          </div>
          <h3>${escapeHtml(store.name)}</h3>
          <p>${escapeHtml(store.sub)}</p>
          <div style="display:grid;gap:9px;margin-top:18px;">
            ${store.links.map(([label,title],idx)=>`
              <button
                style="${idx===0?'font-weight:800;':''}"
                onclick="openModule('stores','${escapeJs(title)}')">
                ${escapeHtml(label)} ↗
              </button>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </div>

    <div class="note-box">
      <strong>기존 지점관리 연동:</strong>
      한국의집 잠실 · 압구정 길채정 · 평촌 소바공방은 인트라넷/출퇴근 관리자/영업실적을 연결하고,
      파주 효종갱은 현재 기존 포털과 동일하게 인트라넷을 연결합니다.
    </div>
  `;
}

function buildModuleViews(){
  buildFundView();
  buildStoresView();

  Object.entries(MODULES).forEach(([key,items])=>{
    if(key==="fund" || key==="stores") return;
    const el=document.getElementById(`view-${key}`);
    if(!el)return;
    const meta=PAGE_META[key]||[key,""];
    const linkedCount=items.filter(item=>!!item[3]).length;
    const special = key==="purchase" || key==="profit"
      ? `<div class="note-box"><strong>운영 기준:</strong> 현재 사용 중인 기존 시스템부터 우선 연결하고, 새 기능은 이후 단계에서 추가합니다.</div>`
      : "";

    el.innerHTML=`
      <section class="module-hero legacy-hero">
        <div>
          <span class="eyebrow">EXISTING SYSTEM CONNECTION</span>
          <h2>${escapeHtml(meta[0])}</h2>
          <p>${escapeHtml(meta[1])}</p>
        </div>
        <div class="legacy-count"><strong>${linkedCount}</strong><span>기존 시스템 연결</span></div>
      </section>
      <div class="module-grid legacy-module-grid">
        ${items.map(([title,desc,label,url])=>`
          <article class="module-card ${url?"linked":"planned"}">
            <div class="module-card-top">
              <span class="system-state ${url?"live":"wait"}">${url?"연결 완료":"추후 구축"}</span>
            </div>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(desc)}</p>
            <button ${url?"":"disabled"} onclick="openModule('${escapeJs(key)}','${escapeJs(title)}')">${escapeHtml(label||"열기")}${url?" ↗":""}</button>
          </article>`).join("")}
      </div>
      ${special}
    `;
  });
}

function findModule(section,title){
  const items=MODULES[section]||[];
  return items.find(item=>item[0]===title)||null;
}

function openModule(section,title){
  const item=findModule(section,title);
  const url=item?.[3];
  if(url){
    window.open(url,"_blank","noopener,noreferrer");
    return;
  }
  alert(`${title}\n\n현재 기존 본사 포털에서 확인되는 실제 연결 주소가 없는 기능입니다.\n기존 시스템 연결을 모두 끝낸 뒤 새 기능으로 구축합니다.`);
}

function handleQuickSystem(key){
  const map={
    managementDashboard:SYSTEM_LINKS.managementDashboard,
    attendanceAdmin:SYSTEM_LINKS.attendanceAdmin,
    notice:HQ_BASE+"notice.html",
    salesInput:"https://script.google.com/macros/s/AKfycbyfytW-OyP84u1yaa4FJIF0EDclm_w6CWpY1rIDszzax7SfVuxF9KsDw5yfd53k0fb6Nw/exec",
    leave:SYSTEM_LINKS.leave,
    trip:HQ_BASE+"trip.html",
    opening:HQ_BASE+"store-opening.html",
    daily:SYSTEM_LINKS.daily,
    storeDashboard:SYSTEM_LINKS.storeDashboard,
    mail:"https://mail.worksmobile.com",
    drive:"https://drive.worksmobile.com"
  };
  if(map[key]){
    window.open(map[key],"_blank","noopener,noreferrer");
    return;
  }
  const views={storePartTime:"payroll"};
  if(views[key]) openView(views[key]);
}

function escapeJs(s){
  return String(s).replace(/\\/g,"\\\\").replace(/'/g,"\\'");
}

document.addEventListener("DOMContentLoaded",init);
