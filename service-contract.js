const API_URL =
"https://script.google.com/macros/s/AKfycbyshRs9k9fBXHjNlHSGvpDM2ueLRVRNL3Ya_3xorvLuZ9HHc4fB8JBa6jEowDRW0ZeO/exec";

const WORKPLACES = {
  hq: {
    workplaceName: "더큰코리아 본사",
    companyName: "주식회사 더큰코리아",
    companyRepresentative: "박병호",
    companyAddress: "서울특별시 송파구 올림픽로 300",
    companyPhone: "070-5015-7233",
    defaultWorkPlace: "주식회사 더큰코리아 본사"
  },
  koreahouse_jamsil: {
    workplaceName: "한국의집 잠실롯데월드몰",
    companyName: "한국의집 롯데월드몰점",
    companyRepresentative: "박병호",
    companyAddress: "서울특별시 송파구 올림픽로 300, 롯데월드몰 5층",
    companyPhone: "070-5015-7233",
    defaultWorkPlace: "한국의집 롯데월드몰점"
  },
  gilchaejeong_apgujeong: {
    workplaceName: "길채정 압구정",
    companyName: "길채정 압구정",
    companyRepresentative: "박병호",
    companyAddress: "서울특별시 강남구 압구정로 343, 갤러리아백화점",
    companyPhone: "070-5015-7233",
    defaultWorkPlace: "길채정 압구정"
  },
  sobagongbang_pyeongchon: {
    workplaceName: "평촌 소바공방",
    companyName: "소바공방 평촌점",
    companyRepresentative: "박병호",
    companyAddress: "경기도 안양시 동안구 시민대로 180, 롯데백화점 평촌점",
    companyPhone: "070-5015-7233",
    defaultWorkPlace: "소바공방 평촌점"
  }
};

window.onload = function () {
  setupEvents();
  applyWorkplace();
  renderPreview();
};

function setupEvents() {
  document.getElementById("workplaceCode").addEventListener("change", function () {
    applyWorkplace();
    renderPreview();
  });

  document.getElementById("residentNo").addEventListener("input", function () {
    formatResidentNo();
    autoBirthFromResidentNo();
    renderPreview();
  });

  document.getElementById("phone").addEventListener("input", function () {
    formatPhone();
    renderPreview();
  });

  document.getElementById("jobDuty").addEventListener("change", function () {
    const wrap = document.getElementById("jobDutyEtcWrap");
    if (wrap) wrap.style.display = this.value === "기타" ? "flex" : "none";
    renderPreview();
  });

  const etc = document.getElementById("jobDutyEtc");
  if (etc) etc.addEventListener("input", renderPreview);

  document.querySelectorAll(".money").forEach(input => {
    input.addEventListener("input", function () {
      formatMoneyInput(this);
      renderPreview();
    });
  });

  document.querySelectorAll("input, select").forEach(el => {
    if (
      el.id === "residentNo" ||
      el.id === "phone" ||
      el.classList.contains("money")
    ) return;

    el.addEventListener("change", renderPreview);
    el.addEventListener("input", renderPreview);
  });
}

function applyWorkplace() {
  const code = document.getElementById("workplaceCode").value;
  const wp = WORKPLACES[code];

  document.getElementById("workPlace").value = wp.defaultWorkPlace;

  document.getElementById("workplaceInfo").innerHTML = `
    <strong>${wp.workplaceName}</strong><br>
    상호 : ${wp.companyName}<br>
    대표자 : ${wp.companyRepresentative}<br>
    주소 : ${wp.companyAddress}<br>
    연락처 : ${wp.companyPhone}
  `;
}

function getData() {
  const workplaceCode = document.getElementById("workplaceCode").value;
  const wp = WORKPLACES[workplaceCode];

  return {
    contractType: "사업소득자 용역계약서",

    workplaceCode: workplaceCode,
    workplaceName: wp.workplaceName,

    companyName: wp.companyName,
    companyRepresentative: wp.companyRepresentative,
    companyAddress: wp.companyAddress,
    companyPhone: wp.companyPhone,

    empName: val("empName"),
    name: val("empName"),
    employeeName: val("empName"),

    residentNo: val("residentNo"),
    rrn: val("residentNo"),
    birth: val("birth"),
    phone: val("phone"),
    address: val("address"),

    startDate: val("startDate"),
    endDate: val("endDate"),
    joinDate: val("startDate"),

    workPlace: val("workPlace"),
    workplace: val("workPlace"),
    store: val("workPlace"),

    jobDuty: getJobDutyValue(),
    workDetail: getJobDutyValue(),

    payType: val("payType"),
    totalPay: moneyVal("totalPay"),
    salary: moneyVal("totalPay"),
    monthlySalary: moneyVal("totalPay"),

    withholding: val("withholding"),
    payDate: val("payDate"),

    bankName: val("bankName"),
    bank: val("bankName"),

    bankAccount: val("bankAccount"),
    account: val("bankAccount")
  };
}

