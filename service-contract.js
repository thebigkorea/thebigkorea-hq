const API_URL =
  "https://script.google.com/macros/s/AKfycbwRGQcXgYhfkTUiklPrHs4uFe7oHpgn8D_jM2jJPpU74tXr3D_h6vGMq72CHXU0EnAb/exec";

let canvas;
let ctx;
let drawing = false;
let currentContractId = null;

document.addEventListener("DOMContentLoaded", async () => {
  initResidentNoAutoBirth();
  initMoneyInput();
  initSignaturePad();

  const id = new URLSearchParams(window.location.search).get("id");
  if (id) {
    currentContractId = id;
    await loadContract(id);
  }

  document.body.classList.remove("loading");

});

function initResidentNoAutoBirth() {
  const resident = document.getElementById("residentNo");
  const birth = document.getElementById("birth");

  if (!resident || !birth) return;

  resident.addEventListener("input", function () {
    let v = this.value.replace(/[^0-9]/g, "");

    if (v.length > 6) {
      v = v.slice(0, 6) + "-" + v.slice(6, 13);
    }

    this.value = v;

    const nums = v.replace(/[^0-9]/g, "");
    if (nums.length >= 7) birth.value = getBirth(v);
  });
}

function getBirth(no) {
  const n = no.replace(/[^0-9]/g, "");
  const yy = n.slice(0, 2);
  const mm = n.slice(2, 4);
  const dd = n.slice(4, 6);
  const g = n.slice(6, 7);

  let c = "19";
  if (["3", "4", "7", "8"].includes(g)) c = "20";

  return `${c}${yy}년 ${Number(mm)}월 ${Number(dd)}일`;
}

function initMoneyInput() {
  const input = document.getElementById("totalPay") || document.getElementById("servicePay");
  if (!input) return;

  input.addEventListener("input", function () {
    const n = this.value.replace(/[^0-9]/g, "");
    this.value = n ? Number(n).toLocaleString() : "";
  });
}

function collectData() {
  const workplaceCode = value("workplaceCode");
  const workplaceName = selectedText("workplaceCode") || value("workPlace");
  const dutyRaw = value("jobDuty");
  const duty = dutyRaw === "기타" ? (value("jobDutyEtc") || "기타") : dutyRaw;

  const totalPay =
    value("totalPay") ||
    value("servicePay");

  const withholding =
    value("withholding") ||
    value("taxType");

  return {
    contractType: value("contractType") || "사업소득자 용역계약서",
    workplaceCode,
    workplaceName,
    companyName: "주식회사 더큰코리아",

    empName: value("empName"),
    residentNo: value("residentNo"),
    birth: value("birth"),
    phone: value("phone"),
    address: value("address"),

    startDate: formatDate(value("startDate")),
    endDate: formatDate(value("endDate")),
    startDateRaw: value("startDate"),
    endDateRaw: value("endDate"),
    workPlace: value("workPlace") || workplaceName,
    jobDuty: duty,

    payType: value("payType"),
    servicePay: totalPay,
    totalPay,
    taxType: withholding,
    withholding,
    payDate: value("payDate"),
    bankName: value("bankName"),
    bankAccount: value("bankAccount"),

    representative: "박병호"
  };
}

function validateData(d) {
  const required = [
    "empName", "residentNo", "birth", "phone", "address",
    "startDate", "endDate", "workPlace", "jobDuty",
    "payType", "totalPay", "withholding"
  ];

  for (const k of required) {
    if (!d[k]) {
      alert("필수 항목을 모두 입력해주세요.");
      return false;
    }
  }
  return true;
}

function createContract() {
  const d = collectData();
  if (!validateData(d)) return;

  renderCurrentPreview(d);
  setMessage("사업소득자 용역계약서가 생성되었습니다.");
}

