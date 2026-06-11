const API_URL =
"https://script.google.com/macros/s/AKfycbyshRs9k9fBXHjNlHSGvpDM2ueLRVRNL3Ya_3xorvLuZ9HHc4fB8JBa6jEowDRW0ZeO/exec";

const WORKPLACES = {
  hq: {
    workplaceName: "더큰코리아 본사",
    companyName: "주식회사 더큰코리아",
    companyRepresentative: "박병호",
    companyAddress: "대전광역시 유성구 테크노4로 29 201호",
    companyPhone: "042-712-5035",
    defaultWorkPlace: "주식회사 더큰코리아 본사"
  },
  koreahouse_jamsil: {
    workplaceName: "한국의집 잠실롯데월드몰",
    companyName: "한국의집 롯데월드몰점",
    companyRepresentative: "박병호",
    companyAddress: "서울특별시 송파구 올림픽로 300, 롯데월드몰 5층",
    companyPhone: "042-712-5035",
    defaultWorkPlace: "한국의집 롯데월드몰점"
  },
  gilchaejeong_apgujeong: {
    workplaceName: "길채정 압구정",
    companyName: "길채정 압구정",
    companyRepresentative: "박병호",
    companyAddress: "서울특별시 강남구 압구정로 343, 갤러리아백화점",
    companyPhone: "042-712-5035",
    defaultWorkPlace: "길채정 압구정"
  },
  sobagongbang_pyeongchon: {
    workplaceName: "평촌 소바공방",
    companyName: "소바공방 평촌점",
    companyRepresentative: "박병호",
    companyAddress: "경기도 안양시 동안구 시민대로 180, 롯데백화점 평촌점",
    companyPhone: "042-712-5035",
    defaultWorkPlace: "소바공방 평촌점"
  },
  koreahouse_hyojonggang_paju: {
  workplaceName: "한국의집 효종갱 파주",
  companyName: "한국의집 효종갱 파주",
  companyRepresentative: "박병호",
  companyAddress: "경기도 파주시 필승로 200, 파주프리미엄아울렛",
  companyPhone: "042-712-5035",
  defaultWorkPlace: "한국의집 효종갱 파주"
}
};

window.onload = function () {
  setupTimeOptions();
  setupEvents();
  applyWorkplace();
  calcTotalPay();
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
      calcTotalPay();
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

function setupTimeOptions() {
  const start = document.getElementById("startTime");
  const end = document.getElementById("endTime");

  start.innerHTML = `<option value="">출근시간 선택</option>`;
  end.innerHTML = `<option value="">퇴근시간 선택</option>`;

  for (let h = 6; h <= 23; h++) {
    ["00", "30"].forEach(m => {
      const time = `${String(h).padStart(2, "0")}:${m}`;
      start.innerHTML += `<option value="${time}">${time}</option>`;
      end.innerHTML += `<option value="${time}">${time}</option>`;
    });
  }

  end.innerHTML += `<option value="24:00">24:00</option>`;
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

function formatResidentNo() {
  const input = document.getElementById("residentNo");
  let v = input.value.replace(/[^0-9]/g, "").slice(0, 13);

  if (v.length > 6) {
    v = v.slice(0, 6) + "-" + v.slice(6);
  }

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

  if (v.length <= 3) {
    input.value = v;
  } else if (v.length <= 7) {
    input.value = v.slice(0, 3) + "-" + v.slice(3);
  } else {
    input.value = v.slice(0, 3) + "-" + v.slice(3, 7) + "-" + v.slice(7);
  }
}

function formatMoneyInput(input) {
  const raw = input.value.replace(/[^0-9]/g, "");
  input.value = raw ? Number(raw).toLocaleString("ko-KR") : "";
}

function calcTotalPay() {
  const ids = ["basePay", "overtimePay", "dutyPay", "positionPay", "mealPay"];

  const total = ids.reduce((sum, id) => {
    return sum + toNumber(document.getElementById(id).value);
  }, 0);

  document.getElementById("totalPay").value =
    total ? total.toLocaleString("ko-KR") : "";

  renderPreview();
}

function getJobDutyValue() {
  const job = val("jobDuty");
  if (job === "기타") return val("jobDutyEtc");
  return job;
}

function getData() {
  const workplaceCode = document.getElementById("workplaceCode").value;
  const wp = WORKPLACES[workplaceCode];

  return {
    contractType: "정규직 근로계약서",

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

    joinDate: val("joinDate"),
    startDate: val("joinDate"),

    workDays: val("workDays"),
    weeklyDays: val("workDays"),

    monthHour: val("monthHour"),
    monthlyHours: val("monthHour"),

    startTime: val("startTime"),
    endTime: val("endTime"),

    breakTime: val("breakTime"),
    restTime: val("breakTime"),

    workPlace: val("workPlace"),
    workplace: val("workPlace"),
    store: val("workPlace"),

    jobDuty: getJobDutyValue(),
    workDetail: getJobDutyValue(),

    workTime: makeWorkTime(),

    basePay: moneyVal("basePay"),
    baseSalary: moneyVal("basePay"),

    overtimePay: moneyVal("overtimePay"),
    overPay: moneyVal("overtimePay"),

    dutyPay: moneyVal("dutyPay"),
    jobPay: moneyVal("dutyPay"),

    positionPay: moneyVal("positionPay"),
    rankPay: moneyVal("positionPay"),

    mealPay: moneyVal("mealPay"),
    foodPay: moneyVal("mealPay"),

    totalPay: moneyVal("totalPay"),
    salary: moneyVal("totalPay"),
    monthlySalary: moneyVal("totalPay"),

    bankName: val("bankName"),
    bank: val("bankName"),

    bankAccount: val("bankAccount"),
    account: val("bankAccount")
  };
}

function makeWorkTime() {
  const start = val("startTime");
  const end = val("endTime");
  if (!start && !end) return "";
  return `${start || ""} ~ ${end || ""}`;
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
      btn.innerText = "정규직 근로계약서 생성";
    }
  }, 400);
}