function renderPreview() {
  const c = getData();

  document.getElementById("preview").innerHTML = `
    <h1>사업소득자 용역계약서</h1>

    <p>
      <strong>${c.companyName}</strong>(이하 “사업자”라 한다)과 용역제공자
      <strong>${c.empName || "________"}</strong>
      (이하 “제공자”라 한다)은 다음과 같이 용역계약을 체결한다.
    </p>

    <h3>제1조 계약기간</h3>
    <p>${c.startDate || "________"}부터 ${c.endDate || "________"}까지</p>

    <h3>제2조 용역장소 및 용역내용</h3>
    <p>① 용역장소 : ${c.workPlace || "________"}</p>
    <p>② 용역내용 : ${c.jobDuty || "________"}</p>

    <h3>제3조 용역비</h3>
    <table>
      <tr>
        <th>지급기준</th>
        <th>용역비</th>
        <th>원천징수</th>
        <th>지급일</th>
      </tr>
      <tr>
        <td>${c.payType || ""}</td>
        <td>${won(c.totalPay)}</td>
        <td>${c.withholding || ""}</td>
        <td>${c.payDate || ""}</td>
      </tr>
    </table>

    <h3>제4조 지급방법</h3>
    <p>사업자는 제공자 명의의 은행계좌로 용역비를 지급한다.</p>
    <p>지급은행 : ${c.bankName || "________"}</p>
    <p>계좌번호 : ${c.bankAccount || "________"}</p>

    <h3>제5조 독립 용역제공자 지위</h3>
    <p>
      제공자는 근로기준법상 근로자가 아닌 독립적인 용역제공자로서,
      본 계약은 고용계약이 아닌 용역계약임을 확인한다.
    </p>

    <h3>제6조 세금 및 신고</h3>
    <p>
      사업자는 관계 법령에 따라 용역비 지급 시 원천징수세액을 공제할 수 있으며,
      제공자는 이에 필요한 개인정보 및 계좌정보를 제공한다.
    </p>

    <h3>제7조 비밀유지</h3>
    <p>
      제공자는 용역 수행 과정에서 알게 된 사업자의 영업정보, 고객정보, 운영정보를
      제3자에게 누설하여서는 아니 된다.
    </p>

    <h3>제8조 전자계약 및 전자서명</h3>
    <p>
      본 계약은 전자문서 및 전자서명 방식으로 체결될 수 있으며,
      전자서명은 자필서명 또는 날인과 동일한 효력을 가진다.
    </p>

    <h3>제9조 기타사항</h3>
    <p>
      본 계약서에 명시되지 않은 사항은 민법, 상법 및 관계 법령에 따른다.
    </p>

    <h3>사업자 및 제공자 서명</h3>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px;">
      <div style="border:1px solid #cbd5e1;border-radius:16px;padding:20px;min-height:220px;">
        <h3>[사업자]</h3>
        <p>상호 : ${c.companyName}</p>
        <p>
          대표자 : ${c.companyRepresentative}
          <img src="stamp.png" style="width:90px;vertical-align:middle;margin-left:10px;">
        </p>
        <p>주소 : ${c.companyAddress}</p>
        <p>연락처 : ${c.companyPhone}</p>
      </div>

      <div style="border:1px solid #cbd5e1;border-radius:16px;padding:20px;min-height:220px;">
        <h3>[제공자]</h3>
        <p>성명 : ${c.empName || "________"}</p>
        <p>주민등록번호 : ${c.residentNo || "________"}</p>
        <p>주소 : ${c.address || "________"}</p>
        <p>연락처 : ${c.phone || "________"}</p>
        <p style="margin-top:30px;">제공자 서명 : ____________________</p>
      </div>
    </div>
  `;
}

