
    const HQ_BASE = "https://thebigkorea.github.io/thebigkorea-hq/";

    const PAGE_META = {
      home:["ERP 홈","더큰코리아 전체 경영현황을 한눈에 확인합니다."],
      hr:["통합인사","기존 본사 인사·증명서·퇴직 시스템을 한곳에서 연결합니다."],
      attendance:["근태 · 휴가","기존 출퇴근 및 연월차 시스템을 그대로 연결합니다."],
      contract:["전자계약","기존 정규직·아르바이트·용역계약과 계약관리대장을 연결합니다."],
      payroll:["급여관리","점포 통합급여·아르바이트·일용직 시스템을 연결합니다."],
      tax:["4대보험 · 세무","4대보험 및 세무관리 기능을 순차적으로 통합합니다."],
      stores:["점포관리","기존 지점 인트라넷·출퇴근 관리자·영업실적 원장을 점포별로 연결합니다."],
      schedule:["근무스케줄","기존 점포별 주간·월간 스케줄 시스템을 연결합니다."],
      sales:["매출관리","기존 영업실적 대시보드·영업점 매출입력·통합실적원장을 연결합니다."],
      opening:["신규점포 개설","기존 신규점포 관리·원장·디자인 업무관리 시스템을 연결합니다."],
      hqtasks:["본사 업무관리","본사에서 매일·매월·분기별로 처리해야 하는 업무와 마감일정을 관리합니다."],
      operations:["운영지원","매장점검과 공지사항을 한곳에서 확인합니다."],
      settlement:["월정산","기존 점포별 정산입력·정산관리·월별합산·원장을 연결합니다."],
      travel:["차량 · 출장","법인차량 관리와 출장 신청·승인·정산을 통합 연결합니다."],
      tools:["업무도구","본사에서 사용하는 네이버웍스 메일과 공용 드라이브를 연결합니다."],
      admin:["원장 · 관리자","기존 본사 원장과 관리자 화면을 한곳에서 연결합니다."],
      purchase:["매입 · 원가","점포별 발주·매입·식재료 원가를 관리합니다."],
      fund:["경비 · 자금","ECOUNT에서 수집되는 법인계좌 거래를 기반으로 현재잔액·최근 입출금·회계반영 상태를 조회합니다."],
      profit:["손익관리","점포별 실제손익과 관리지표를 조회합니다."],
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
        ["점포 통합 급여관리","점포 통합 급여 작성·확정·명세서","통합급여","https://script.google.com/macros/s/AKfycbyzLLU_vboJprliPHe_MELBe-M9crwK9xRSHB20BoRCMjC-DFwJG5MEE3D_EtBCjGp0gg/exec"],
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
        ["거래처 관리","점포 공급업체와 결제조건 관리","준비중",null],
        ["발주 관리","기존 발주 시스템 통합 위치","준비중",null],
        ["매입 관리","입고·세금계산서·지급대기 흐름 관리","준비중",null],
        ["원가율","점포 식재료비와 매출을 연결한 원가율 관리","준비중",null]
      ],
      fund:[
        ["계좌 현황","연결된 법인계좌별 현재 잔액과 최근 수집상태를 확인합니다.","계좌",null],
        ["입출금 거래내역","최근 은행 거래를 기간·계좌·입출금 구분으로 조회합니다.","거래내역",null],
        ["회계반영 상태","ECOUNT에서 이미 확인되는 회계반영 여부와 회계전표번호를 조회합니다.","회계상태",null]
      ],
      profit:[
        ["점포 손익","매출-원가-인건비-임대·수수료-경비 기준 실제손익","준비중",null],
        ["관리손익","확인 가능한 매출·수익·계약정보 중심 관리지표","준비중",null],
        ["전사 손익","점포 손익과 본사비용을 포함한 전사손익","준비중",null]
      ],
      analysis:[
        ["점포 비교","매출·인건비율·원가율·영업이익 비교","준비중",null],
        ["영업실적 대시보드","더큰코리아 통합 영업실적 대시보드","대시보드 열기","https://script.google.com/macros/s/AKfycbzX4BEypYJv6h-5FZBTCFx1iJfHk-3DPBIHO9yRJfUmdXyy6xATo7vGnjG_T1swabh7XQ/exec"],
        ["추세 분석","전월·전년동월 주요 지표 추이","준비중",null]
      ]
    };


    /* =========================================
       더큰코리아 MasterData 운영지원 통합조회
       2026-09-15 업로드본 기준
       ※ PW/비밀번호 계열은 공개 GitHub 코드 노출 방지를 위해 화면에서 자동 마스킹
    ========================================= */
    const MASTER_DATA = {};

    const MASTER_CATEGORIES = [
      ["전체","📚"],["본지점","🏢"],["백화점계약","📑"],["포스","🖥️"],
      ["바이어","👤"],["지점","📞"],["월말정산","🧾"],["백화점매출","💰"],
      ["정부24","🏛️"],["아이디","🔐"],["보험","🛡️"],["연락처","☎️"],
      ["본사출고(대납)","💳"],["전용상품","📦"]
    ];

    let masterState = { category:"전체", query:"" };

    function masterEscape(v){ return escapeHtml(String(v ?? "")); }
    function masterNorm(v){ return String(v ?? "").toLowerCase().replace(/\s+/g,""); }
    function masterIsSecret(label){
      const s=masterNorm(label);
      return s==="pw" || s.includes("password") || s.includes("비밀번호") || s.includes("패스워드");
    }
    function masterDisplayValue(label,value){
      if(!value) return "";
      return masterIsSecret(label) ? "원본 MasterData에서 확인" : value;
    }
    function masterRows(sheetName){
      const rows = MASTER_DATA[sheetName] || [];
      return rows.map((row,idx)=>({row,idx}));
    }
    function masterSearchBlob(sheetName,row){
      return masterNorm(sheetName+" "+row.join(" "));
    }
    function masterSheetTitle(sheetName){
      const found=MASTER_CATEGORIES.find(x=>x[0]===sheetName);
      return (found?.[1]||"📄")+" "+sheetName;
    }

    function buildOperationsView(){
      const el=document.getElementById("view-operations");
      if(!el) return;
      el.innerHTML=`
        <section class="module-hero operations-hero">
          <div>
            <span class="eyebrow">THE BIG KOREA OPERATIONS CENTER</span>
            <h2>더큰코리아 운영정보센터</h2>
            <p>매장점검과 공지사항을 한 화면에서 빠르게 확인합니다.</p>
          </div>
          <div class="operations-hero-actions operations-card-actions">
            <button class="operations-link-card" onclick="openModule('operations','매장점검대시보드')">
              <span class="operations-link-icon">🏬</span>
              <span class="operations-link-copy">
                <strong>매장점검 대시보드</strong>
                <small>점포 피드백 · 보완요청 · 조치현황</small>
              </span>
              <b>→</b>
            </button>
            <button class="operations-link-card" onclick="openModule('operations','공지사항')">
              <span class="operations-link-icon">📢</span>
              <span class="operations-link-copy">
                <strong>공지사항</strong>
                <small>운영지침 · 행사 · 교육 · 긴급사항</small>
              </span>
              <b>→</b>
            </button>
          </div>
        </section>

      `;
    }

    function setMasterSearch(v){
      masterState.query=String(v||"").trim();
      renderMasterData();
    }
    function clearMasterSearch(){
      masterState.query="";
      const input=document.getElementById("masterSearchInput");
      if(input) input.value="";
      renderMasterData();
    }
    function setMasterCategory(name){
      masterState.category=name;
      renderMasterData();
    }

    function renderMasterData(){
      const tabs=document.getElementById("masterCategoryTabs");
      const summary=document.getElementById("masterSummary");
      const results=document.getElementById("masterResults");
      if(!tabs || !summary || !results) return;

      tabs.innerHTML=MASTER_CATEGORIES.map(([name,icon])=>`
        <button type="button" class="master-tab ${masterState.category===name?"active":""}"
          onclick="setMasterCategory('${escapeJs(name)}')">${icon} ${masterEscape(name)}</button>
      `).join("");

      const q=masterNorm(masterState.query);
      const names=masterState.category==="전체"
        ? MASTER_CATEGORIES.slice(1).map(x=>x[0])
        : [masterState.category];

      let totalRows=0, matchedRows=0;
      const blocks=[];

      names.forEach(sheetName=>{
        const rows=masterRows(sheetName);
        totalRows += rows.length;
        const filtered = q ? rows.filter(x=>masterSearchBlob(sheetName,x.row).includes(q)) : rows;
        if(!filtered.length) return;
        matchedRows += filtered.length;

        const maxCols=Math.max(...filtered.map(x=>x.row.length),1);
        blocks.push(`
          <section class="master-sheet-card">
            <div class="master-sheet-head">
              <h4>${masterSheetTitle(sheetName)}</h4>
              <span>${filtered.length.toLocaleString("ko-KR")}행</span>
            </div>
            <div class="master-table-wrap">
              <table class="master-table">
                <tbody>
                  ${filtered.map((x)=>`
                    <tr>
                      <th>${x.idx+1}</th>
                      ${Array.from({length:maxCols},(_,i)=>{
                        const raw=x.row[i]||"";
                        const previous=x.idx>0 ? (rows[x.idx-1]?.row?.[i]||"") : "";
                        const label=(x.idx===0 ? raw : previous);
                        const display=masterDisplayValue(label,raw);
                        return `<td title="${masterEscape(display)}">${masterEscape(display) || '<span class="master-empty">-</span>'}</td>`;
                      }).join("")}
                    </tr>`).join("")}
                </tbody>
              </table>
            </div>
          </section>
        `);
      });

      summary.innerHTML=`
        <div><span>조회 분류</span><strong>${masterState.category==="전체"?"전체 13개":masterEscape(masterState.category)}</strong></div>
        <div><span>검색 결과</span><strong>${matchedRows.toLocaleString("ko-KR")}행</strong></div>
        <div><span>검색어</span><strong>${masterState.query?masterEscape(masterState.query):"전체 보기"}</strong></div>
      `;

      results.innerHTML=blocks.length ? blocks.join("") :
        `<div class="master-no-result"><strong>검색 결과가 없습니다.</strong><span>검색어를 줄이거나 다른 분류를 선택해 주세요.</span></div>`;
    }


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

    // 재계약 대상 조회
    // 신규 더큰코리아 통합 전자계약 + 기존 한국의집 REG 계약
    const CONTRACT_RENEWAL_API_URL = HR_API_URL;
    const LEGACY_CONTRACT_RENEWAL_API_URL =
      "https://script.google.com/macros/s/AKfycbzCO4TLMRGgt_OY-3T92mw58AAKcOwquq0ubepUEJgPO9YPeMV-hNeP7AHy7lvOPog7oQ/exec";

    let CONTRACT_RENEWAL_ITEMS = [];


    /* 네 출퇴근 Apps Script의 최신 /exec 배포 주소 */
    const ATTENDANCE_STORES = [
      {name:"더큰코리아 본사",url:"https://script.google.com/macros/s/AKfycbzRL0MceE5NfdEro8Og1VnjLhTc-pcCXKl0d3hXV8u8A3mNoRBBrTEfGdMtp2ohotWx/exec"},
      {name:"한국의집",url:"https://script.google.com/macros/s/AKfycbz6rYVTUixqPOhHhethQcRI4ziwNukl8EcZx9nVvFLw0rV5o4kLD_BExlONS7WPGE54sQ/exec"},
      {name:"평촌 소바공방",url:"https://script.google.com/macros/s/AKfycbwqe8v-KtP_xn3eJ3keFMJ8a4G0zyfk6Rj5lBFZ8oSoVHm370qQ9xjUpi0bzEPbBxed/exec"},
      {name:"압구정 길채정",url:"https://script.google.com/macros/s/AKfycbyJuwQdfCgVrlCu6gH6JepEXu8u4pXrWueGimopd7s5U8Jwm4XqQWSfir-mnixu1mywYg/exec"},
      {name:"효종갱 파주점",url:"https://script.google.com/macros/s/AKfycbwepn9ybkMA6BPSqobW1009eCdxxdbfRv_1yuesYqormK3F1Rr74Rp6m_fN7CKiCud5/exec"}
    ];
    let attendanceStoreData = [];

    async function loadAllStoreAttendance(){
      const summary=document.getElementById("attendanceRosterSummary");
      const groups=document.getElementById("attendanceStoreGroups");
      if(!summary||!groups)return;

      summary.textContent=`지정된 ${ATTENDANCE_STORES.length}개 사업장 출퇴근 현황을 불러오는 중입니다.`;
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
        summary.textContent=`${ATTENDANCE_STORES.length}개 사업장 오늘 출근 ${total}명 · 근무 중 ${working}명`;
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

    function compactKpiMoney(v){
      const n=numberOrZero(v);
      if(!n) return "0원";
      if(n>=100000000){
        const eok=n/100000000;
        const digits=eok>=100 ? 0 : 1;
        return eok.toLocaleString("ko-KR",{maximumFractionDigits:digits})+"억원";
      }
      if(n>=10000){
        return (n/10000).toLocaleString("ko-KR",{maximumFractionDigits:0})+"만원";
      }
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

      // ERP 홈 회사 운영현황 KPI도 같은 영업실적 데이터로 자동 갱신
      const kpiYearSales=document.getElementById("kpiAllStoreYearSales");
      const kpiMonthSales=document.getElementById("kpiSelectedMonthSales");
      const kpiYearLabel=document.getElementById("kpiSalesYearLabel");
      const kpiMonthLabel=document.getElementById("kpiSalesMonthLabel");
      const kpiTotalStores=document.getElementById("kpiTotalStores");

      if(kpiYearSales){
        kpiYearSales.textContent=allStoreYearToDate ? compactKpiMoney(allStoreYearToDate) : "자료 확인";
        kpiYearSales.title=allStoreYearToDate ? money(allStoreYearToDate) : "";
      }
      if(kpiMonthSales){
        const selectedDirectSales=numberOrZero(payload.selectedMonthSales ?? payload.totalCurrent ?? totalCurrent);
        kpiMonthSales.textContent=compactKpiMoney(selectedDirectSales);
        kpiMonthSales.title=money(selectedDirectSales);
      }
      if(kpiYearLabel){
        kpiYearLabel.textContent=`${payload.year||new Date().getFullYear()} 누적 매출`;
      }
      if(kpiMonthLabel){
        const selected=document.getElementById("erpMonth")?.value||"";
        const m=selected.split("-")[1];
        kpiMonthLabel.textContent=m ? `${Number(m)}월 매출` : "선택월 매출";
      }
      // 점포 수는 MasterData 본지점 API에서 별도로 갱신하므로
      // 영업실적 API의 점포 수로 덮어쓰지 않습니다.

      document.getElementById("salesSelectedMonth").textContent=money(payload.selectedMonthSales ?? payload.totalCurrent ?? totalCurrent);
      document.getElementById("salesPreviousYearAmount").textContent=money(totalYear);
      document.getElementById("salesYearComparison").innerHTML=totalYear?changeHtml(totalCurrent,totalYear):'<span class="sales-change same">비교자료 없음</span>';
      document.getElementById("salesYearToDate").textContent=money(totalYearToDate);
      document.getElementById("salesYearTotalLabel").textContent=`4개 점포 ${payload.year||new Date().getFullYear()}년 매출 합계`;
      document.getElementById("salesAllStoreYearToDate").textContent=allStoreYearToDate?money(allStoreYearToDate):"캐시 확인 필요";
      document.getElementById("salesAllStoreYearTotalLabel").textContent=`${payload.year||new Date().getFullYear()}년 더큰코리아 전 점포 매출 합계`;
      document.getElementById("salesAllStoreYearNote").textContent=payload.totals?.allStoreCount?`1월부터 선택 월까지 · ${payload.totals.allStoreCount}개 점포`:"경영대시보드 캐시 기준";

      const status=document.getElementById("salesDataStatus");
      status.textContent=`4개 점포 ${available.length}/4 연동`;
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
        comparisonGuideEl.textContent="이 화면은 4개 점포의 영업실적을 표시합니다. 자세한 실적은 ‘영업실적 대시보드 열기’를 눌러 조회하세요.";
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
          employmentType:item.employmentType||item.employeeType||item.workType||item["고용형태"]||item["근로형태"]||"",
          contractType:item.employmentType||item.contractType||item.contract_type||item["계약형태"]||"",
          status:item.status||item.employmentStatus||item.workStatus||item["재직상태"]||item["상태"]||""
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
        // 현재 인사DB의 '계약직'은 회사 운영현황에서는 아르바이트로 통합 집계
        if(raw.includes("계약")) return "아르바이트";
        if(raw.includes("파견")) return "파견";
        return raw;
      }

      async function getHrApi(params){
        const query=new URLSearchParams();

        // HR API는 ERP 공통 인증 토큰이 있어야 직원정보를 반환한다.
        // 직원관리 화면(getApi)과 동일하게 홈 대시보드 조회에도 토큰을 전달한다.
        const erpToken = (typeof erpGetToken === "function") ? erpGetToken() : null;
        if(!erpToken){
          throw new Error("ERP 로그인이 필요합니다.");
        }

        Object.keys(params||{}).forEach(key=>{
          const value=params[key];
          if(value!==undefined && value!==null && String(value)!==""){
            query.set(key,String(value));
          }
        });
        query.set("erpToken",erpToken);
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
        let employeeData=null;
        let rawRows=[];
        const employeeActions=["getEmployeesAdmin","getEmployees","listEmployees"];

        for(const action of employeeActions){
          try{
            const candidate=await getHrApi({action});
            const candidateRows=
              (Array.isArray(candidate?.employees) && candidate.employees) ||
              (Array.isArray(candidate?.rows) && candidate.rows) ||
              (Array.isArray(candidate?.data) && candidate.data) ||
              (Array.isArray(candidate?.result) && candidate.result) ||
              (Array.isArray(candidate?.staff) && candidate.staff) ||
              (Array.isArray(candidate?.items) && candidate.items) ||
              (Array.isArray(candidate?.data?.employees) && candidate.data.employees) ||
              (Array.isArray(candidate?.data?.rows) && candidate.data.rows) ||
              (Array.isArray(candidate?.data?.staff) && candidate.data.staff) ||
              (Array.isArray(candidate?.data?.items) && candidate.data.items) ||
              [];

            employeeData=candidate;
            if(candidateRows.length){
              rawRows=candidateRows;
              break;
            }
          }catch(actionError){
            console.warn(`직원 조회 ${action} 실패:`,actionError);
          }
        }

        if(!employeeData || !rawRows.length){
          throw new Error("직원 조회 API 연결 실패");
        }

        const rows=rawRows.map(normalizeUnifiedEmployee);

        const activeEmployees=rows.filter(item=>
          ["재직","재직중","근무중","active","사용"].includes(String(item.status||"").replace(/\s+/g,"").toLowerCase())
        );

        const grand={};
        activeEmployees.forEach(item=>{
          const group=normalizeEmploymentGroup(item);
          grand[group]=Number(grand[group]||0)+1;
        });

        if(!rows.length){
          throw new Error(employeeData.message||"직원 목록이 비어 있습니다.");
        }

        if(employeeEl) employeeEl.textContent=`${activeEmployees.length}명`;
        if(regularEl) regularEl.textContent=`${Number(grand["정규직"]||0)}명`;
        if(partTimeEl) partTimeEl.textContent=`${Number(grand["아르바이트"]||0)}명`;
        if(businessEl) businessEl.textContent=`${Number(grand["사업소득자"]||0)}명`;

        // 재직 직원 카드 팝업 구성현황 동기화
        const modalTotal=document.getElementById("employeeModalTotal");
        const modalRegular=document.getElementById("employeeModalRegular");
        const modalPartTime=document.getElementById("employeeModalPartTime");
        const modalBusiness=document.getElementById("employeeModalBusiness");
        if(modalTotal) modalTotal.textContent=`${activeEmployees.length}명`;
        if(modalRegular) modalRegular.textContent=`${Number(grand["정규직"]||0)}명`;
        if(modalPartTime) modalPartTime.textContent=`${Number(grand["아르바이트"]||0)}명`;
        if(modalBusiness) modalBusiness.textContent=`${Number(grand["사업소득자"]||0)}명`;

        // 계약직은 아르바이트에 포함하므로 별도 항목은 화면에서 숨김
        if(contractEl){
          contractEl.textContent="0명";
          const wrap=contractEl.closest(".employee-breakdown-item");
          if(wrap) wrap.hidden=true;
        }

        const shownGroups=["정규직","아르바이트","사업소득자"];
        const otherCount=Object.keys(grand)
          .filter(group=>!shownGroups.includes(group))
          .reduce((sum,group)=>sum+Number(grand[group]||0),0);

        if(otherEl){
          otherEl.textContent=`${otherCount}명`;
          const wrap=otherEl.closest(".employee-breakdown-item");
          if(wrap) wrap.hidden=otherCount===0;
        }
        const modalOther=document.getElementById("employeeModalOther");
        if(modalOther) modalOther.textContent=`${otherCount}명`;
      }catch(error){
        console.error("직원 운영현황 조회 실패:",error);
        [employeeEl,regularEl,partTimeEl,businessEl,contractEl,otherEl].forEach(el=>{
          if(el && !/^\d+명$/.test(String(el.textContent||"").trim())) el.textContent="조회 실패";
        });
      }

    }


    /* =========================================
       로그인 완료 후 직원현황 자동 조회
       - 최초 로그인 직후 조회 실패 방지
       - ERP 인증 토큰 생성 후 직원현황 조회
       - 로그인 입력 시간이 길어져도 최대 10분 대기
    ========================================= */
    function loadCompanyOperationStatusAfterAuth(){
      const CHECK_INTERVAL = 500;
      const MAX_WAIT = 10 * 60 * 1000;
      const startedAt = Date.now();

      const tryLoad = ()=>{
        const token =
          (typeof erpGetToken === "function")
            ? erpGetToken()
            : localStorage.getItem("thebigkorea_erp_session");

        if(!token) return false;

        loadCompanyOperationStatus();
        return true;
      };

      // 이미 로그인되어 있으면 즉시 조회
      if(tryLoad()) return;

      // 최초 로그인 화면이면 토큰이 만들어질 때까지 기다린 뒤 자동 조회
      const authWaitTimer = setInterval(()=>{
        if(tryLoad() || Date.now() - startedAt >= MAX_WAIT){
          clearInterval(authWaitTimer);
        }
      }, CHECK_INTERVAL);
    }


    /* =========================================
       V15 자주 쓰는 업무 실제 미처리 배지 연결
       대상: 연월차 승인대기 / 출장 승인대기 / 일용직 미지급 / 매장점검 미조치
       아르바이트 제외, 본사 업무관리와 별도
    ========================================= */

    const MANAGEMENT_ALERTS = {
      hq: [],
      masterExpiry: [],
      contractRenewal: [],
      leave: [],
      trip: [],
      daily: [],
      storeDashboard: []
    };

    // 상단 "오늘 업무 / 미처리"에 합산할 실제 시스템 미처리 건수
    // 출장(trip)은 기존 요청대로 상단 미처리 건수에서 제외합니다.
    const QUICK_PENDING_COUNTS = {
      leave: 0,
      daily: 0,
      storeDashboard: 0,
      contractRenewal: 0
    };

    function getQuickPendingTotal(){
      return Object.values(QUICK_PENDING_COUNTS)
        .reduce((sum,value)=>sum+Math.max(0,Number(value)||0),0);
    }



    const MASTER_EXPIRY_NOTICE_DAYS = 15;
    let MASTER_EXPIRY_STATUS = { soon:[], overdue:[] };

    function masterExpiryDateKey(d){
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    }

    function parseMasterExpiryDate(value){
      if(value instanceof Date && !isNaN(value)){
        return new Date(value.getFullYear(),value.getMonth(),value.getDate());
      }

      const raw=String(value||"").trim();
      if(!raw)return null;

      let m=raw.match(/(20\d{2})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/);
      if(m){
        return new Date(Number(m[1]),Number(m[2])-1,Number(m[3]));
      }

      // 백화점 계약기간 예: 25.11.01 ~ 26.10.31 → 마지막 날짜 사용
      const matches=[...raw.matchAll(/(\d{2})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/g)];
      if(matches.length){
        const last=matches[matches.length-1];
        return new Date(2000+Number(last[1]),Number(last[2])-1,Number(last[3]));
      }

      return null;
    }

    function isClosedMasterRow(row){
      return row.some(v=>/폐업|폐점/.test(String(v||"")));
    }

    function openMasterExpirySource(category){
      openView("operations");
      masterState.category=category||"전체";
      masterState.query="";
      if(typeof renderMasterData==="function")renderMasterData();
      if(typeof buildOperationsView==="function")buildOperationsView();
    }

    function loadMasterExpiryAlerts(){
      const today=new Date();
      today.setHours(0,0,0,0);

      const items=[];

      // 1. 백화점 계약: "계약 기간"의 마지막 날짜
      const contractRows=MASTER_DATA["백화점계약"]||[];
      if(contractRows.length>1){
        const header=contractRows[0].map(v=>String(v||"").trim());
        const storeIdx=header.indexOf("매장명");
        const partnerIdx=header.indexOf("협력사");
        const typeIdx=header.indexOf("계약형태");
        const periodIdx=header.indexOf("계약 기간");

        contractRows.slice(1).forEach(row=>{
          if(isClosedMasterRow(row))return;
          const end=parseMasterExpiryDate(row[periodIdx]);
          if(!end||isNaN(end))return;
          end.setHours(0,0,0,0);

          const days=Math.round((end-today)/86400000);
          items.push({
            kind:"백화점 계약",
            store:String(row[storeIdx]||"점포명 미등록").trim(),
            sub:[row[partnerIdx],row[typeIdx]].filter(Boolean).join(" · "),
            endDate:masterExpiryDateKey(end),
            days,
            category:"백화점계약"
          });
        });
      }

      // 2. 보험: 실제 "명칭 / 사업자번호 / 보험종류 / 보험만기..." 헤더 이후 데이터
      const insuranceRows=MASTER_DATA["보험"]||[];
      let insuranceHeader=-1;
      for(let i=0;i<insuranceRows.length;i++){
        const row=insuranceRows[i].map(v=>String(v||"").trim());
        if(row.includes("명칭") && row.includes("보험종류") && row.includes("보험만기")){
          insuranceHeader=i;
          break;
        }
      }

      if(insuranceHeader>=0){
        const header=insuranceRows[insuranceHeader].map(v=>String(v||"").trim());
        const storeIdx=header.indexOf("명칭");
        const typeIdx=header.indexOf("보험종류");
        const endIdx=header.indexOf("보험만기");
        const companyIdx=header.indexOf("보험사");
        const noteIdx=header.indexOf("특이사항");

        insuranceRows.slice(insuranceHeader+1).forEach(row=>{
          if(isClosedMasterRow(row) || /폐업|폐점/.test(String(row[noteIdx]||"")))return;
          const end=parseMasterExpiryDate(row[endIdx]);
          if(!end||isNaN(end))return;
          end.setHours(0,0,0,0);

          const days=Math.round((end-today)/86400000);
          items.push({
            kind:"매장 보험",
            store:String(row[storeIdx]||"점포명 미등록").trim(),
            sub:[row[typeIdx],row[companyIdx]].filter(Boolean).join(" · "),
            endDate:masterExpiryDateKey(end),
            days,
            category:"보험"
          });
        });
      }

      MASTER_EXPIRY_STATUS.soon=items
        .filter(x=>x.days>=0 && x.days<=MASTER_EXPIRY_NOTICE_DAYS)
        .sort((a,b)=>a.days-b.days||a.store.localeCompare(b.store,"ko"));

      MASTER_EXPIRY_STATUS.overdue=items
        .filter(x=>x.days<0)
        .sort((a,b)=>b.days-a.days||a.store.localeCompare(b.store,"ko"));

      const alerts=[
        ...MASTER_EXPIRY_STATUS.overdue.map(item=>({
          color:"red",
          title:`기한 경과 · ${item.kind} · ${item.store}`,
          detail:`${item.sub?item.sub+" · ":""}만기 ${item.endDate} · D+${Math.abs(item.days)}`,
          action:`openMasterExpirySource('${item.category}')`
        })),
        ...MASTER_EXPIRY_STATUS.soon.map(item=>({
          color:item.days<=3?"red":"amber",
          title:`기한 임박 · ${item.kind} · ${item.store}`,
          detail:`${item.sub?item.sub+" · ":""}만기 ${item.endDate} · ${item.days===0?"D-DAY":"D-"+item.days}`,
          action:`openMasterExpirySource('${item.category}')`
        }))
      ];

      setManagementSourceAlerts("masterExpiry",alerts);
      updateHomeHqTaskSummary();
    }

    function renderManagementAlerts(){
      const list=document.getElementById("managementAlertList");
      if(!list)return;

      // 실제 처리해야 할 업무는 관리알림에서 누락하지 않고 모두 표시
      // 일용직 미지급, 연월차 승인대기, 매장점검 미조치, 재계약 대상,
      // 출장 승인대기, 본사 일정 미처리/기한임박 순으로 표시
      const order=["daily","leave","storeDashboard","masterExpiry","contractRenewal","trip","hq"];
      const items=order.flatMap(key=>MANAGEMENT_ALERTS[key]||[]);

      if(!items.length){
        list.innerHTML='<div class="alert-empty">현재 확인이 필요한 상세 업무가 없습니다.</div>';
        return;
      }

      list.innerHTML=items.map(item=>{
        const action=String(item.action||"").replace(/'/g,"\\'");
        return `<button class="alert-item" type="button" onclick="${action}">
          <span class="dot ${item.color||"amber"}"></span>
          <div><strong>${escapeHtml(item.title||"확인 필요")}</strong><small>${escapeHtml(item.detail||"")}</small></div>
          <b>확인</b>
        </button>`;
      }).join("");
    }

    function setManagementSourceAlerts(key, items){
      MANAGEMENT_ALERTS[key]=Array.isArray(items)?items:[];
      renderManagementAlerts();
    }

    const QUICK_PENDING_SOURCES = {
      leave: {
        label: "연월차 승인대기",
        url: "https://script.google.com/macros/s/AKfycbx7Y5zaVU7kYTdFwdwhUgoKwqOGx55-8a0McZOmA42PpbU4WWJqYTFPeSH2oD4mOzd7/exec?action=workflowCounts",
        read: data => Number(data.pending || 0)
      },
      trip: {
        label: "출장 승인대기",
        url: "https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec?action=getTrips",
        read: data => (data.trips || []).filter(t => String(t.status || "").trim() === "승인대기").length
      },
      daily: {
        label: "일용직 미지급",
        url: "https://script.google.com/macros/s/AKfycbz_NFlMRhx_mP_0maccpd62iWNHGMVo-pAZCHg7s8-tM26QvKlIVrPL6TmElRgM6XIS/exec?action=getDailyUnpaidCount",
        read: data => Number(data.count || 0)
      },
      storeDashboard: {
        label: "매장점검 미조치",
        url: "https://script.google.com/macros/s/AKfycby1RoQvXt51KjoasIG-_MmD7SiMau10eRWAYiq4Vk1k2s9yRVsuEBrBVEFvmW7aX765/exec?action=getDashboard",
        read: data => Array.isArray(data.logs)
          ? data.logs.filter(log => !["확인완료", "조치완료"].includes(String(log.status || "미확인").trim())).length
          : Number(data.pendingCount || 0)
      }
    };

    function setQuickPendingBadge(key, count, label=""){
      const badge=document.querySelector(`.quick-pending-badge[data-badge="${key}"]`);
      if(!badge)return;
      if(count===null || count===undefined || !Number.isFinite(Number(count))){
        badge.hidden=true;
        return;
      }
      const n=Math.max(0,Number(count));
      badge.textContent=n>99?"99+":String(n);
      badge.hidden=n<1;
      const card=badge.closest(".quick-card");
      if(card) card.title=n>0?`${label} ${n}건`:"";
    }


    function parseContractRenewalDate(value){
      if(!value)return null;
      if(value instanceof Date && !isNaN(value))return new Date(value.getFullYear(),value.getMonth(),value.getDate());

      const raw=String(value).trim();
      if(!raw)return null;

      const m=raw.match(/(20\d{2})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/);
      if(!m)return null;

      const d=new Date(Number(m[1]),Number(m[2])-1,Number(m[3]));
      return isNaN(d)?null:d;
    }

    function contractRenewalText(value){
      return String(value||"").replace(/\s+/g,"").trim().toLowerCase();
    }

    function contractRenewalName(c){
      return c.employeeName||c.empName||c.name||"직원명 미등록";
    }

    function contractRenewalStore(c){
      return c.store||c.workplace||c.workPlace||c.department||"소속 미등록";
    }

    function contractRenewalEndValue(c){
      return c.endDate||c.contractEndDate||c.periodEnd||"";
    }

    function contractRenewalType(c){
      return c.contractType||c.type||"근로계약";
    }

    function contractRenewalLink(c,source){
      if(c.workerLink)return c.workerLink;
      if(c.contractUrl)return c.contractUrl;
      if(c.url)return c.url;

      const id=c.contractId||c.contractNo||"";
      if(!id)return source==="REG"
        ? "https://thebigkorea.github.io/hr-system/part-contract.html"
        : HQ_BASE+"contract-admin.html";

      if(source==="REG"){
        const type=contractRenewalType(c);
        let page="regular-contract.html";
        if(type.includes("계약직")||type.includes("아르바이트"))page="part-contract.html";
        if(type.includes("용역")||type.includes("사업소득"))page="service-contract.html";
        return "https://thebigkorea.github.io/hr-system/"+page+"?id="+encodeURIComponent(id);
      }
      return HQ_BASE+"contract-view.html?id="+encodeURIComponent(id);
    }

    function contractRenewalDateKey(d){
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    }

    async function loadContractRenewalTargets(){
      try{
        const [legacyResponse,newResponse]=await Promise.all([
          fetch(LEGACY_CONTRACT_RENEWAL_API_URL,{
            method:"POST",
            body:JSON.stringify({action:"getContractList"})
          }),
          fetch(CONTRACT_RENEWAL_API_URL,{
            method:"POST",
            body:JSON.stringify({action:"getContractList"})
          })
        ]);

        if(!legacyResponse.ok)throw new Error("기존 REG 계약 API HTTP "+legacyResponse.status);
        if(!newResponse.ok)throw new Error("신규 통합계약 API HTTP "+newResponse.status);

        const legacyData=await legacyResponse.json();
        const newData=await newResponse.json();

        const legacyContracts=Array.isArray(legacyData.contracts)
          ? legacyData.contracts
          : (Array.isArray(legacyData.rows)?legacyData.rows:[]);

        const newContracts=Array.isArray(newData.contracts)
          ? newData.contracts
          : (Array.isArray(newData.rows)?newData.rows:[]);

        const today=new Date();
        today.setHours(0,0,0,0);

        const candidates=[
          ...legacyContracts.map(contract=>({contract,source:"REG"})),
          ...newContracts.map(contract=>({contract,source:"NEW"}))
        ];

        const unique=new Map();

        candidates.forEach(({contract,source})=>{
          const end=parseContractRenewalDate(contractRenewalEndValue(contract));
          if(!end)return;

          end.setHours(0,0,0,0);
          const days=Math.ceil((end-today)/86400000);
          if(days<0||days>30)return;

          const name=contractRenewalName(contract);
          const store=contractRenewalStore(contract);
          const endDate=contractRenewalDateKey(end);
          const id=contract.contractId||contract.contractNo||"";

          const key=name!=="직원명 미등록"
            ? `${contractRenewalText(name)}|${contractRenewalText(store)}|${endDate}`
            : `${source}|${id}|${endDate}`;

          if(!unique.has(key)){
            unique.set(key,{
              name,
              store,
              contractType:contractRenewalType(contract),
              endDate,
              days,
              source,
              sourceLabel:source==="REG"?"기존 REG 계약":"신규 통합계약",
              link:contractRenewalLink(contract,source)
            });
          }
        });

        CONTRACT_RENEWAL_ITEMS=[...unique.values()].sort((a,b)=>a.days-b.days||a.name.localeCompare(b.name,"ko"));

        QUICK_PENDING_COUNTS.contractRenewal=CONTRACT_RENEWAL_ITEMS.length;

        const alerts=CONTRACT_RENEWAL_ITEMS.map(item=>({
          color:item.days<=7?"red":"amber",
          title:"재계약 대상 · "+item.name,
          detail:`${item.store} · ${item.contractType} · ${item.endDate} 종료 · ${item.days===0?"D-DAY":"D-"+item.days} · ${item.sourceLabel}`,
          action:item.link
            ? `window.open('${String(item.link).replace(/'/g,"\\'")}','_blank','noopener,noreferrer')`
            : "openView('contract')"
        }));

        setManagementSourceAlerts("contractRenewal",alerts);
        updateHomeHqTaskSummary();
      }catch(error){
        CONTRACT_RENEWAL_ITEMS=[];
        QUICK_PENDING_COUNTS.contractRenewal=0;
        setManagementSourceAlerts("contractRenewal",[]);
        updateHomeHqTaskSummary();
        console.warn("재계약 대상 조회 실패",error);
      }
    }

    async function loadQuickPendingBadges(){
      await Promise.all(Object.entries(QUICK_PENDING_SOURCES).map(async([key,source])=>{
        try{
          const sep=source.url.includes("?")?"&":"?";
          const res=await fetch(source.url+sep+"_="+Date.now(),{cache:"no-store"});
          if(!res.ok) throw new Error("HTTP "+res.status);
          const data=await res.json();
          if(data?.success===false || data?.ok===false) throw new Error(data.message||"조회 실패");

          const count=Math.max(0,Number(source.read(data))||0);
          setQuickPendingBadge(key,count,source.label);

          // 실제 시스템 미처리를 상단 오늘 업무/미처리에 즉시 반영
          // trip은 의도적으로 제외
          if(Object.prototype.hasOwnProperty.call(QUICK_PENDING_COUNTS,key)){
            QUICK_PENDING_COUNTS[key]=count;
            updateHomeHqTaskSummary();
          }

          let details=[];
          if(key==="trip"){
            details=(data.trips||[])
              .filter(t=>String(t.status||"").trim()==="승인대기")
              .slice(0,4)
              .map(t=>({
                color:"amber",
                title:"출장 승인대기 · "+String(t.name||t.employeeName||t.applicant||"직원"),
                detail:[t.destination||t.place,t.purpose||t.reason,t.tripStartDate||t.startDate].filter(Boolean).join(" · ") || "출장 승인 내용을 확인하세요.",
                action:"handleQuickSystem('trip')"
              }));
          }else if(key==="storeDashboard"){
            const pending=Array.isArray(data.logs)
              ? data.logs.filter(log=>!["확인완료","조치완료"].includes(String(log.status||"미확인").trim()))
              : [];
            details=pending.slice(0,4).map(log=>({
              color:"red",
              title:"매장점검 미조치 · "+String(log.storeName||log.store||log.branch||"점포"),
              detail:[log.title||log.item||log.category,log.status||"미조치"].filter(Boolean).join(" · "),
              action:"handleQuickSystem('storeDashboard')"
            }));
          }else if(key==="leave" && count>0){
            details=[{
              color:"amber",
              title:"연월차 승인대기 "+count+"건",
              detail:"관리자 승인이 필요한 연월차 신청내역을 확인하세요.",
              action:"handleQuickSystem('leave')"
            }];
          }else if(key==="daily" && count>0){
            details=[{
              color:"red",
              title:"일용직 관리 미처리 "+count+"건",
              detail:"일용직 관리에서 미처리된 지급·신고 대상 내역을 확인하세요.",
              action:"handleQuickSystem('daily')"
            }];
          }
          setManagementSourceAlerts(key,details);
        }catch(error){
          setQuickPendingBadge(key,null,source.label);
          if(Object.prototype.hasOwnProperty.call(QUICK_PENDING_COUNTS,key)){
            QUICK_PENDING_COUNTS[key]=0;
            updateHomeHqTaskSummary();
          }
          setManagementSourceAlerts(key,[]);
          console.warn(source.label+" 배지 조회 실패",error);
        }
      }));
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
      loadQuickPendingBadges();
      loadContractRenewalTargets();
      loadMasterExpiryAlerts();
      loadCompanyOperationStatusAfterAuth();
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
      const m=d.getMonth()+1, day=d.getDate(), weekday=d.getDay();
      if(task.rule==="DAILY") return true;
      if(task.rule==="WEEKLY") return weekday===Number(task.weekday);
      if(task.rule==="MONTHLY") return day===Number(task.day);
      if(task.rule==="QUARTERLY") return [1,4,7,10].includes(m) && day===Number(task.day);
      if(task.rule==="MONTHS") return (task.months||[]).includes(m) && day===Number(task.day||25);
      if(task.rule==="YEARLY") return m===Number(task.month) && day===Number(task.day);
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
    function updateHqRepeatFields(){
      const type=document.getElementById("hqTaskRepeat")?.value||"DATE";
      const box=document.getElementById("hqRepeatDetail");
      if(!box)return;
      const days=Array.from({length:31},(_,i)=>`<option value="${i+1}">${i+1}일</option>`).join("");
      const weekdays=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]
        .map((x,i)=>`<option value="${i}">${x}</option>`).join("");

      if(type==="DATE"){
        box.innerHTML=`<label>처리일<input type="date" id="hqTaskDate"></label>`;
      }else if(type==="DAILY"){
        box.innerHTML=`<label>반복일<input value="매일" disabled></label>`;
      }else if(type==="WEEKLY"){
        box.innerHTML=`<label>요일<select id="hqTaskWeekday">${weekdays}</select></label>`;
      }else if(type==="MONTHLY"){
        box.innerHTML=`<label>처리일<select id="hqTaskDay">${days}</select></label>`;
      }else if(type==="QUARTERLY"){
        box.innerHTML=`<label>처리일<select id="hqTaskDay">${days}</select><small>1·4·7·10월에 자동 반복</small></label>`;
      }else if(type==="YEARLY"){
        box.innerHTML=`<div class="hq-form-row">
          <label>월<select id="hqTaskMonth">${Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1}월</option>`).join("")}</select></label>
          <label>일<select id="hqTaskDay">${days}</select></label>
        </div>`;
      }
    }
    function addHqTask(){
      const title=document.getElementById("hqTaskTitle")?.value.trim();
      const repeat=document.getElementById("hqTaskRepeat")?.value||"DATE";
      const category=document.getElementById("hqTaskCategory")?.value||"기타";
      const owner=document.getElementById("hqTaskOwner")?.value.trim()||"본사";
      if(!title){alert("업무명을 입력해 주세요.");return;}

      const task={id:"custom-"+Date.now(),title,category,owner,memo:""};
      const weekdays=["일","월","화","수","목","금","토"];

      if(repeat==="DATE"){
        const date=document.getElementById("hqTaskDate")?.value;
        if(!date){alert("처리일을 선택해 주세요.");return;}
        Object.assign(task,{cycle:"1회성 · "+date,rule:"DATE",date});
      }else if(repeat==="DAILY"){
        Object.assign(task,{cycle:"매일",rule:"DAILY"});
      }else if(repeat==="WEEKLY"){
        const weekday=Number(document.getElementById("hqTaskWeekday")?.value||1);
        Object.assign(task,{cycle:`매주 ${weekdays[weekday]}요일`,rule:"WEEKLY",weekday});
      }else if(repeat==="MONTHLY"){
        const day=Number(document.getElementById("hqTaskDay")?.value||1);
        Object.assign(task,{cycle:`매월 ${day}일`,rule:"MONTHLY",day});
      }else if(repeat==="QUARTERLY"){
        const day=Number(document.getElementById("hqTaskDay")?.value||1);
        Object.assign(task,{cycle:`분기별 ${day}일`,rule:"QUARTERLY",day});
      }else if(repeat==="YEARLY"){
        const month=Number(document.getElementById("hqTaskMonth")?.value||1);
        const day=Number(document.getElementById("hqTaskDay")?.value||1);
        Object.assign(task,{cycle:`매년 ${month}월 ${day}일`,rule:"YEARLY",month,day});
      }

      const state=loadHqTaskState();
      state.custom=state.custom||[];
      state.custom.push(task);
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
        <style>
          .hq-example-open-btn{width:100%;margin-top:14px;border:1px solid #d5e1ef;background:#f7fbff;color:#17355c;border-radius:10px;padding:11px 14px;font-weight:800;cursor:pointer}
          .hq-example-open-btn:hover{background:#eef6ff;border-color:#9fc3ec}
          .hq-example-modal{display:none;position:fixed;inset:0;z-index:9999;align-items:center;justify-content:center;padding:24px}
          .hq-example-modal.open{display:flex}
          .hq-example-backdrop{position:absolute;inset:0;background:rgba(12,25,43,.58);backdrop-filter:blur(3px)}
          .hq-example-dialog{position:relative;z-index:1;width:min(980px,94vw);max-height:86vh;background:#fff;border-radius:18px;box-shadow:0 28px 80px rgba(0,0,0,.28);overflow:hidden;display:flex;flex-direction:column}
          .hq-example-dialog-head{display:flex;justify-content:space-between;gap:20px;padding:22px 24px 16px;border-bottom:1px solid #e7edf4}
          .hq-example-dialog-head h3{margin:3px 0 5px;font-size:20px;color:#132c4c}
          .hq-example-dialog-head p{margin:0;color:#718096;font-size:11px}
          .hq-example-close{width:38px;height:38px;border:0;border-radius:10px;background:#f1f5f9;color:#334155;font-size:25px;line-height:1;cursor:pointer}
          .hq-example-tabs{display:flex;gap:7px;overflow-x:auto;padding:13px 20px;border-bottom:1px solid #edf1f5;background:#fbfcfe}
          .hq-example-tab{white-space:nowrap;border:1px solid #dce5ef;background:#fff;color:#53657a;border-radius:999px;padding:7px 12px;font-size:10px;font-weight:800;cursor:pointer}
          .hq-example-tab.active{background:#17355c;border-color:#17355c;color:#fff}
          .hq-example-modal-list{overflow:auto;padding:18px 20px 24px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}
          .hq-example-item{border:1px solid #e1e8f0;background:#fff;border-radius:12px;padding:12px 13px;text-align:left;cursor:pointer}
          .hq-example-item:hover{border-color:#82b4ed;background:#f6faff}
          .hq-example-item-top{display:flex;align-items:center;gap:7px;margin-bottom:5px}
          .hq-example-cycle{font-size:9px;font-weight:900;color:#0d65c2;background:#eaf4ff;border-radius:999px;padding:3px 7px}
          .hq-example-category{font-size:9px;color:#8a6a34}
          .hq-example-item b{display:block;color:#17355c;font-size:12px}
          .hq-example-item small{display:block;margin-top:4px;color:#718096;font-size:9px;line-height:1.45}
          #hqRepeatDetail>label,#hqRepeatDetail .hq-form-row{margin:0}
          #hqRepeatDetail small{display:block;margin-top:4px;color:#8a6a34;font-size:9px}
          @media(max-width:700px){
            .hq-example-modal{padding:10px}
            .hq-example-dialog{width:100%;max-height:92vh}
            .hq-example-modal-list{grid-template-columns:1fr;padding:12px}
            .hq-example-dialog-head{padding:17px 16px 13px}
          }
        </style>
        <section class="module-hero hq-task-hero">
          <div><span class="eyebrow">HEAD OFFICE WORK CALENDAR</span><h2>본사 업무일정 관리</h2>
          <p>매일·매주·매월·분기·매년 반복업무와 1회성 업무를 한 원장에 관리합니다.</p></div>
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
            <div class="panel-head"><div><h3>업무 추가</h3><p>반복주기를 선택하면 해당 일정에 자동으로 오늘 업무에 나타납니다.</p></div></div>
            <div class="hq-task-form">
              <label>업무명<input id="hqTaskTitle" placeholder="예: 카드매출 정산 확인"></label>
              <div class="hq-form-row">
                <label>반복주기
                  <select id="hqTaskRepeat" onchange="updateHqRepeatFields()">
                    <option value="DATE">1회성</option>
                    <option value="DAILY">매일</option>
                    <option value="WEEKLY">매주</option>
                    <option value="MONTHLY">매월</option>
                    <option value="QUARTERLY">분기</option>
                    <option value="YEARLY">매년</option>
                  </select>
                </label>
                <div id="hqRepeatDetail"></div>
              </div>
              <div class="hq-form-row">
                <label>구분<select id="hqTaskCategory"><option>정산</option><option>인사·급여</option><option>세무</option><option>점포</option><option>계약</option><option>회계</option><option>총무</option><option>기타</option></select></label>
                <label>담당<input id="hqTaskOwner" placeholder="본사 / 담당자명"></label>
              </div>
              <button class="hq-add-btn" onclick="addHqTask()">업무 등록</button>

              <button class="hq-example-open-btn" type="button" onclick="openHqTaskExamples()">💡 회사 반복업무 예시 보기</button>
            </div>
          </section>
        </div>
        <section class="panel hq-ledger-panel">
          <div class="panel-head"><div><h3>본사 업무 원장</h3><p>반복업무와 직접 등록한 업무를 함께 관리합니다.</p></div></div>
          <div class="hq-ledger-wrap"><table class="hq-ledger"><thead><tr><th>업무명</th><th>구분</th><th>주기</th><th>담당</th><th>다음 예정일</th><th>비고</th><th>관리</th></tr></thead><tbody id="hqLedgerBody"></tbody></table></div>
        </section>
        <div class="hq-example-modal" id="hqExampleModal" aria-hidden="true">
          <div class="hq-example-backdrop" onclick="closeHqTaskExamples()"></div>
          <section class="hq-example-dialog" role="dialog" aria-modal="true" aria-labelledby="hqExampleTitle">
            <div class="hq-example-dialog-head">
              <div><span class="eyebrow">REFERENCE LIBRARY</span><h3 id="hqExampleTitle">회사 반복업무 예시</h3><p>분야별 예시를 참고하고, 사용할 업무를 누르면 등록란에 자동 입력됩니다.</p></div>
              <button type="button" class="hq-example-close" onclick="closeHqTaskExamples()" aria-label="닫기">×</button>
            </div>
            <div class="hq-example-tabs" id="hqExampleTabs"></div>
            <div class="hq-example-modal-list" id="hqExampleList"></div>
          </section>
        </div>`;
      updateHqRepeatFields();
    }
    const HQ_TASK_EXAMPLES=[
      {group:"매출·정산",title:"일일 매출·입금 확인",repeat:"DAILY",category:"정산",desc:"전일 매출, 카드·현금 입금, 미입금 내역 확인"},
      {group:"매출·정산",title:"영업점 매출 입력 확인",repeat:"DAILY",category:"점포",desc:"점포별 일일 매출 입력 및 누락 여부 확인"},
      {group:"매출·정산",title:"주간 영업실적 보고",repeat:"WEEKLY",category:"점포",desc:"매출·원가·주요 이슈 및 다음 주 계획 취합"},
      {group:"매출·정산",title:"거래처 및 도심점 정산",repeat:"MONTHLY",category:"정산",desc:"수수료, 거래처 대금, 정산 차이 확인"},
      {group:"매출·정산",title:"카드사 매출대금 대사",repeat:"MONTHLY",category:"정산",desc:"카드 매출과 실제 입금액 및 수수료 대사"},

      {group:"회계·자금",title:"법인계좌 입출금 확인",repeat:"DAILY",category:"회계",desc:"법인계좌 주요 입출금 및 이상거래 확인"},
      {group:"회계·자금",title:"지출결의 및 증빙 점검",repeat:"WEEKLY",category:"회계",desc:"영수증·세금계산서·지출결의 누락 확인"},
      {group:"회계·자금",title:"미수금·미지급금 점검",repeat:"WEEKLY",category:"회계",desc:"회수 예정금액과 지급 예정금액 확인"},
      {group:"회계·자금",title:"월말 자금계획 작성",repeat:"MONTHLY",category:"회계",desc:"다음 달 급여·거래처·세금 등 주요 자금소요 정리"},
      {group:"회계·자금",title:"월 회계마감 자료 확인",repeat:"MONTHLY",category:"회계",desc:"매출·매입·경비·계좌 자료의 월 마감 상태 확인"},

      {group:"세무",title:"세금계산서 발행·수취 확인",repeat:"WEEKLY",category:"세무",desc:"매출·매입 세금계산서 발행 및 누락 여부 확인"},
      {group:"세무",title:"원천세 신고·납부 확인",repeat:"MONTHLY",category:"세무",desc:"근로·사업·일용소득 원천세 신고 및 납부 확인"},
      {group:"세무",title:"부가가치세 신고 준비",repeat:"QUARTERLY",category:"세무",desc:"매출·매입자료, 증빙 누락 및 신고자료 점검"},
      {group:"세무",title:"법인세 결산자료 준비",repeat:"YEARLY",category:"세무",desc:"결산 및 법인세 신고에 필요한 자료 정리"},
      {group:"세무",title:"지급명세서 제출 확인",repeat:"YEARLY",category:"세무",desc:"근로·사업·기타소득 지급명세서 제출 일정 확인"},

      {group:"인사·급여",title:"출퇴근 이상내역 확인",repeat:"DAILY",category:"인사·급여",desc:"미출근·지각·퇴근 누락 등 근태 이상사항 확인"},
      {group:"인사·급여",title:"연월차·미휴무 승인 확인",repeat:"DAILY",category:"인사·급여",desc:"승인대기 신청과 잔여일수 이상 여부 확인"},
      {group:"인사·급여",title:"입퇴사 및 인사변동 점검",repeat:"WEEKLY",category:"인사·급여",desc:"신규입사·퇴사·휴직·직책 변경사항 확인"},
      {group:"인사·급여",title:"급여 지급 및 급여대장 확인",repeat:"MONTHLY",category:"인사·급여",desc:"급여 확정, 지급, 공제 및 급여대장 확인"},
      {group:"인사·급여",title:"4대보험 취득·상실 점검",repeat:"MONTHLY",category:"인사·급여",desc:"입퇴사자 4대보험 신고 및 처리상태 확인"},
      {group:"인사·급여",title:"4대보험료 납부 확인",repeat:"MONTHLY",category:"인사·급여",desc:"국민연금·건강·고용·산재보험 납부 확인"},
      {group:"인사·급여",title:"근로계약 및 인사정보 점검",repeat:"MONTHLY",category:"인사·급여",desc:"계약서, 보건증, 직원정보 변경 및 누락 확인"},
      {group:"인사·급여",title:"퇴직금 지급대상 점검",repeat:"MONTHLY",category:"인사·급여",desc:"퇴직자 정산 및 퇴직급여 지급대상 확인"},

      {group:"점포운영",title:"점포 주요 운영이슈 확인",repeat:"DAILY",category:"점포",desc:"시설·고객·인력·영업 관련 긴급 이슈 확인"},
      {group:"점포운영",title:"매장점검 미처리 업무 확인",repeat:"DAILY",category:"점포",desc:"본사 점검 후 미조치·보완요청 건 확인"},
      {group:"점포운영",title:"점포 주간보고 취합",repeat:"WEEKLY",category:"점포",desc:"매출·인력·시설·민원·행사 이슈 취합"},
      {group:"점포운영",title:"위생·안전 점검 확인",repeat:"WEEKLY",category:"점포",desc:"위생관리, 안전사고 위험 및 개선사항 확인"},
      {group:"점포운영",title:"점포별 손익 및 원가율 점검",repeat:"MONTHLY",category:"점포",desc:"매출·식재료비·인건비·수수료·손익 확인"},

      {group:"계약·총무",title:"계약 만료 예정건 확인",repeat:"MONTHLY",category:"계약",desc:"임대차·용역·유지보수·상표 등 만료 예정 계약 확인"},
      {group:"계약·총무",title:"보험 만료 및 갱신 확인",repeat:"MONTHLY",category:"계약",desc:"영업배상·화재·자동차 등 보험 만료일 점검"},
      {group:"계약·총무",title:"법인차량 운행·정비 점검",repeat:"MONTHLY",category:"총무",desc:"운행기록, 보험, 정비 및 소모품 교체 일정 확인"},
      {group:"계약·총무",title:"비품·소모품 재고 점검",repeat:"MONTHLY",category:"총무",desc:"본사 및 점포 공용 비품과 소모품 부족 여부 확인"},
      {group:"계약·총무",title:"각종 인허가 갱신 확인",repeat:"YEARLY",category:"총무",desc:"영업신고·교육·검사 등 갱신 및 유효기간 확인"},

      {group:"경영관리",title:"주간 경영현황 점검",repeat:"WEEKLY",category:"기타",desc:"매출·자금·인사·점포 핵심 현황과 주요 이슈 확인"},
      {group:"경영관리",title:"월간 경영실적 분석",repeat:"MONTHLY",category:"기타",desc:"전월·전년 대비 매출, 원가, 인건비, 손익 분석"},
      {group:"경영관리",title:"예산 대비 실적 점검",repeat:"MONTHLY",category:"기타",desc:"매출·비용·투자비의 예산 대비 실적 확인"},
      {group:"경영관리",title:"분기 경영계획 점검",repeat:"QUARTERLY",category:"기타",desc:"분기 목표·실적·신규점포·투자계획 점검"},
      {group:"경영관리",title:"연간 사업계획 수립",repeat:"YEARLY",category:"기타",desc:"차년도 매출목표·예산·인력·출점계획 수립"}
    ];

    let hqExampleGroup="전체";

    function hqExampleCycleLabel(rule){
      return ({DAILY:"매일",WEEKLY:"매주",MONTHLY:"매월",QUARTERLY:"분기",YEARLY:"매년",DATE:"1회성"})[rule]||rule;
    }
    function openHqTaskExamples(){
      const modal=document.getElementById("hqExampleModal");
      if(!modal)return;
      hqExampleGroup="전체";
      renderHqTaskExampleModal();
      modal.classList.add("open");
      modal.setAttribute("aria-hidden","false");
      document.body.style.overflow="hidden";
    }
    function closeHqTaskExamples(){
      const modal=document.getElementById("hqExampleModal");
      if(!modal)return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden","true");
      document.body.style.overflow="";
    }
    function renderHqTaskExampleModal(){
      const tabs=document.getElementById("hqExampleTabs");
      const list=document.getElementById("hqExampleList");
      if(!tabs||!list)return;
      const groups=["전체",...new Set(HQ_TASK_EXAMPLES.map(x=>x.group))];
      tabs.innerHTML=groups.map(g=>`<button type="button" class="hq-example-tab ${g===hqExampleGroup?"active":""}" onclick="setHqExampleGroup('${g}')">${g}</button>`).join("");
      const rows=hqExampleGroup==="전체"?HQ_TASK_EXAMPLES:HQ_TASK_EXAMPLES.filter(x=>x.group===hqExampleGroup);
      list.innerHTML=rows.map((x,i)=>{
        const realIndex=HQ_TASK_EXAMPLES.indexOf(x);
        return `<button type="button" class="hq-example-item" onclick="selectHqTaskExample(${realIndex})">
          <span class="hq-example-item-top"><span class="hq-example-cycle">${hqExampleCycleLabel(x.repeat)}</span><span class="hq-example-category">${escapeHtml(x.group)} · ${escapeHtml(x.category)}</span></span>
          <b>${escapeHtml(x.title)}</b><small>${escapeHtml(x.desc)}</small>
        </button>`;
      }).join("");
    }
    function setHqExampleGroup(group){
      hqExampleGroup=group;
      renderHqTaskExampleModal();
    }
    function selectHqTaskExample(index){
      const x=HQ_TASK_EXAMPLES[index];
      if(!x)return;
      fillHqTaskExample(x.title,x.repeat,x.category);
      closeHqTaskExamples();
    }
    function fillHqTaskExample(title,repeat,category){
      const titleEl=document.getElementById("hqTaskTitle");
      const repeatEl=document.getElementById("hqTaskRepeat");
      const categoryEl=document.getElementById("hqTaskCategory");
      if(titleEl)titleEl.value=title;
      if(repeatEl)repeatEl.value=repeat;
      if(categoryEl)categoryEl.value=category;
      updateHqRepeatFields();
      titleEl?.focus();
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
      // 본사 일정 업무 + 실제 시스템 미처리 업무를 함께 표시
      // 연월차 승인대기 / 일용직 미처리 / 매장점검 미조치 / 30일 이내 재계약 대상을 합산
      // 출장 승인·정산은 상단 미처리 건수에서 제외
      const quickPendingTotal=getQuickPendingTotal();
      setText("homeTaskToday",(dueToday.length+quickPendingTotal)+"건");
      setText("homeTaskDone",doneToday.length+"건");
      setText("homeTaskPending",(pendingToday.length+quickPendingTotal)+"건");
      // 본사업무는 기존 7일 기준 유지.
      // 보험·백화점 계약은 업무 피로도를 줄이기 위해 만기 15일 전부터만 "기한 임박"에 표시.
      setText("homeTaskSoon",(soon.length+MASTER_EXPIRY_STATUS.soon.length)+"건");
      setText("homeTaskOverdue",(overdue.length+MASTER_EXPIRY_STATUS.overdue.length)+"건");
      setText("homeTaskMonth",monthTasks.length+"건");

      const hqAlerts=[];
      overdue.slice(0,4).forEach(t=>{
        hqAlerts.push({
          color:"red",
          title:"기한 경과 · "+String(t.title||"본사 업무"),
          detail:t.date ? "마감 "+String(t.date)+" · 미처리" : "기한이 지난 미처리 업무입니다.",
          action:"openView('hqtasks')"
        });
      });
      pendingToday.slice(0,4).forEach(t=>{
        hqAlerts.push({
          color:"amber",
          title:"오늘 본사 업무 · "+String(t.title||"업무"),
          detail:"오늘 처리 예정 · 미완료",
          action:"openView('hqtasks')"
        });
      });
      soon.slice(0,3).forEach(t=>{
        if(hqAlerts.some(x=>x.title.includes(String(t.title||""))))return;
        const next=hqTaskNextDate(t,today);
        hqAlerts.push({
          color:"blue",
          title:"기한 임박 · "+String(t.title||"본사 업무"),
          detail:next ? "예정 "+hqTaskDateKey(next) : "7일 이내 처리 예정",
          action:"openView('hqtasks')"
        });
      });
      setManagementSourceAlerts("hq",hqAlerts);
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
          <div class="legacy-count"><strong>4</strong><span>점포 연결</span></div>
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


    /* ===== 2025 유통점 매출 순위 조회 ===== */
    const DEPARTMENT_SALES_RANKING_2025 = [
    [1,"나래 강남점",36717,"10.4%"],[2,"가람 잠실점",33010,"8.0%"],[3,"나래 센텀시티점",22642,"7.4%"],[4,"가람 본점",21863,"6.1%"],[5,"누리 판교점",20291,"17.2%"],[6,"나래 대구점",16629,"5.6%"],[7,"누리 서울",12864,"7.3%"],[8,"누리 본점",12767,"6.2%"],[9,"누리 무역센터점",12731,"0.5%"],[10,"나래 본점",12525,"3.2%"],[11,"가람 부산본점",12326,"4.0%"],[12,"다온 명품관",11513,"5.4%"],[13,"나래 아트&사이언스(대전)",10410,"7.2%"],[14,"가람 인천점",8298,"5.1%"],[15,"나래 광주점",8191,"1.1%"],[16,"나래 사우스시티(죽전)",6629,"0.5%"],[17,"나래 타임스퀘어점",6562,"5.2%"],[18,"다온 타임월드점(대전)",6032,"-3.6%"],[19,"누리 대구",5920,"-2.5%"],[20,"누리 목동점",5731,"-6.0%"],[21,"다온 광교점",5125,"-0.1%"],[22,"마루 수원점",4570,"-4.7%"],[23,"누리 중동점",4533,"3.1%"],[24,"가람 평촌점",4529,"-1.0%"],[25,"가람 수원점",4523,"18.8%"],[26,"가람 동탄점",4453,"5.3%"],[27,"가람 광복점",3961,"1.1%"],[28,"가람 창원점",3846,"10.3%"],[29,"나래 의정부점",3841,"-4.3%"],[30,"가람 노원점",3751,"-9.7%"],[31,"누리 천호점",3660,"-6.1%"],[32,"가람 김포공항점",3615,"4.2%"],[33,"누리 킨텍스점",3410,"-2.5%"],[34,"누리 충청점",3390,"-5.8%"],[35,"누리 신촌점",3212,"-2.6%"],[36,"나래 천안아산점",3161,"-3.2%"],[37,"가람 영등포점",3146,"-7.0%"],[38,"다온 센터시티점(천안)",3058,"-7.0%"],[39,"마루 분당점",2903,"-13.1%"],[40,"가람 광주점",2713,"-2.1%"],[41,"가람 청량리점",2654,"0.2%"],[42,"나래 하남점",2617,"-0.8%"],[43,"가람 전주점",2551,"-4.6%"],[44,"누리 미아점",2540,"-5.6%"],[45,"가람 울산점",2535,"-2.9%"],[46,"가람 강남점",2451,"-0.2%"],[47,"가람 대전점",2126,"7.6%"],[48,"가람 중동점",1988,"-4.8%"],[49,"나래 김해점",1982,"5.0%"],[50,"가람 동래점",1842,"-8.9%"],[51,"가람 대구점",1786,"-5.3%"],[52,"나래 마산점",1703,"8.3%"],[53,"가람 구리점",1687,"-9.5%"],[54,"가람 안산점",1628,"-3.6%"],[55,"가람 일산점",1605,"-8.0%"],[56,"가람 포항점",1577,"-3.9%"],[57,"가람 분당점",1530,"-5.8%"],[58,"가람 미아점",1511,"-3.4%"],[59,"가람 건대스타시티점",1419,"-2.2%"],[60,"마루 평택점",1410,"-6.2%"],[61,"다온 진주점",1371,"-5.7%"],[62,"가람 센텀시티점",1352,"1.8%"],[63,"마루 원주점",1237,"-4.9%"],[64,"가람 상인점",1184,"-3.9%"],[65,"가람 관악점",1065,"-7.8%"]
    ];
    const OUTLET_SALES_TOP10_2025 = [
    [1,"나래 사이먼 여주점","약 9,000억원 내외","부동의 1위, 압도적인 명품 비중"],
    [2,"가람 프리미엄광역점 동부산점","약 8,000억원 내외","영남권 최대 규모, 오시리아 관광단지 시너지"],
    [3,"누리 프리미엄광역점 김포점","약 7,100억원 내외","누리 광역점 중 1위, 서울 근교 접근성·외국인 관광객 매출 급증"],
    [4,"누리 프리미엄광역점 스페이스원(남양주)","약 6,400억원 내외","수도권 동북부 거점, 문화 공간 특화"],
    [5,"가람 프리미엄광역점 김해점","약 4,900억원 내외","영남권 안정적 매출 유지"],
    [6,"나래 사이먼 부산점","약 4,800억원 내외","2025년 리뉴얼 효과로 순위 상승"],
    [7,"나래 사이먼 시흥점","약 4,200억원 내외","배곧신도시 및 서해안 관광객 배후 수요 탄탄"],
    [8,"누리 프리미엄광역점 대전점","약 4,100억원 내외","화재 이후 영업 정상화 및 충청권 점유율 회복"],
    [9,"가람 프리미엄광역점 이천점","약 3,900억원 내외","국내 최대 규모 체험 시설 보유, 아동/가족 강세"],
    [10,"뉴코아광역점 강남점","약 3,800억원 내외","이랜드 광역점 전체 매출 1위, 반포 핵심 입지로 도심점급 매출 기록"]
    ];
    function departmentBrand(name){
      const n=String(name||"").replace(/\s+/g,"").toLowerCase();
      if(n.includes("가람")) return "가람";
      if(n.includes("나래")) return "나래";
      if(n.includes("누리")) return "누리";
      if(n.includes("다온")) return "다온";
      if(n.includes("마루")) return "마루";
      return "기타 도심점";
    }

    function departmentBrandSummary(){
      const map=new Map();
      DEPARTMENT_SALES_RANKING_2025.forEach(r=>{
        const brand=departmentBrand(r[1]);
        if(!map.has(brand)) map.set(brand,{brand,sales:0,count:0,top:null});
        const x=map.get(brand);
        x.sales+=Number(r[2])||0;
        x.count+=1;
        if(!x.top || Number(r[2])>Number(x.top[2])) x.top=r;
      });
      const preferred=["가람","나래","누리","다온","마루","기타 도심점"];
      return [...map.values()].sort((a,b)=>{
        const ai=preferred.indexOf(a.brand), bi=preferred.indexOf(b.brand);
        if(ai!==-1 || bi!==-1) return (ai===-1?999:ai)-(bi===-1?999:bi);
        return b.sales-a.sales;
      });
    }

    function departmentBrandLogo(brand){
      // 가상 브랜드명은 원 도심점 로고를 노출하지 않음
      return "";
    }

    function renderDepartmentBrandDashboard(){
      const el=document.getElementById("departmentBrandDashboard");
      if(!el)return;
      const data=departmentBrandSummary();

      const brandCards=data.map(x=>{
        const logo=departmentBrandLogo(x.brand);
        return `
        <button class="department-brand-card${window.__selectedDepartmentBrand===x.brand?" active":""}"
          onclick="selectDepartmentBrand('${escapeJs(x.brand)}')">
          <div class="department-brand-card-head">
            ${logo?`<img class="department-brand-logo" src="${logo}" alt="${escapeHtml(x.brand)} 로고">`:""}
            <span class="department-brand-name">${escapeHtml(x.brand)}</span>
          </div>
          <strong>${x.sales.toLocaleString("ko-KR")}<i>억원</i></strong>
          <div class="department-brand-meta">
            <span>점포수 <b>${x.count}개</b></span>
            <span>최고매출 <b>${escapeHtml(x.top?.[1]||"-")}</b></span>
          </div>
        </button>`;
      }).join("");

      const timesquareCard=`
        <button class="department-brand-card timesquare-brand-card" onclick="clearDepartmentBrand()">
          <div class="department-brand-card-head">
            <span class="department-brand-name">아람</span>
          </div>
          <strong>6,438<i>억원</i></strong>
          <div class="department-brand-meta">
            <span>2025년 매출</span>
            <span><b>아람</b></span>
          </div>
        </button>`;

      el.innerHTML=brandCards+timesquareCard;
    }
    function departmentComparisonRows(){
      // 아람: 13,000억원(도심점 포함) - 나래 타임스퀘어점 6,562억원 = 6,438억원
      // 공식 단독 매출이 아니라 비교용 추정치이므로 신장률은 표시하지 않음.
      const rows=DEPARTMENT_SALES_RANKING_2025.map(r=>({
        originalRank:Number(r[0]), name:r[1], sales:Number(r[2])||0, rate:r[3], estimated:false
      }));
      rows.push({originalRank:null,name:"아람",sales:6438,rate:"-",estimated:true});
      return rows.sort((a,b)=>b.sales-a.sales).map((r,idx)=>[
        idx+1,r.name,r.sales,r.rate,r.estimated
      ]);
    }

    function rankingRows(type){
      const rows=type==="department"?departmentComparisonRows():OUTLET_SALES_TOP10_2025;
      if(type!=="department" || !window.__selectedDepartmentBrand) return rows;
      return rows.filter(r=>!r[4] && departmentBrand(r[1])===window.__selectedDepartmentBrand);
    }

    function selectDepartmentBrand(brand){
      window.__selectedDepartmentBrand =
        window.__selectedDepartmentBrand===brand ? "" : brand;
      renderDepartmentBrandDashboard();
      renderRetailRanking("department");
    }

    function clearDepartmentBrand(){
      window.__selectedDepartmentBrand="";
      renderDepartmentBrandDashboard();
      renderRetailRanking("department");
      document.getElementById("retailRankTitle")?.scrollIntoView({behavior:"smooth",block:"center"});
    }

    function renderRetailRanking(type){
      const isDept=type==="department";
      const selected=window.__selectedDepartmentBrand||"";
      const title=isDept
        ? (selected ? `${selected} 2025년 점포별 매출 순위` : "2025년 도심점 전체 점포 매출 순위")
        : "2025년 광역점 매출 TOP10";
      const rows=rankingRows(type);
      const grid=document.getElementById("retailRankGrid"); if(!grid)return;
      document.getElementById("retailRankTitle").textContent=title;
      document.querySelectorAll(".rank-tab").forEach(b=>b.classList.toggle("active",b.dataset.rankType===type));
      grid.classList.toggle("outlet",!isDept);
      grid.innerHTML=rows.map(r=>{
        const rank=Number(r[0]);
        const medal=rank===1?"🥇":rank===2?"🥈":rank===3?"🥉":"";
        const topClass=rank<=3?` top-${rank}`:"";
        if(isDept){
          const estimated=Boolean(r[4]);
          const down=String(r[3]).startsWith("-");
          const rateClass=estimated?"rank-estimated":(down?"rank-down":"rank-up");
          const arrow=estimated?"≈":(down?"▼":"▲");
          return `<article class="retail-rank-card${topClass}${estimated?" timesquare-rank-card":""}">
            <div class="retail-rank-position"><span>${medal}</span><b>${rank}</b></div>
            <div class="retail-rank-main"><strong>${escapeHtml(r[1])}</strong><small>${estimated?"2025 매출":"2025 매출"}</small><em>${Number(r[2]).toLocaleString('ko-KR')}<i>억원</i></em></div>
            <div class="retail-rank-rate ${rateClass}"><small>${estimated?"신장률":"신장률"}</small><b>${estimated?"-":`${arrow} ${escapeHtml(String(r[3]).replace('-',''))}`}</b></div>
          </article>`;
        }
        return `<article class="retail-rank-card outlet${topClass}">
          <div class="retail-rank-position"><span>${medal}</span><b>${rank}</b></div>
          <div class="retail-rank-main"><strong>${escapeHtml(r[1])}</strong><small>2025 매출</small><em>${escapeHtml(r[2])}</em><p>${escapeHtml(r[3])}</p></div>
        </article>`;
      }).join("") || `<div class="rank-empty-card">표시할 점포가 없습니다.</div>`;
      document.getElementById("retailRankNote").textContent=isDept
        ? (selected ? `${selected}만 표시 중 · 다시 같은 브랜드 카드를 누르면 전체 순위로 돌아갑니다.` : '전체 순위에는 아람 6,438억원을 포함합니다. · 단위: 억원')
        : '첨부된 「2025년 광역점 매출 순위 TOP10」 기준';
      window.__retailRankType=type;
      const dash=document.getElementById("departmentBrandSection");
      if(dash) dash.style.display=isDept?"":"none";
      const allBtn=document.getElementById("departmentAllRankBtn");
      if(allBtn) allBtn.style.display=(isDept && selected)?"inline-flex":"none";
    }

    function buildSalesRankingPanel(){
      return `<section class="panel retail-ranking-panel">
        <div id="departmentBrandSection">
          <div class="retail-rank-topbar">
            <div>
              <span class="retail-rank-kicker">2025 RETAIL NETWORK DASHBOARD</span>
              <h3>도심점별 매출액 · 점포수 대시보드</h3>
              <p>브랜드별 전체 매출과 점포 수를 한눈에 확인하고, 카드를 눌러 개별 점포를 조회합니다.</p>
            </div>
          </div>
          <div class="department-brand-dashboard" id="departmentBrandDashboard"></div>
        </div>
        </div>

        <div class="retail-rank-subhead">
          <h3 id="retailRankTitle">2025년 도심점 전체 점포 매출 순위</h3>
          <button id="departmentAllRankBtn" class="department-all-rank-btn" type="button"
            onclick="clearDepartmentBrand()" style="display:none">↩ 전체 도심점 순위</button>
        </div>

        <div class="rank-tabs">
          <button class="rank-tab active" data-rank-type="department" onclick="renderRetailRanking('department')">🏬 도심점 점포 순위</button>
          <button class="rank-tab" data-rank-type="outlet" onclick="renderRetailRanking('outlet')">🛍️ 광역점 TOP10</button>
        </div>
        <div class="retail-rank-grid" id="retailRankGrid"></div>
        <p class="retail-rank-note" id="retailRankNote"></p>
      </section>`;
    }
    function buildModuleViews(){
      buildFundView();
      buildStoresView();
      buildOperationsView();

      Object.entries(MODULES).forEach(([key,items])=>{
        if(key==="fund" || key==="stores" || key==="operations") return;
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
          ${key==="sales"?buildSalesRankingPanel():""}
          ${special}
        `;
        if(key==="sales"){ renderDepartmentBrandDashboard(); renderRetailRanking("department"); }
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
    // 같은 ERP 내부 페이지는 현재 창에서 이동
    if(url.startsWith(HQ_BASE)){
      window.location.href=url;
      return;
    }

    // 외부 시스템만 새 탭으로 열기
    window.open(url,"_blank","noopener,noreferrer");
    return;
  }

  alert(`${title}\n\n현재 기존 본사 포털에서 확인되는 실제 연결 주소가 없는 기능입니다.\n기존 시스템 연결을 모두 끝낸 뒤 새 기능으로 구축합니다.`);
}


    function openEmployeeStatusModal(){
      const modal=document.getElementById("employeeStatusModal");
      if(!modal)return;
      modal.hidden=false;
      document.body.style.overflow="hidden";
    }
    function closeEmployeeStatusModal(){
      const modal=document.getElementById("employeeStatusModal");
      if(!modal)return;
      modal.hidden=true;
      document.body.style.overflow="";
    }
    document.addEventListener("keydown",event=>{
      if(event.key==="Escape") closeEmployeeStatusModal();
    });

    function handleQuickSystem(key){
      const map={
        managementDashboard:SYSTEM_LINKS.managementDashboard,
        attendanceAdmin:SYSTEM_LINKS.attendanceAdmin,
        notice:HQ_BASE+"notice.html",
        salesInput:"https://script.google.com/macros/s/AKfycbyfytW-OyP84u1yaa4FJIF0EDclm_w6CWpY1rIDszzax7SfVuxF9KsDw5yfd53k0fb6Nw/exec",
        leave:SYSTEM_LINKS.leave,
        trip:HQ_BASE+"trip-management.html",
        opening:HQ_BASE+"store-opening.html",
        daily:SYSTEM_LINKS.daily,
        storeDashboard:SYSTEM_LINKS.storeDashboard,
        settlement:"https://thebigkorea.github.io/thebigkorea-settlement/settlement-integrated.html",
        mail:"https://mail.worksmobile.com",
        drive:"https://drive.worksmobile.com"
      };

      if(map[key]){
        window.open(map[key],"_blank","noopener,noreferrer");
        return;
      }

      const views={
        storePartTime:"payroll"
      };

      if(views[key]){
        openView(views[key]);
      }
    }

    function escapeJs(s){
      return String(s).replace(/\\/g,"\\\\").replace(/'/g,"\\'");
    }

    document.addEventListener("DOMContentLoaded",init);
    setInterval(()=>{
      if(document.visibilityState==="visible"){
        loadQuickPendingBadges();
        loadContractRenewalTargets();
        loadMasterExpiryAlerts();
      }
    },60000);
