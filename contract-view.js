const API_URL =
  "https://script.google.com/macros/s/AKfycbzeA02m0ipkNRN93C0YENiFnxsDlK20V2G7sw8OfW9A6d7iqS-7J_Y8gayCItxNbJN4/exec";

const DEFAULT_COMPANY = {
  companyName: "한국의집 롯데월드몰점",
  companyRepresentative: "박병호",
  companyAddress: "서울특별시 송파구 올림픽로 300, 롯데월드몰 5층",
  companyPhone: "070-5015-7233"
};

window.onload = loadContractView;

async function loadContractView() {
  const contractId = getParam("id");

  if (!contractId) {
    showError("계약번호가 없습니다.");
    return;
  }

  try {
    const result = await postData({
      action: "getContractById",
      contractId
    });

    if (!result.success) {
      showError(result.message || "계약서를 불러오지 못했습니다.");
      return;
    }

    const c = result.contract || {};
    const signature = result.signature || "";
    const contractType = result.contractType || c.contractType || "";

    document.getElementById("loading").style.display = "none";
    document.getElementById("contractWrap").style.display = "block";

    document.getElementById("contractContent").innerHTML =
      renderContract(c, signature, result, contractType);

  } catch (err) {
    showError("오류가 발생했습니다: " + err.message);
  }
}

function renderContract(c, signature, result, contractType) {
  const type = String(contractType || "");

  if (type.includes("용역") || type.includes("사업소득")) {
    return renderServiceContract(c, signature, result);
  }

  if (type.includes("아르바이트") || type.includes("계약직")) {
    return renderPartContract(c, signature, result);
  }

  return renderRegularContract(c, signature, result);
}

function renderRegularContract(c, signature, result) {
  const company = getCompanyInfo(c);

  return `
    <h2 class="section-title">정규직 근로계약서</h2>

    <p>
      <strong>${company.companyName}</strong>(이하 “회사”라 한다)과 근로자
      <strong>${c.empName || ""}</strong>
      (이하 “직원”이라 한다)은 다음과 같이 근로계약을 체결하고 이를 성실히 이행할 것을 약정한다.
    </p>

    <h2 class="section-title">제1조 계약기간</h2>
    <p>입사일 : ${c.joinDate || ""}</p>
    <p>입사일로부터 기간의 정함이 없는 근로계약을 체결한다. 수습기간은 3개월로 한다.</p>

    <h2 class="section-title">제2조 근무장소 및 업무내용</h2>
    <p>① 근무장소 : ${c.workPlace || ""}</p>
    <p>② 업무내용 : ${c.jobDuty || ""}</p>

    <h2 class="section-title">제3조 근로시간 및 휴게</h2>
    <table class="contract-table">
      <tr>
        <th>근무일수</th>
        <th>월 기준시간</th>
        <th>근무시간</th>
        <th>휴게시간</th>
      </tr>
      <tr>
        <td>${c.workDays || ""}</td>
        <td>${c.monthHour || ""}</td>
        <td>${c.workTime || ""}</td>
        <td>${c.breakTime || ""}</td>
      </tr>
    </table>

    <h2 class="section-title">제4조 휴일 및 휴가</h2>
    <p>① 법정유급휴일은 주휴일 및 근로자의 날로 한다.</p>
    <p>② 회사는 근로기준법이 정하는 바에 따라 연차휴가를 부여한다.</p>

    <h2 class="section-title">제5조 임금</h2>
    <table class="contract-table">
      <tr>
        <th>기본급</th>
        <th>연장수당</th>
        <th>직무수당</th>
        <th>직책수당</th>
        <th>식대</th>
        <th>월급총액</th>
      </tr>
      <tr>
        <td>${won(c.basePay)}</td>
        <td>${won(c.overtimePay)}</td>
        <td>${won(c.dutyPay)}</td>
        <td>${won(c.positionPay)}</td>
        <td>${won(c.mealPay)}</td>
        <td><strong>${won(c.totalPay)}</strong></td>
      </tr>
    </table>

    <h2 class="section-title">제6조 임금지급일</h2>
    <p>회사는 매월 1일부터 말일까지의 기간 동안 산정한 급여를 익월 10일에 직원 명의의 은행계좌로 지급한다.</p>

    <h2 class="section-title">제7조 제출서류</h2>
    <p>직원은 채용과 동시에 주민등록등본, 보건증, 통장사본, 신분증사본 등 회사가 요청하는 서류를 제출한다.</p>

    <h2 class="section-title">제8조 퇴직급여</h2>
    <p>회사는 근로자퇴직급여보장법이 정한 바에 따라 퇴직급여를 지급한다.</p>

    <h2 class="section-title">제9조 퇴직절차</h2>
    <p>직원은 퇴직하고자 할 경우 사직원을 사전 제출하여야 한다.</p>

    <h2 class="section-title">제10조 신의성실의무</h2>
    <p>직원은 회사의 경영방침에 따라 신의와 성실로 근무하여야 하며, 회사의 영업기밀사항을 외부에 누설하여서는 아니 된다.</p>

    <h2 class="section-title">제11조 CCTV 설치 동의</h2>
    <p>직원은 방범, 화재예방, 시설안전관리 목적의 CCTV 설치 및 운영에 대해 충분히 설명을 듣고 이해 및 동의한다.</p>

    <h2 class="section-title">제12조 전자계약 및 계약서 교부 확인</h2>
    <p>회사와 직원은 본 계약이 전자문서 및 전자서명 방식으로 체결될 수 있음을 확인하며, 전자서명은 자필서명 또는 날인과 동일한 효력을 가진다.</p>

    <h2 class="section-title">제13조 기타사항</h2>
    <p>본 계약서에 명시되지 않은 사항은 근로기준법, 관계 법령, 취업규칙 및 판례가 정하는 바에 따른다.</p>

    ${renderSignArea(c, signature, result, company, "회사", "근로자")}
    ${renderButtons()}
  `;
}

