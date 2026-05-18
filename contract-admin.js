const API_URL =
  "https://script.google.com/macros/s/AKfycbzeA02m0ipkNRN93C0YENiFnxsDlK20V2G7sw8OfW9A6d7iqS-7J_Y8gayCItxNbJN4/exec";

let allContracts = [];
let selectedContract = null;

window.onload = loadContracts;

async function loadContracts() {
  const tbody = document.getElementById("contractTableBody");

  tbody.innerHTML = `
    <tr>
      <td colspan="10">계약 목록을 불러오는 중입니다...</td>
    </tr>
  `;

  try {
    const result = await postData({
      action: "getContractList"
    });

    if (!result.success) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10">${result.message || "계약 목록을 불러오지 못했습니다."}</td>
        </tr>
      `;
      return;
    }

    allContracts = result.contracts || [];
    renderStats(allContracts);
    renderContracts(allContracts);

  } catch (err) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10">오류가 발생했습니다: ${err.message}</td>
      </tr>
    `;
  }
}

function searchContracts() {
  const name = document.getElementById("searchName").value.trim();
  const workplace = document.getElementById("workplaceFilter").value;
  const status = document.getElementById("statusFilter").value;
  const type = document.getElementById("typeFilter").value;

  const filtered = allContracts.filter(c => {
    const contractType = String(c.contractType || "");
    const workplaceName = String(c.workplaceName || c.companyName || "");

    const matchName =
      !name || String(c.employeeName || "").includes(name);

    const matchWorkplace =
      workplace === "all" || workplaceName.includes(workplace);

    const matchStatus =
      status === "all" || String(c.status || "").includes(status);

    let matchType = false;

    if (type === "all") {
      matchType = true;
    } else if (type === "정규직") {
      matchType = contractType.includes("정규직");
    } else if (type === "아르바이트") {
      matchType =
        contractType.includes("아르바이트") ||
        contractType.includes("계약직");
    } else if (type === "용역") {
      matchType =
        contractType.includes("용역") ||
        contractType.includes("사업소득");
    }

    return matchName && matchWorkplace && matchStatus && matchType;
  });

  renderContracts(filtered);
  renderStats(filtered);
}

function resetSearch() {
  document.getElementById("searchName").value = "";
  document.getElementById("workplaceFilter").value = "all";
  document.getElementById("statusFilter").value = "all";
  document.getElementById("typeFilter").value = "all";

  renderStats(allContracts);
  renderContracts(allContracts);
}

function renderStats(list) {
  const total = list.length;
  const wait = list.filter(c => String(c.status || "").includes("대기")).length;
  const done = list.filter(c => String(c.status || "").includes("완료")).length;

  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const month = list.filter(c => String(c.createdAt || "").startsWith(ym)).length;

  document.getElementById("totalCount").innerText = total;
  document.getElementById("waitCount").innerText = wait;
  document.getElementById("doneCount").innerText = done;
  document.getElementById("monthCount").innerText = month;
}

