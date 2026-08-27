const API_URL =
"https://script.google.com/macros/s/AKfycbwRGQcXgYhfkTUiklPrHs4uFe7oHpgn8D_jM2jJPpU74tXr3D_h6vGMq72CHXU0EnAb/exec";

const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");

window.addEventListener("DOMContentLoaded", initStoreOptions);
searchBtn.addEventListener("click", searchCertificate);

async function initStoreOptions() {
  const storeSelect = document.getElementById("store");

  storeSelect.innerHTML =
    '<option value="">점포 불러오는 중...</option>';

  try {
    const response = await fetch(
      API_URL + "?action=getStores"
    );

    const result = await response.json();

    if (
      !result.success ||
      !Array.isArray(result.stores)
    ) {
      throw new Error(
        result.message || "점포 목록 조회 실패"
      );
    }

    storeSelect.innerHTML = "";

    result.stores.forEach(function(store) {
      const option = document.createElement("option");

      option.value = store.storeName;
      option.textContent = store.storeName;
      option.dataset.storeId = store.storeId;

      storeSelect.appendChild(option);
    });

    if (!result.stores.length) {
      storeSelect.innerHTML =
        '<option value="">등록된 점포가 없습니다.</option>';
    }

  } catch (err) {
    console.error("점포 목록 조회 실패", err);

    storeSelect.innerHTML =
      '<option value="">점포 목록을 불러오지 못했습니다.</option>';

    message.innerText =
      "점포 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
  }
}

async function searchCertificate() {
  const store = document.getElementById("store").value;
  const name = document.getElementById("name").value.trim();
  const ssn = document.getElementById("ssn").value.trim();
  const purpose = document.getElementById("purpose").value.trim();

  if (!name || !ssn) {
    message.innerText =
      "이름과 주민번호 뒤 7자리를 입력해주세요.";
    return;
  }

  setLoading(true);
  message.innerText = "조회중입니다...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "getCertificate",
        name,
        ssn,
        store,
        purpose
      })
    });

    const result = await response.json();

    if (!result.success) {
      message.innerText =
        result.message || "직원 정보를 찾을 수 없습니다.";
      return;
    }

    renderCertificate(
      result.employee,
      purpose,
      store,
      result.certificateNo
    );

  } catch (err) {
    console.error(err);
    message.innerText = "조회 중 오류가 발생했습니다.";
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading) {
  if (!searchBtn) return;

  if (isLoading) {
    searchBtn.disabled = true;
    searchBtn.innerText = "조회 중...";
    searchBtn.style.opacity = "0.7";
  } else {
    searchBtn.disabled = false;
    searchBtn.innerText = "재직증명서 조회 및 생성";
    searchBtn.style.opacity = "1";
  }
}

function renderCertificate(
  emp,
  purpose,
  selectedStore,
  certificateNo
) {
  const storeName =
    emp.store ||
    emp.workplace ||
    emp.storeName ||
    selectedStore ||
    "주식회사 더큰코리아";

  const issueNo =
    certificateNo || makeIssueNo("CERT");

  document.body.innerHTML = `
    <div class="wrap result-wrap">
      <div class="certificate-paper">

        <div class="issue-no">
          발급번호 : ${issueNo}
        </div>

        <div class="paper-title">재 직 증 명 서</div>

        <table class="info-table">
          <tr><th>성 명</th><td>${emp.name || ""}</td></tr>
          <tr><th>소 속</th><td>${storeName}</td></tr>
          <tr><th>직 위</th><td>${emp.position || ""}</td></tr>
          <tr><th>입 사 일</th><td>${emp.joinDate || emp.hireDate || ""}</td></tr>
          <tr><th>재직상태</th><td>${emp.status || "재직"}</td></tr>
          <tr><th>제출용도</th><td>${purpose || "-"}</td></tr>
        </table>

        <div class="confirm-text">
          위 사람은 상기와 같이 당사에 재직 중임을 증명합니다.
        </div>

        <div class="date-text">${todayKorean()}</div>

        <div class="company-info">
          <p>${storeName}</p>
          <p>주식회사 더큰코리아</p>

          <p class="representative-line">
            <span>대표이사 박병호</span>
            <img src="stamp.png" class="small-stamp" alt="법인인감">
          </p>
        </div>

      </div>

      <div class="print-btn-area no-print">
        <button class="print-btn" onclick="window.print()">
          인쇄 / PDF 저장
        </button>
      </div>
    </div>
  `;
}

function todayKorean() {
  const d = new Date();

  return `${d.getFullYear()}년 ${String(
    d.getMonth() + 1
  ).padStart(2, "0")}월 ${String(
    d.getDate()
  ).padStart(2, "0")}일`;
}

function makeIssueNo(prefix) {
  const d = new Date();

  return `${prefix}-${d.getFullYear()}${String(
    d.getMonth() + 1
  ).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}-${String(
    d.getHours()
  ).padStart(2, "0")}${String(
    d.getMinutes()
  ).padStart(2, "0")}${String(
    d.getSeconds()
  ).padStart(2, "0")}`;
}
