const API_URL =
  "https://script.google.com/macros/s/AKfycbzCO4TLMRGgt_OY-3T92mw58AAKcOwquq0ubepUEJgPO9YPeMV-hNeP7AHy7lvOPog7oQ/exec";

const WORKPLACES = {
  hq: {
    workplaceName: "더큰코리아 본사",
    companyName: "주식회사 더큰코리아",
    representative: "박병호",
    address: "서울특별시 송파구 올림픽로 300",
    phone: "070-5015-7233",
    defaultWorkPlace: "더큰코리아 본사"
  },
  koreahouse_jamsil: {
    workplaceName: "한국의집 잠실롯데월드몰",
    companyName: "한국의집 롯데월드몰점",
    representative: "박병호",
    address: "서울특별시 송파구 올림픽로 300, 롯데월드몰 5층",
    phone: "070-5015-7233",
    defaultWorkPlace: "한국의집 롯데월드몰점"
  },
  gilchaejeong_apgujeong: {
    workplaceName: "길채정 압구정",
    companyName: "길채정 압구정",
    representative: "박병호",
    address: "서울특별시 강남구 압구정로 343, 갤러리아백화점",
    phone: "070-5015-7233",
    defaultWorkPlace: "길채정 압구정"
  },
  sobagongbang_pyeongchon: {
    workplaceName: "평촌 소바공방",
    companyName: "소바공방 평촌점",
    representative: "박병호",
    address: "경기도 안양시 동안구 시민대로 180, 롯데백화점 평촌점",
    phone: "070-5015-7233",
    defaultWorkPlace: "소바공방 평촌점"
  }
};

window.onload = function () {
  document.getElementById("workplaceCode").addEventListener("change", applyWorkplace);
  ["basePay", "overtimePay", "dutyPay", "positionPay", "mealPay"].forEach(id => {
    document.getElementById(id).addEventListener("input", calcTotalPay);
  });

  applyWorkplace();
  makePreview();
};

function applyWorkplace() {
  const code = document.getElementById("workplaceCode").value;
  const wp = WORKPLACES[code];

  document.getElementById("workPlace").value = wp.defaultWorkPlace;

  document.getElementById("workplaceInfo").innerHTML = `
    <strong>${wp.workplaceName}</strong><br>
    상호 : ${wp.companyName}<br>
    대표자 : ${wp.representative}<br>
    주소 : ${wp.address}<br>
    연락처 : ${wp.phone}
  `;

  makePreview();
}

function calcTotalPay() {
  const ids = ["basePay", "overtimePay", "dutyPay", "positionPay", "mealPay"];
  const total = ids.reduce((sum, id) => {
    return sum + Number(document.getElementById(id).value || 0);
  }, 0);

  document.getElementById("totalPay").value = total;
  makePreview();
}

function getData() {
  const workplaceCode = document.getElementById("workplaceCode").value;
  const wp = WORKPLACES[workplaceCode];

  return {
    contractType: "정규직 근로계약서",

    workplaceCode,
    workplaceName: wp.workplaceName,
    companyName: wp.companyName,
    companyRepresentative: wp.representative,
    companyAddress: wp.address,
    companyPhone: wp.phone,

    empName: val("empName"),
    phone: val("phone"),
    birth: val("birth"),
    residentNo: val("residentNo"),
    address: val("address"),
    joinDate: val("joinDate"),
    jobDuty: val("jobDuty"),

    workPlace: val("workPlace"),
    workDays: val("workDays"),
    monthHour: val("monthHour"),
    workTime: val("workTime"),
    breakTime: val("breakTime"),
    holiday: val("holiday"),

    basePay: val("basePay"),
    overtimePay: val("overtimePay"),
    dutyPay: val("dutyPay"),
    positionPay: val("positionPay"),
    mealPay: val("mealPay"),
    totalPay: val("totalPay")
  };
}

function makePreview() {
  const c = getData();
  const preview = document.getElementById("preview");

  preview.innerHTML = `
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

    <h3>제6조 임금지급일</h3>
    <p>회사는 매월 1일부터 말일까지의 기간 동안 산정한 급여를 익월 10일에 직원 명의의 은행계좌로 지급한다.</p>

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

    <h3>사용자 정보</h3>
    <p>상호 : ${c.companyName}</p>
    <p>대표자 : ${c.companyRepresentative}</p>
    <p>주소 : ${c.companyAddress}</p>
    <p>연락처 : ${c.companyPhone}</p>
  `;
}

async function saveContract() {
  const c = getData();

  if (!c.empName) return alert("직원명을 입력하세요.");
  if (!c.phone) return alert("연락처를 입력하세요.");
  if (!c.joinDate) return alert("입사일을 입력하세요.");
  if (!c.totalPay || Number(c.totalPay) <= 0) return alert("임금 항목을 입력하세요.");

  const btn = document.getElementById("saveBtn");
  btn.disabled = true;
  btn.innerText = "저장 중...";

  try {
    const result = await postData({
      action: "saveContractDraft",
      contractType: "정규직 근로계약서",
      employeeName: c.empName,
      phone: c.phone,
      joinDate: c.joinDate,
      contract: c
    });

    if (!result.success) {
      alert(result.message || "저장 실패");
      return;
    }

    const link = result.workerLink || result.link || "";

    const box = document.getElementById("resultBox");
    box.style.display = "block";
    box.innerHTML = `
      <strong>계약서가 저장되었습니다.</strong><br>
      계약번호 : ${result.contractId || ""}<br>
      직원에게 아래 링크를 보내 전자서명을 진행하세요.
      <input id="workerLink" value="${link}" readonly />
      <button style="margin-top:12px;width:100%;" onclick="copyWorkerLink()">직원 링크 복사</button>
    `;

    alert("계약서 저장이 완료되었습니다.");

  } catch (err) {
    alert("오류 발생: " + err.message);
  } finally {
    btn.disabled = false;
    btn.innerText = "계약 저장 및 직원 링크 생성";
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
  return document.getElementById(id).value.trim();
}

function won(v) {
  if (!v || Number(v) === 0) return "0원";

  const num = Number(String(v).replace(/[^0-9]/g, ""));
  if (!num) return "0원";

  return num.toLocaleString("ko-KR") + "원";
}