async function saveContract() {
  const c = getData();

  if (!c.empName) return alert("성명을 입력하세요.");
  if (!c.residentNo) return alert("주민등록번호를 입력하세요.");
  if (!c.phone) return alert("연락처를 입력하세요.");
  if (!c.startDate) return alert("계약 시작일을 입력하세요.");
  if (!c.endDate) return alert("계약 종료일을 입력하세요.");
  if (!c.jobDuty) return alert("용역내용을 선택하세요.");
  if (!c.payType) return alert("지급기준을 선택하세요.");
  if (!c.totalPay || Number(c.totalPay) <= 0) return alert("용역비를 입력하세요.");
  if (!c.payDate) return alert("지급일을 입력하세요.");
  if (!c.bankName) return alert("지급은행을 입력하세요.");
  if (!c.bankAccount) return alert("계좌번호를 입력하세요.");

  const btn = document.getElementById("saveBtn");
  btn.disabled = true;
  btn.innerText = "계약 저장 중입니다...";

  try {
    const result = await postData({
      action: "saveContractDraft",
      ...c,
      data: c,
      contract: c
    });

    if (!result.success) {
      alert(result.message || "저장에 실패했습니다.");
      return;
    }

    const contractId = result.contractId || result.id || "";

    const link =
      `https://thebigkorea.github.io/thebigkorea-hq/contract-view.html?id=${encodeURIComponent(contractId)}&v=${Date.now()}`;

    const box = document.getElementById("resultBox");
    box.style.display = "block";
    box.innerHTML = `
      <strong>계약서가 저장되었습니다.</strong><br>
      계약번호 : ${contractId}<br>
      제공자에게 아래 링크를 보내 전자서명을 진행하세요.
      <input id="workerLink" value="${link}" readonly />
      <button onclick="copyWorkerLink()">직원 링크 복사</button>
    `;

    alert("계약서 저장 및 링크 생성이 완료되었습니다.");

  } catch (err) {
    alert("오류 발생: " + err.message);
  } finally {
    btn.disabled = false;
    btn.innerText = "계약 저장 및 직원 링크 생성";
  }
}

function makePreview() {
  const btn = document.querySelector("button.blue");
  if (btn) {
    btn.disabled = true;
    btn.innerText = "계약서 생성 중...";
  }

  renderPreview();

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.innerText = "사업소득자 용역계약서 생성";
    }
  }, 400);
}

function getJobDutyValue() {
  const job = val("jobDuty");
  if (job === "기타") return val("jobDutyEtc");
  return job;
}

function formatResidentNo() {
  const input = document.getElementById("residentNo");
  let v = input.value.replace(/[^0-9]/g, "").slice(0, 13);
  if (v.length > 6) v = v.slice(0, 6) + "-" + v.slice(6);
  input.value = v;
}

function autoBirthFromResidentNo() {
  const rrn = document.getElementById("residentNo").value.replace(/[^0-9]/g, "");
  if (rrn.length < 7) return;

  const yy = rrn.substring(0, 2);
  const mm = rrn.substring(2, 4);
  const dd = rrn.substring(4, 6);
  const genderCode = rrn.substring(6, 7);

  let century = "19";
  if (["3", "4", "7", "8"].includes(genderCode)) century = "20";

  document.getElementById("birth").value = `${century}${yy}-${mm}-${dd}`;
}

function formatPhone() {
  const input = document.getElementById("phone");
  let v = input.value.replace(/[^0-9]/g, "").slice(0, 11);

  if (v.length <= 3) input.value = v;
  else if (v.length <= 7) input.value = v.slice(0, 3) + "-" + v.slice(3);
  else input.value = v.slice(0, 3) + "-" + v.slice(3, 7) + "-" + v.slice(7);
}

function formatMoneyInput(input) {
  const raw = input.value.replace(/[^0-9]/g, "");
  input.value = raw ? Number(raw).toLocaleString("ko-KR") : "";
}

function copyWorkerLink() {
  const input = document.getElementById("workerLink");
  input.select();
  document.execCommand("copy");
  alert("링크가 복사되었습니다.");
}

async function postData(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  return await response.json();
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function moneyVal(id) {
  return String(document.getElementById(id).value || "").replace(/[^0-9]/g, "");
}

function won(v) {
  const num = Number(String(v || "").replace(/[^0-9]/g, ""));
  if (!num) return "0원";
  return num.toLocaleString("ko-KR") + "원";
}