function renderPartContract(c, signature, result) {
  const company = getCompanyInfo(c);

  return `
    <h2 class="section-title">계약직 근로계약서</h2>

    <p>
      <strong>${company.companyName}</strong>(이하 “사업주”라 한다)과 근로자
      <strong>${c.empName || ""}</strong>
      (이하 “근로자”라 한다)은 다음과 같이 근로계약을 체결한다.
    </p>

    <h2 class="section-title">1. 근로계약기간</h2>
    <p>${c.startDate || c.joinDate || ""}부터 ${c.endDate || ""}까지</p>

    <h2 class="section-title">2. 근무장소</h2>
    <p>${c.workPlace || company.companyName}</p>

    <h2 class="section-title">3. 업무내용</h2>
    <p>${c.jobDuty || ""}</p>

    <h2 class="section-title">4. 근로시간</h2>
    <table class="contract-table">
      <tr>
        <th>근무일수</th>
        <th>출근시간</th>
        <th>퇴근시간</th>
        <th>휴게시간</th>
      </tr>
      <tr>
        <td>${c.workDays || ""}</td>
        <td>${c.startTime || ""}</td>
        <td>${c.endTime || ""}</td>
        <td>${c.breakTime || ""}</td>
      </tr>
    </table>

    <h2 class="section-title">5. 임금</h2>
    <table class="contract-table">
      <tr>
        <th>시급</th>
        <th>4대보험</th>
      </tr>
      <tr>
        <td>${won(c.hourPay || c.totalPay)}</td>
        <td>${c.insurance || ""}</td>
      </tr>
    </table>

    <h2 class="section-title">6. 전자계약 및 전자서명</h2>
    <p>사업주와 근로자는 본 계약이 전자문서 및 전자서명 방식으로 체결될 수 있음을 확인한다.</p>

    ${renderSignArea(c, signature, result, company, "사업주", "근로자")}
    ${renderButtons()}
  `;
}