function renderPreview() {
  const c = getData();
  document.getElementById("preview").innerHTML = renderContractHtml(c);
}

function renderContractHtml(c) {
  return `
    <h1>근 로 계 약 서</h1>

    <p>
      <strong>${c.companyName}</strong>(이하 “회사”라 한다)과 근로자
      <strong>${c.empName || "________"}</strong>
      (이하 “직원”이라 한다)은 다음과 같이 근로계약을 체결하고 이를 성실히 이행할 것을 약정한다.
    </p>

    <h3>제1조 계약기간</h3>
    <p>입사일 : ${c.joinDate || "________"}</p>
    <p>입사일로부터 기간의 정함이 없는 근로계약을 체결한다. 수습기간은 3개월로 한다.</p>

    <h3>제2조 근무장소 및 업무내용</h3>
    <p>① 근무장소 : ${c.workPlace || "________"}</p>
    <p>② 업무내용 : ${c.jobDuty || "________"}</p>

    <h3>제3조 근로시간 및 휴게</h3>
    <table>
      <tr>
        <th>주 근무일수</th>
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
    <p>급여은행 : ${c.bankName || "________"}</p>
    <p>계좌번호 : ${c.bankAccount || "________"}</p>

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

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px;">
      <div style="border:1px solid #cbd5e1;border-radius:16px;padding:20px;min-height:220px;">
        <h3>[회사]</h3>
        <p>상호 : ${c.companyName}</p>
        <p>
          대표자 : ${c.companyRepresentative}
          <img src="stamp.png" style="width:90px;vertical-align:middle;margin-left:10px;">
        </p>
        <p>주소 : ${c.companyAddress}</p>
        <p>연락처 : ${c.companyPhone}</p>
      </div>

      <div style="border:1px solid #cbd5e1;border-radius:16px;padding:20px;min-height:220px;">
        <h3>[근로자]</h3>
        <p>성명 : ${c.empName || "________"}</p>
        <p>주민등록번호 : ${c.residentNo || "________"}</p>
        <p>주소 : ${c.address || "________"}</p>
        <p>연락처 : ${c.phone || "________"}</p>
        <p style="margin-top:30px;">근로자 서명 : ____________________</p>
      </div>
    </div>
  `;
}

async function saveContract() {
  const c = getData();

  if (!c.empName) return alert("직원 성명을 입력하세요.");
  if (!c.residentNo) return alert("주민등록번호를 입력하세요.");
  if (!c.phone) return alert("연락처를 입력하세요.");
  if (!c.joinDate) return alert("입사일을 입력하세요.");
  if (!c.workDays) return alert("주 근무일수를 선택하세요.");
  if (!c.startTime) return alert("출근시간을 선택하세요.");
  if (!c.endTime) return alert("퇴근시간을 선택하세요.");
  if (!c.breakTime) return alert("휴게시간을 선택하세요.");
  if (!c.jobDuty) return alert("업무내용을 선택하세요.");
  if (!c.totalPay || Number(c.totalPay) <= 0) return alert("임금 정보를 입력하세요.");
  if (!c.bankName) return alert("급여은행을 입력하세요.");
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
      직원에게 아래 링크를 보내 전자서명을 진행하세요.
      <input id="workerLink" value="${link}" readonly />
      <button onclick="copyWorkerLink()">직원 링크 복사</button>
    `;

    btn.innerText = "계약 저장 완료";
    alert("계약서 저장 및 직원 링크 생성이 완료되었습니다.");

  } catch (err) {
    alert("오류 발생: " + err.message);
  } finally {
    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "계약 저장 및 직원 링크 생성";
    }, 800);
  }
}

function copyWorkerLink() {
  const input = document.getElementById("workerLink");
  input.select();
  document.execCommand("copy");
  alert("직원 링크가 복사되었습니다.");
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

function toNumber(v) {
  return Number(String(v || "").replace(/[^0-9]/g, ""));
}

function won(v) {
  const num = Number(String(v || "").replace(/[^0-9]/g, ""));
  if (!num) return "0원";
  return num.toLocaleString("ko-KR") + "원";
}