function renderContracts(list) {
  const tbody = document.getElementById("contractTableBody");
  tbody.innerHTML = "";

  if (!list || list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10">조회된 계약이 없습니다.</td>
      </tr>
    `;
    return;
  }

  list.forEach(c => {
    const isDone = String(c.status || "").includes("완료");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.contractId || ""}</td>
      <td>${c.workplaceName || c.companyName || "-"}</td>
      <td>${displayContractType(c.contractType)}</td>
      <td>
        <span class="badge ${isDone ? "done" : "wait"}">
          ${c.status || ""}
        </span>
      </td>
      <td>${c.employeeName || ""}</td>
      <td>${c.phone || ""}</td>
      <td>${c.joinDate || ""}</td>
      <td>${c.createdAt || ""}</td>
      <td>${c.signedAt || "-"}</td>
      <td>
        <div class="action-buttons">
          <button onclick="openContract('${c.contractId}')">원본보기</button>
          <button class="green" onclick="openCompleteView('${c.contractId || ""}')">완료본</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function displayContractType(type) {
  const t = String(type || "");

  if (t.includes("아르바이트") || t.includes("계약직")) {
    return "계약직 근로계약서";
  }

  if (t.includes("정규직")) {
    return "정규직 근로계약서";
  }

  if (t.includes("용역") || t.includes("사업소득")) {
    return "사업소득자 용역계약서";
  }

  return t || "-";
}

async function openContract(contractId) {
  const result = await postData({
    action: "getContractById",
    contractId
  });

  if (!result.success) {
    alert(result.message || "계약서를 불러오지 못했습니다.");
    return;
  }

  selectedContract = result;

  const c = result.contract || {};
  const signature = result.signature || "";
  const contractType = result.contractType || c.contractType || "";

  document.getElementById("contractDetail").innerHTML =
    renderAdminContract(c, signature, result, contractType);

  document.getElementById("modal").style.display = "block";
}

function renderAdminContract(c, signature, result, contractType) {
  const type = String(contractType || "");

  if (type.includes("용역") || type.includes("사업소득")) {
    return renderServiceAdmin(c, signature, result);
  }

  if (type.includes("아르바이트") || type.includes("계약직")) {
    return renderPartAdmin(c, signature, result);
  }

  return renderRegularAdmin(c, signature, result);
}

function renderRegularAdmin(c, signature, result) {
  const company = getCompanyInfo(c);

  return `
    <h1>근 로 계 약 서</h1>

    <p>
      <strong>${company.companyName}</strong>(이하 “회사”라 한다)과 근로자
      <strong>${c.empName || ""}</strong>
      (이하 “직원”이라 한다)은 다음과 같이 근로계약을 체결하고 이를 성실히 이행할 것을 약정한다.
    </p>

    <h3>제1조 계약기간</h3>
    <p>입사일 : ${c.joinDate || ""}</p>
    <p>입사일로부터 기간의 정함이 없는 근로계약을 체결한다. 수습기간은 3개월로 한다.</p>

    <h3>제2조 근무장소 및 업무내용</h3>
    <p>① 근무장소 : ${c.workPlace || ""}</p>
    <p>② 업무내용 : ${c.jobDuty || ""}</p>

    <h3>제3조 근로시간 및 휴게</h3>
    <table class="detail-table">
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

    <h3>제4조 휴일 및 휴가</h3>
    <p>① 법정유급휴일은 주휴일 및 근로자의 날로 한다.</p>
    <p>② 회사는 근로기준법이 정하는 바에 따라 연차휴가를 부여한다.</p>

    <h3>제5조 임금</h3>
    <table class="detail-table">
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

    <h3>제6조 임금지급방법</h3>
    <p>
      회사는 매월 1일부터 말일까지의 기간 동안 산정한 급여를 익월 10일에
      직원 명의의 은행계좌로 지급한다.
    </p>
    <p>급여은행 : ${c.bankName || ""}</p>
    <p>계좌번호 : ${c.bankAccount || ""}</p>

    <h3>제7조 제출서류</h3>
    <p>직원은 채용과 동시에 주민등록등본, 보건증, 통장사본, 신분증사본 등 회사가 요청하는 서류를 제출한다.</p>

    <h3>제8조 퇴직급여</h3>
    <p>회사는 근로자퇴직급여보장법이 정한 바에 따라 퇴직급여를 지급한다.</p>

    <h3>제9조 퇴직절차</h3>
    <p>직원은 퇴직하고자 할 경우 사직원을 사전 제출하여야 한다.</p>

    <h3>제10조 신의성실의무</h3>
    <p>직원은 회사의 경영방침에 따라 신의와 성실로 근무하여야 하며, 회사의 영업기밀사항을 외부에 누설하여서는 아니 된다.</p>

    <h3>제11조 CCTV 설치 동의</h3>
    <p>직원은 방범, 화재예방, 시설안전관리 목적의 CCTV 설치 및 운영에 대해 충분히 설명을 듣고 이해 및 동의한다.</p>

    <h3>제12조 전자계약 및 계약서 교부 확인</h3>
    <p>회사와 직원은 본 계약이 전자문서 및 전자서명 방식으로 체결될 수 있음을 확인하며, 전자서명은 자필서명 또는 날인과 동일한 효력을 가진다.</p>

    <h3>제13조 기타사항</h3>
    <p>본 계약서에 명시되지 않은 사항은 근로기준법, 관계 법령, 취업규칙 및 판례가 정하는 바에 따른다.</p>

    ${signAdminBox(c, signature, result, company, "회사", "근로자")}
  `;
}

function renderPartAdmin(c, signature, result) {
  const company = getCompanyInfo(c);

  return `
    <h1>계약직 근로계약서</h1>

    <p>
      <strong>${company.companyName}</strong>과 근로자
      <strong>${c.empName || ""}</strong>은 다음과 같이 근로계약을 체결한다.
    </p>

    <h3>근로계약기간</h3>
    <p>${c.startDate || c.joinDate || ""}부터 ${c.endDate || ""}까지</p>

    <h3>근무장소</h3>
    <p>${c.workPlace || company.companyName}</p>

    <h3>업무내용</h3>
    <p>${c.jobDuty || ""}</p>

    <h3>근로시간</h3>
    <table class="detail-table">
      <tr>
        <th>근무일수</th>
        <th>근무시간</th>
        <th>휴게시간</th>
      </tr>
      <tr>
        <td>${c.workDays || ""}</td>
        <td>${c.workTime || ""}</td>
        <td>${c.breakTime || ""}</td>
      </tr>
    </table>

    <h3>임금</h3>
    <p>${won(c.hourPay || c.totalPay)}</p>

    ${signAdminBox(c, signature, result, company, "사업주", "근로자")}
  `;
}

function renderServiceAdmin(c, signature, result) {
  const company = getCompanyInfo(c);

  return `
    <h1>사업소득자 용역계약서</h1>

    <p>
      <strong>${company.companyName}</strong>과 용역제공자
      <strong>${c.empName || ""}</strong>은 다음과 같이 용역계약을 체결한다.
    </p>

    <h3>계약기간</h3>
    <p>${c.startDate || c.joinDate || ""}부터 ${c.endDate || ""}까지</p>

    <h3>용역장소 및 업무내용</h3>
    <p>용역장소 : ${c.workPlace || company.companyName}</p>
    <p>업무내용 : ${c.jobDuty || ""}</p>

    <h3>용역비</h3>
    <p>${won(c.totalPay || c.hourPay)}</p>

    ${signAdminBox(c, signature, result, company, "사업자", "제공자")}
  `;
}

function signAdminBox(c, signature, result, company, companyLabel, workerLabel) {
  return `
    <h3>전자서명 정보</h3>
    <p>계약번호 : ${result.contractId || ""}</p>
    <p>계약상태 : ${result.status || ""}</p>
    <p>서명일시 : ${result.signedAt || "-"}</p>

    <div class="sign-admin-box">
      <div>
        <h3>[${companyLabel}]</h3>
        <p>상호 : ${company.companyName}</p>
        <p>대표 : ${company.companyRepresentative}</p>
        <p>주소 : ${company.companyAddress}</p>
        <p>연락처 : ${company.companyPhone}</p>
        <img class="company-stamp" src="stamp.png" alt="회사 직인">
      </div>

      <div>
        <h3>[${workerLabel}]</h3>
        <p>성명 : ${c.empName || ""}</p>
        <p>주민등록번호 : ${c.residentNo || ""}</p>
        <p>생년월일 : ${c.birth || ""}</p>
        <p>주소 : ${c.address || ""}</p>
        <p>연락처 : ${c.phone || ""}</p>
        ${
          signature
            ? `<img class="signature-img" src="${signature}" alt="근로자 전자서명">`
            : `<p>아직 서명 이미지가 없습니다.</p>`
        }
      </div>
    </div>
  `;
}

function getCompanyInfo(c) {
  return {
    companyName:
      c.companyName ||
      c.workplaceName ||
      "한국의집 롯데월드몰점",

    companyRepresentative:
      c.companyRepresentative ||
      c.representative ||
      "박병호",

    companyAddress:
      c.companyAddress ||
      "서울특별시 송파구 올림픽로 300, 롯데월드몰 5층",

    companyPhone:
      c.companyPhone ||
      "070-5015-7233"
  };
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function printContract() {
  window.print();
}

function copyWorkerLink() {
  if (!selectedContract || !selectedContract.contractId) {
    alert("복사할 계약번호가 없습니다.");
    return;
  }

  copyViewLink(selectedContract.contractId);
}

function openCompleteView(contractId) {
  if (!contractId) {
    alert("계약번호가 없습니다.");
    return;
  }

  const link =
    `https://thebigkorea.github.io/thebigkorea-hq/contract-view.html?id=${encodeURIComponent(contractId)}&v=${Date.now()}`;

  window.open(link, "_blank");
}

function copyViewLink(contractId) {
  if (!contractId) {
    alert("복사할 계약번호가 없습니다.");
    return;
  }

  const link =
    `https://thebigkorea.github.io/thebigkorea-hq/contract-view.html?id=${encodeURIComponent(contractId)}&v=${Date.now()}`;

  copyText(link);
  alert("완료본 링크가 복사되었습니다.");
}

function copyText(text) {
  const temp = document.createElement("input");
  document.body.appendChild(temp);
  temp.value = text;
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
}

async function postData(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  return await response.json();
}

function won(v) {
  const num = Number(String(v || "").replace(/[^0-9]/g, ""));
  if (!num) return "0원";
  return num.toLocaleString("ko-KR") + "원";
}