function renderServiceContract(c, signature, result) {
  const company = getCompanyInfo(c);

  return `
    <h2 class="section-title">사업소득자 용역계약서</h2>

    <p>
      <strong>${company.companyName}</strong>(이하 “사업자”라 한다)과 용역제공자
      <strong>${c.empName || ""}</strong>
      (이하 “제공자”라 한다)은 다음과 같이 용역계약을 체결한다.
    </p>

    <h2 class="section-title">제1조 계약기간</h2>
    <p>${c.startDate || c.joinDate || ""}부터 ${c.endDate || ""}까지</p>

    <h2 class="section-title">제2조 용역장소 및 업무내용</h2>
    <p>① 용역장소 : ${c.workPlace || company.companyName}</p>
    <p>② 업무내용 : ${c.jobDuty || ""}</p>

    <h2 class="section-title">제3조 용역비</h2>
    <table class="contract-table">
      <tr>
        <th>지급기준</th>
        <th>금액</th>
      </tr>
      <tr>
        <td>${c.payType || "건별/시간별"}</td>
        <td>${won(c.totalPay || c.hourPay)}</td>
      </tr>
    </table>

    <h2 class="section-title">제4조 전자계약 및 전자서명</h2>
    <p>본 계약은 전자문서 및 전자서명 방식으로 체결될 수 있으며, 전자서명은 자필서명 또는 날인과 동일한 효력을 가진다.</p>

    ${renderSignArea(c, signature, result, company, "사업자", "제공자")}
    ${renderButtons()}
  `;
}

function renderSignArea(c, signature, result, company, companyLabel, workerLabel) {
  return `
    <div class="sign-area">
      <div class="sign-box">
        <h3>[${companyLabel}]</h3>
        <p>상호 : ${company.companyName}</p>
        <p>대표 : ${company.companyRepresentative}</p>
        <p>주소 : ${company.companyAddress}</p>
        <p>연락처 : ${company.companyPhone}</p>
        <img class="company-seal" src="stamp.png" alt="회사 도장">
      </div>

      <div class="sign-box">
        <h3>[${workerLabel}]</h3>
        <p>성명 : ${c.empName || ""}</p>
        <p>주민등록번호 : ${c.residentNo || ""}</p>
        <p>생년월일 : ${c.birth || ""}</p>
        <p>주소 : ${c.address || ""}</p>
        <p>연락처 : ${c.phone || ""}</p>
        <p>계약번호 : ${result.contractId || ""}</p>
        <p>계약상태 : ${result.status || ""}</p>
        <p>서명일시 : ${result.signedAt || "-"}</p>
        ${
          signature
            ? `<img class="signature-img" src="${signature}" alt="근로자 전자서명">`
            : `<p>아직 서명 이미지가 없습니다.</p>`
        }
      </div>
    </div>
  `;
}

function renderButtons() {
  return `
    <div class="bottom-buttons">
      <button class="btn btn-print" onclick="window.print()">인쇄 / PDF 저장</button>
    </div>
  `;
}

function getCompanyInfo(c) {
  return {
    companyName: c.companyName || c.workplaceName || DEFAULT_COMPANY.companyName,
    companyRepresentative: c.companyRepresentative || c.representative || DEFAULT_COMPANY.companyRepresentative,
    companyAddress: c.companyAddress || DEFAULT_COMPANY.companyAddress,
    companyPhone: c.companyPhone || DEFAULT_COMPANY.companyPhone
  };
}

async function postData(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  return await response.json();
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function won(v) {
  if (!v || Number(v) === 0) return "0원";
  const num = Number(String(v).replace(/[^0-9]/g, ""));
  if (!num) return String(v);
  return num.toLocaleString("ko-KR") + "원";
}

function showError(message) {
  document.getElementById("loading").innerHTML = message;
}