async function saveContractAndCreateLink(event) {
  const btn = event?.target || document.getElementById("saveBtn");
  const d = collectData();

  if (!validateData(d)) return;

  renderCurrentPreview(d);

  if (btn) {
    btn.disabled = true;
    btn.innerText = "처리중...";
  }

  setMessage("계약 저장 및 직원 링크 생성 중입니다...");

  try {
    const result = await postData({
      action: "saveContractDraft",
      ...d,
      data: d,
      contract: d
    });

    if (!result || !result.success) {
      const msg = result?.message || "계약 저장 실패";
      alert(msg);
      setMessage(msg);
      return;
    }

    currentContractId = result.contractId;
    showLinkResult(result.contractId);

    setMessage("계약 저장 완료. 직원 링크가 생성되었습니다.");
    alert("계약 저장 및 직원 링크 생성이 완료되었습니다.");

  } catch (e) {
    console.error(e);
    alert("저장 중 오류가 발생했습니다.\n" + (e.message || ""));
    setMessage("저장 중 오류가 발생했습니다.");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = "계약 저장 및 직원 링크 생성";
    }
  }
}

async function loadContract(id) {
  try {
    const result = await postData({
      action: "getContractById",
      contractId: id
    });

    if (!result.success) {
      alert(result.message || "계약 조회 실패");
      return;
    }

    currentContractId = id;
    fillContract(result.contract || {});

    const forms = document.querySelectorAll(".form-box");

     forms.forEach(box => {
       box.style.display = "none";
     });

     const idCardSection =
      document.getElementById("idCardSection");

     if(idCardSection){
      idCardSection.style.display = "block"; 
     }

    setMessage("계약 내용을 확인한 뒤 전자서명을 진행해주세요.");

  } catch (e) {
    alert("계약서를 불러오는 중 오류가 발생했습니다.");
  }
}

function fillContract(d) {
  text("cEmpName", d.empName);
  text("cWorkerName", d.empName);
  text("cResidentNo", d.residentNo);
  text("cBirth", d.birth);
  text("cAddress", d.address);
  text("cPhone", d.phone);

  text("cStartDate", d.startDate);
  text("cEndDate", d.endDate);
  text("cWorkPlace", d.workPlace);
  text("cJobDuty", d.jobDuty);
  text("cPayType", d.payType);
  text("cServicePay", d.servicePay ? `${d.servicePay}원` : "");
  text("cTaxType", d.taxType);
  text("cToday", getTodayKorean());
}

function initSignaturePad() {
  canvas = document.getElementById("signaturePad");
  if (!canvas) return;

  ctx = canvas.getContext("2d");
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#111";

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endDraw);
  canvas.addEventListener("mouseleave", endDraw);

  canvas.addEventListener("touchstart", startDrawTouch, { passive: false });
  canvas.addEventListener("touchmove", drawTouch, { passive: false });
  canvas.addEventListener("touchend", endDraw);
}

function startDraw(e) {
  drawing = true;
  document.body.style.overflow = "hidden";
  const p = getPos(e);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
}

function draw(e) {
  if (!drawing) return;
  const p = getPos(e);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

function endDraw() {
  drawing = false;
  document.body.style.overflow = "auto";
}

function startDrawTouch(e) {
  e.preventDefault();
  startDraw(e.touches[0]);
}

function drawTouch(e) {
  e.preventDefault();
  draw(e.touches[0]);
}

function getPos(e) {
  const r = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) * (canvas.width / r.width),
    y: (e.clientY - r.top) * (canvas.height / r.height)
  };
}

function clearSignature() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = document.getElementById("workerSignatureImage");
  if (img) {
    img.src = "";
    img.style.display = "none";
  }

  const completeBox = document.getElementById("completeBox");
  if (completeBox) completeBox.style.display = "none";

  const signedTime = document.getElementById("signedTime");
  if (signedTime) signedTime.innerText = "";
}

