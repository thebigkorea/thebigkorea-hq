const API_URL =
"https://script.google.com/macros/s/AKfycbyshRs9k9fBXHjNlHSGvpDM2ueLRVRNL3Ya_3xorvLuZ9HHc4fB8JBa6jEowDRW0ZeO/exec";

let CURRENT_CONTRACT_ID = "";
let HAS_DRAWN = false;

window.onload = loadContractView;

async function loadContractView() {
  const contractId = getParam("id");
  CURRENT_CONTRACT_ID = contractId;

  if (!contractId) {
    showError("계약번호가 없습니다.");
    return;
  }

  try {
    const result = await postData({
      action: "getContractById",
      contractId: contractId,
      id: contractId
    });

    if (!result.success) {
      showError(result.message || "계약서를 불러오지 못했습니다.");
      return;
    }

    const c = normalizeContract(result);

    const signature =
      c.signature ||
      result.signature ||
      "";

    const status =
      c.status ||
      result.status ||
      "서명대기";

    const signedAt =
      c.signedAt ||
      result.signedAt ||
      "";

    const isSigned =
      String(status).includes("완료") ||
      String(signedAt).length > 1 ||
      String(signature).length > 20;

    document.getElementById("loading").style.display = "none";
    document.getElementById("contractWrap").style.display = "block";

    document.getElementById("pageTitle").innerText =
      isSigned ? "전자근로계약 완료본" : "전자근로계약 서명요청서";

    document.getElementById("contractContent").innerHTML =
      renderContractHtml(c, signature, status, signedAt);

    if (!isSigned) {
      setTimeout(setupSignatureCanvas, 100);
    }

  } catch (err) {
    showError("오류가 발생했습니다: " + err.message);
  }
}

function normalizeContract(result) {
  const base =
    result.contract ||
    result.data ||
    result.draft ||
    {};

  return {
    ...base,

    contractId:
      base.contractId ||
      result.contractId ||
      result.id ||
      "",

    companyName:
      base.companyName ||
      "주식회사 더큰코리아",

    companyRepresentative:
      base.companyRepresentative ||
      base.representative ||
      "박병호",

    companyAddress:
      base.companyAddress ||
      "서울 송파구 오금로 87",

    companyPhone:
      base.companyPhone ||
      "",

    empName:
      base.empName ||
      base.name ||
      result.empName ||
      result.name ||
      "",

    name:
      base.name ||
      base.empName ||
      result.name ||
      "",

    residentNo:
      base.residentNo ||
      base.rrn ||
      base.ssn ||
      "",

    phone:
      base.phone ||
      result.phone ||
      "",

    address:
      base.address ||
      "",

    joinDate:
      base.joinDate ||
      base.startDate ||
      "",

    workPlace:
      base.workPlace ||
      base.workplace ||
      base.store ||
      result.workplace ||
      result.store ||
      "",

    jobDuty:
      base.jobDuty ||
      base.workDetail ||
      base.duty ||
      base.memo ||
      "",

    workDays:
      base.workDays ||
      base.weeklyDays ||
      base.weekDays ||
      "",

    monthHour:
      base.monthHour ||
      base.monthlyHours ||
      base.standardHours ||
      "",

    workTime:
      base.workTime ||
      base.workingHours ||
      "",

    breakTime:
      base.breakTime ||
      base.restTime ||
      "",

    basePay:
      base.basePay ||
      base.baseSalary ||
      base.basicSalary ||
      "",

    overtimePay:
      base.overtimePay ||
      base.extensionPay ||
      "",

    dutyPay:
      base.dutyPay ||
      base.jobPay ||
      "",

    positionPay:
      base.positionPay ||
      base.titlePay ||
      "",

    mealPay:
      base.mealPay ||
      base.foodPay ||
      "",

    totalPay:
      base.totalPay ||
      base.totalSalary ||
      base.monthlySalary ||
      base.salary ||
      "",

    bankName:
      base.bankName ||
      base.bank ||
      base.salaryBank ||
      "",

    bankAccount:
      base.bankAccount ||
      base.account ||
      base.salaryAccount ||
      "",

    status:
      base.status ||
      result.status ||
      "서명대기",

    signedAt:
      base.signedAt ||
      result.signedAt ||
      "",

    signature:
      base.signature ||
      result.signature ||
      ""
  };
}

