const API_URL =
  "https://script.google.com/macros/s/AKfycbzCO4TLMRGgt_OY-3T92mw58AAKcOwquq0ubepUEJgPO9YPeMV-hNeP7AHy7lvOPog7oQ/exec";

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
      status === "all" || c.status === status;

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
  const wait = list.filter(c => c.status === "서명대기").length;
  const done = list.filter(c => c.status === "서명완료").length;

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
    const isDone = c.status === "서명완료";

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
          <button class="green" onclick="copyViewLink('${c.contractId || ""}')">완료본</button>
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
      (이하 “직원”이라 한다)은 다음과 같이 근로계약을 체결한다.
    </p>

    <h3>제1조 계약기간</h3>
    <p>입사일 : ${c.joinDate || ""}</p>

    <h3>제2조 근무장소 및 업무내용</h3>
    <p>근무장소 : ${c.workPlace || ""}</p>
    <p>업무내용 : ${c.jobDuty || ""}</p>

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

    <h3>제4조 임금</h3>
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
        <td>${won(c.totalPay)}</td>
      </tr>
    </table>

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
        <img class="company-stamp" src="https://thebigkorea.github.io/hr-system/stamp.png">
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
    companyName: c.companyName || c.workplaceName || "한국의집 롯데월드몰점",
    companyRepresentative: c.companyRepresentative || "박병호",
    companyAddress: c.companyAddress || "서울특별시 송파구 올림픽로 300, 롯데월드몰 5층",
    companyPhone: c.companyPhone || "070-5015-7233"
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
  if (!v || Number(v) === 0) return "0원";
  const num = Number(String(v).replace(/[^0-9]/g, ""));
  if (!num) return String(v);
  return num.toLocaleString("ko-KR") + "원";
}