async function completeElectronicContract(event) {
  const agree = document.getElementById("agreeCheck");

  if (!agree || !agree.checked) {
    alert("전자계약 동의 체크를 해주세요.");
    return;
  }

  if (isCanvasEmpty()) {
    alert("전자서명을 입력해주세요.");
    return;
  }

  if (!currentContractId) {
    alert("계약번호가 없습니다. 전자서명 링크로 다시 접속해주세요.");
    return;
  }

  const btn = event.target;
  btn.disabled = true;
  btn.innerText = "저장중...";

  const signature = canvas.toDataURL("image/png");

  const img = document.getElementById("workerSignatureImage");
  if (img) {
    img.src = signature;
    img.style.display = "block";
  }

  const signedTime = document.getElementById("signedTime");
  if (signedTime) {
    signedTime.innerText = new Date().toLocaleString() + " 전자서명 완료";
  }

  try {
    const result = await postData({
      action: "signContract",
      contractId: currentContractId,
      signature
    });

    if (result.success) {
      const completeBox = document.getElementById("completeBox");
      if (completeBox) completeBox.style.display = "block";

      btn.innerText = "전자계약 완료됨";
      setMessage("전자계약이 정상 완료되었습니다.");
      alert("전자계약이 정상 완료되었습니다.");
    } else {
      alert(result.message || "서명 저장 실패");
      btn.disabled = false;
      btn.innerText = "전자계약 완료";
    }
  } catch (e) {
    alert("전자서명 저장 중 오류가 발생했습니다.");
    btn.disabled = false;
    btn.innerText = "전자계약 완료";
  }
}

function copyContractLink() {
  const input = document.getElementById("contractLink");

  if (!input || !input.value) {
    alert("복사할 링크가 없습니다.");
    return;
  }

  input.select();
  document.execCommand("copy");
  alert("전자서명 링크가 복사되었습니다.");
}

async function postData(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  return await res.json();
}