function renderContractHtml(c, signature, status, signedAt) {
  return `
    <h1>근 로 계 약 서</h1>

    <p>
      <strong>${c.companyName}</strong>(이하 “회사”라 한다)과 근로자
      <strong>${c.empName}</strong>
      (이하 “직원”이라 한다)은 다음과 같이 근로계약을 체결하고 이를 성실히 이행할 것을 약정한다.
    </p>

    <h3>제1조 계약기간</h3>
    <p>입사일 : ${c.joinDate}</p>
    <p>입사일로부터 기간의 정함이 없는 근로계약을 체결한다. 수습기간은 3개월로 한다.</p>

    <h3>제2조 근무장소 및 업무내용</h3>
    <p>① 근무장소 : ${c.workPlace}</p>
    <p>② 업무내용 : ${c.jobDuty}</p>

    <h3>제3조 근로시간 및 휴게</h3>
    <table>
      <tr>
        <th>주 근무일수</th>
        <th>월 기준시간</th>
        <th>근무시간</th>
        <th>휴게시간</th>
      </tr>
      <tr>
        <td>${c.workDays}</td>
        <td>${c.monthHour}</td>
        <td>${c.workTime}</td>
        <td>${c.breakTime}</td>
      </tr>
    </table>

    <h3>제4조 휴일 및 휴가</h3>
    <p>① 법정유급휴일은 주휴일 및 근로자의 날로 한다.</p>
    <p>② 회사는 근로기준법이 정하는 바에 따라 연차휴가를 부여한다.</p>

    <h3>제5조 임금</h3>
    <table>
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
    <p>급여은행 : ${c.bankName}</p>
    <p>계좌번호 : ${c.bankAccount}</p>

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

    <h3>사용자 및 근로자 서명</h3>

    <div class="sign-area">
      <div class="sign-box">
        <h3>[회사]</h3>
        <p>상호 : ${c.companyName}</p>
        <p>
          대표자 : ${c.companyRepresentative}
          <img class="stamp" src="stamp.png" alt="회사 직인">
        </p>
        <p>주소 : ${c.companyAddress}</p>
        <p>연락처 : ${c.companyPhone}</p>
      </div>

      <div class="sign-box">
        <h3>[근로자]</h3>
        <p>성명 : ${c.empName}</p>
        <p>주민등록번호 : ${c.residentNo}</p>
        <p>주소 : ${c.address}</p>
        <p>연락처 : ${c.phone}</p>
        ${
          status === "서명완료"
            ? `
              <p>서명일시 : ${signedAt}</p>
              ${signature ? `<img class="signature-img" src="${signature}" alt="근로자 전자서명">` : ""}
            `
            : `
              <p style="margin-top:24px;">아래 전자서명란에 서명 후 완료 버튼을 눌러주세요.</p>
            `
        }
      </div>
    </div>

    ${
      status === "서명완료"
        ? `
          <div class="bottom-buttons">
            <button class="blue" onclick="window.print()">인쇄 / PDF 저장</button>
          </div>
        `
        : renderSignatureInput()
    }
  `;
}

function renderSignatureInput() {
  return `
    <div class="signature-guide">
      본 계약 내용을 모두 확인하였으며, 아래 서명란에 전자서명합니다.
    </div>

    <canvas id="signatureCanvas" width="900" height="300"></canvas>

    <div class="sign-buttons">
      <button class="gray" onclick="clearSignature()">다시 서명</button>
      <button class="green" id="submitBtn" onclick="submitSignature()">전자서명 완료</button>
    </div>
  `;
}

function setupSignatureCanvas() {
  const canvas = document.getElementById("signatureCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;

  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#111827";

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
        y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function start(e) {
    e.preventDefault();
    drawing = true;
    HAS_DRAWN = true;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function move(e) {
    if (!drawing) return;
    e.preventDefault();

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function end(e) {
    e.preventDefault();
    drawing = false;
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mouseleave", end);

  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  canvas.addEventListener("touchend", end, { passive: false });
}

function clearSignature() {
  const canvas = document.getElementById("signatureCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  HAS_DRAWN = false;
}

async function submitSignature() {
  if (!HAS_DRAWN) {
    alert("서명을 먼저 해주세요.");
    return;
  }

  const canvas = document.getElementById("signatureCanvas");
  const signature = canvas.toDataURL("image/png");

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.innerText = "전자서명 저장 중...";

  try {
    const result = await postData({
      action: "signContract",
      contractId: CURRENT_CONTRACT_ID,
      id: CURRENT_CONTRACT_ID,
      signature: signature
    });

    if (!result.success) {
      alert(result.message || "전자서명 저장에 실패했습니다.");
      btn.disabled = false;
      btn.innerText = "전자서명 완료";
      return;
    }

    alert("전자서명이 완료되었습니다.");

    location.href =
      `contract-view.html?id=${encodeURIComponent(CURRENT_CONTRACT_ID)}&v=${Date.now()}`;

  } catch (err) {
    alert("오류 발생: " + err.message);
    btn.disabled = false;
    btn.innerText = "전자서명 완료";
  }
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
  const num = Number(String(v || "").replace(/[^0-9]/g, ""));
  if (!num) return "";
  return num.toLocaleString("ko-KR") + "원";
}

function showError(message) {
  document.getElementById("loading").innerHTML = message;
}