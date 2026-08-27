const API_URL =
"https://script.google.com/macros/s/AKfycbwRGQcXgYhfkTUiklPrHs4uFe7oHpgn8D_jM2jJPpU74tXr3D_h6vGMq72CHXU0EnAb/exec";

const message = document.getElementById("message");
const searchBtn = document.getElementById("searchBtn");

window.addEventListener("DOMContentLoaded", initStoreOptions);

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

async function createCareerCertificate() {
  try {
    setLoading(true);

    const store = document.getElementById("store").value;
    const name = document.getElementById("name").value.trim();
    const ssnBack = document.getElementById("ssnBack").value.trim();
    const work = document.getElementById("work").value.trim();
    const purpose = document.getElementById("purpose").value.trim();

    if (!name || !ssnBack) {
      message.innerText = "직원 이름과 주민번호 뒤 7자리를 입력해주세요.";
      return;
    }

    message.innerText = "조회중입니다...";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "getCareerCertificate",
        name,
        ssn: ssnBack,
        store,
        purpose,
        work
      })
    });

    const result = await response.json();

    if (!result.success) {
      message.innerText =
        result.message || "직원 정보를 찾을 수 없습니다.";
      return;
    }

    renderCareer(
      result.employee,
      work,
      purpose,
      store,
      result.certificateNo
    );

    message.innerText = "경력증명서가 생성되었습니다.";

  } catch (err) {
    console.error(err);
    message.innerText = "조회 중 오류가 발생했습니다.";
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading) {
  if (isLoading) {
    searchBtn.disabled = true;
    searchBtn.innerText = "조회 중...";
    searchBtn.style.opacity = "0.7";
  } else {
    searchBtn.disabled = false;
    searchBtn.innerText = "경력증명서 조회 및 생성";
    searchBtn.style.opacity = "1";
  }
}

function renderCareer(
  emp,
  work,
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

  document.getElementById("issueNo").innerText =
    certificateNo || makeIssueNo("CAREER");

  document.getElementById("certName").innerText =
    emp.name || "";

  document.getElementById("certSsn").innerText =
    emp.ssn || maskSsn(emp.ssnBack || "");

  document.getElementById("certAddress").innerText =
    emp.address || "";

  document.getElementById("certDepartment").innerText =
    storeName;

  document.getElementById("certPosition").innerText =
    emp.position || "";

  document.getElementById("certPeriod").innerText =
    `${emp.joinDate || emp.hireDate || ""} ~ ${emp.leaveDate || emp.retireDate || "재직중"}`;

  document.getElementById("certWork").innerText =
    work || emp.jobType || "";

  document.getElementById("certPurpose").innerText =
    purpose || "";

  document.getElementById("certToday").innerText =
    todayKorean();

  document.getElementById("certStoreName").innerText =
    storeName;

  document.getElementById("previewBox").scrollIntoView({
    behavior: "smooth"
  });
}

function maskSsn(ssnBack) {
  if (!ssnBack) return "*******";
  return ssnBack.substring(0, 1) + "******";
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