function value(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function text(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val || "";
}

function setMessage(msg) {
  const el = document.getElementById("message");
  if (el) el.innerText = msg;
}

function formatDate(v) {
  if (!v) return "";
  const [y, m, d] = v.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

function getTodayKorean() {
  const today = new Date();
  return `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, "0")}월 ${String(today.getDate()).padStart(2, "0")}일`;
}

function isCanvasEmpty() {
  const blank = document.createElement("canvas");
  blank.width = canvas.width;
  blank.height = canvas.height;
  return canvas.toDataURL() === blank.toDataURL();
}
document.addEventListener("input", function(e) {
  const el = e.target;
  if (!el || !el.id) return;

  const moneyIds = [
    "basePay", "overtimePay", "dutyPay", "positionPay",
    "mealPay", "totalPay", "hourPay", "servicePay"
  ];

  if (moneyIds.includes(el.id)) {
    const n = el.value.replace(/[^0-9]/g, "");
    el.value = n ? Number(n).toLocaleString() : "";
  }

  if (el.id === "residentNo") {
    let n = el.value.replace(/[^0-9]/g, "").slice(0, 13);
    if (n.length > 6) n = n.slice(0, 6) + "-" + n.slice(6);
    el.value = n;

    const birth = document.getElementById("birth");
    if (birth && n.length >= 8) {
      birth.value = getBirthFromResidentNo(n);
    }
  }

  if (el.id === "phone") {
    let n = el.value.replace(/[^0-9]/g, "").slice(0, 11);
    if (n.length <= 3) el.value = n;
    else if (n.length <= 7) el.value = n.slice(0, 3) + "-" + n.slice(3);
    else el.value = n.slice(0, 3) + "-" + n.slice(3, 7) + "-" + n.slice(7);
  }
});

function getBirthFromResidentNo(v) {
  const n = String(v).replace(/[^0-9]/g, "");
  const yy = n.slice(0, 2);
  const mm = n.slice(2, 4);
  const dd = n.slice(4, 6);
  const g = n.slice(6, 7);

  let century = "19";
  if (["3", "4", "7", "8"].includes(g)) century = "20";

  return `${century}${yy}년 ${Number(mm)}월 ${Number(dd)}일`;
}

document.addEventListener("DOMContentLoaded", function(){

  const fileInput =
    document.getElementById("idCardFile");

  if(fileInput){

    fileInput.addEventListener("change", function(){

      const file = this.files[0];

      const preview =
        document.getElementById("idCardPreview");

      if(!file){

        preview.innerHTML = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = function(e){

        preview.innerHTML = `
          <img
            src="${e.target.result}"
            style="
              max-width:100%;
              border-radius:12px;
              border:1px solid #ddd;
              margin-top:10px;
            ">
        `;
      };

      reader.readAsDataURL(file);

    });

  }

});


/* =========================================================
   현재 입력 HTML 호환 / 미리보기 / 링크 생성
   - 완료본은 기존 thebigkorea-hq/contract-view.html 사용
   - contract-view.html의 기존 디자인은 건드리지 않음
========================================================= */
function selectedText(id) {
  const el = document.getElementById(id);
  if (!el || el.selectedIndex < 0) return "";
  return (el.options[el.selectedIndex]?.text || "").trim();
}

function escHtml(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showPreviewHtml(title, rows, d) {
  const preview = document.getElementById("preview");
  if (!preview) return;

  const body = rows.map(([label, val]) => `
    <tr>
      <th style="width:28%;padding:10px;border:1px solid #d7dee8;background:#f7f9fc;text-align:left;">${escHtml(label)}</th>
      <td style="padding:10px;border:1px solid #d7dee8;">${escHtml(val || "")}</td>
    </tr>
  `).join("");

  preview.innerHTML = `
    <div style="padding:28px;background:#fff;color:#172033;font-family:Arial,'Noto Sans KR',sans-serif;">
      <h2 style="margin:0 0 22px;text-align:center;font-size:26px;">${escHtml(title)}</h2>
      <p style="margin:0 0 20px;line-height:1.7;">
        <strong>${escHtml(d.workplaceName || d.workPlace || "주식회사 더큰코리아")}</strong>와
        <strong>${escHtml(d.empName || "")}</strong>은 아래 내용으로 계약을 체결합니다.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${body}</table>
      <div style="margin-top:24px;display:flex;gap:20px;flex-wrap:wrap;">
        <div style="flex:1;min-width:260px;padding:16px;border:1px solid #d7dee8;border-radius:10px;">
          <strong>[사업주]</strong><br><br>
          상호: ${escHtml(d.workplaceName || d.workPlace || "주식회사 더큰코리아")}<br>
          대표자: ${escHtml(d.representative || "박병호")}
        </div>
        <div style="flex:1;min-width:260px;padding:16px;border:1px solid #d7dee8;border-radius:10px;">
          <strong>[근로자/제공자]</strong><br><br>
          성명: ${escHtml(d.empName || "")}<br>
          연락처: ${escHtml(d.phone || "")}
        </div>
      </div>
    </div>
  `;
}

function showLinkResult(contractId) {
  const link =
    "https://thebigkorea.github.io/thebigkorea-hq/contract-view.html?id=" +
    encodeURIComponent(contractId) +
    "&v=" + Date.now();

  const box = document.getElementById("resultBox");
  if (box) {
    box.style.display = "block";
    box.innerHTML = `
      <strong>계약서가 저장되었습니다.</strong><br>
      계약번호 : ${escHtml(contractId)}<br>
      직원에게 아래 링크를 보내 전자서명을 진행하세요.
      <input id="contractLink" value="${escHtml(link)}" readonly
             style="width:100%;box-sizing:border-box;margin:12px 0;padding:12px;">
      <button type="button" onclick="copyContractLink()"
              style="width:100%;padding:12px;">직원 링크 복사</button>
    `;
  }
  return link;
}

function makePreview() {
  createContract();
}

function saveContract() {
  const btn = document.getElementById("saveBtn");
  saveContractAndCreateLink({ target: btn });
}

function renderCurrentPreview(d) {
  showPreviewHtml(
    d.contractType || "사업소득자 용역계약서",
    [
      ["계약기간", `${d.startDate} ~ ${d.endDate}`],
      ["용역장소", d.workPlace],
      ["용역내용", d.jobDuty],
      ["지급기준", d.payType],
      ["용역비", d.totalPay ? `${d.totalPay}원` : ""],
      ["원천징수", d.withholding],
      ["지급일", d.payDate],
      ["지급계좌", `${d.bankName || ""} ${d.bankAccount || ""}`.trim()],
      ["주소", d.address]
    ],
    d
  );
}
