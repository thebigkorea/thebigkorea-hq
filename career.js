const API_URL =
  "https://script.google.com/macros/s/AKfycbwRGQcXgYhfkTUiklPrHs4uFe7oHpgn8D_jM2jJPpU74tXr3D_h6vGMq72CHXU0EnAb/exec";


const searchBtn =
  document.getElementById("searchBtn");

const message =
  document.getElementById("message");


window.addEventListener(
  "DOMContentLoaded",
  initStoreOptions
);


/* =========================================================
   점포 목록 불러오기
========================================================= */

async function initStoreOptions() {

  const storeSelect =
    document.getElementById("store");


  storeSelect.innerHTML =
    '<option value="">점포 불러오는 중...</option>';


  try {

    const response =
      await fetch(
        API_URL +
        "?action=getStores&t=" +
        Date.now()
      );


    const result =
      await response.json();


    if (
      !result.success ||
      !Array.isArray(result.stores)
    ) {

      throw new Error(
        result.message ||
        "점포 목록 조회 실패"
      );

    }


    storeSelect.innerHTML = "";


    result.stores.forEach(
      function(store) {

        const storeId =
          String(
            store.storeId || ""
          ).trim();

        const storeName =
          String(
            store.storeName || ""
          ).trim();


        if (!storeName) {
          return;
        }


        const option =
          document.createElement(
            "option"
          );


        option.value =
          storeName;

        option.textContent =
          storeName;

        option.dataset.storeId =
          storeId;


        storeSelect.appendChild(
          option
        );

      }
    );


    if (!result.stores.length) {

      storeSelect.innerHTML =
        '<option value="">등록된 점포가 없습니다.</option>';

    }


  } catch (err) {

    console.error(
      "점포 목록 조회 실패",
      err
    );


    storeSelect.innerHTML =
      '<option value="">점포 목록을 불러오지 못했습니다.</option>';


    message.innerText =
      "점포 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";

  }

}


/* =========================================================
   경력증명서 조회
========================================================= */

async function createCareerCertificate() {

  const store =
    document.getElementById(
      "store"
    ).value;


  const name =
    document.getElementById(
      "name"
    ).value.trim();


  const ssnBack =
    document.getElementById(
      "ssnBack"
    ).value.trim();


  const work =
    document.getElementById(
      "work"
    ).value.trim();


  const purpose =
    document.getElementById(
      "purpose"
    ).value.trim();


  if (!store) {

    message.innerText =
      "소속 점포를 선택해주세요.";

    return;

  }


  if (!name || !ssnBack) {

    message.innerText =
      "직원 이름과 주민번호 뒤 7자리를 입력해주세요.";

    return;

  }


  if (ssnBack.length !== 7) {

    message.innerText =
      "주민번호 뒤 7자리를 정확히 입력해주세요.";

    return;

  }


  setLoading(true);

  message.innerText =
    "조회중입니다...";


  try {

    const response =
      await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8"
          },

          body: JSON.stringify({

            action:
              "getCareerCertificate",

            name:
              name,

            ssn:
              ssnBack,

            store:
              store,

            purpose:
              purpose,

            work:
              work

          })

        }
      );


    const result =
      await response.json();


    if (!result.success) {

      message.innerText =
        result.message ||
        "직원 정보를 찾을 수 없습니다.";

      return;

    }


    renderCareer(
      result.employee,
      work,
      purpose,
      store,
      result.certificateNo
    );


    message.innerText =
      "경력증명서가 생성되었습니다.";


  } catch (err) {

    console.error(err);


    message.innerText =
      "조회 중 오류가 발생했습니다.";


  } finally {

    setLoading(false);

  }

}


/* =========================================================
   조회 버튼 상태
========================================================= */

function setLoading(isLoading) {

  if (!searchBtn) {
    return;
  }


  if (isLoading) {

    searchBtn.disabled = true;

    searchBtn.innerText =
      "조회 중...";

    searchBtn.style.opacity =
      "0.7";


  } else {

    searchBtn.disabled = false;

    searchBtn.innerText =
      "경력증명서 조회 및 생성";

    searchBtn.style.opacity =
      "1";

  }

}


/* =========================================================
   경력증명서 화면 생성
========================================================= */

function renderCareer(
  emp,
  work,
  purpose,
  selectedStore,
  certificateNo
) {

  emp = emp || {};


  const storeName =
    emp.store ||
    emp.workplace ||
    emp.storeName ||
    emp.department ||
    selectedStore ||
    "주식회사 더큰코리아";


  const issueNo =
    certificateNo ||
    emp.issueNo ||
    makeIssueNo("CAREER");


  /* 발급번호 */

  document.getElementById(
    "issueNo"
  ).innerText =
    issueNo;


  /* 성명 */

  document.getElementById(
    "certName"
  ).innerText =
    emp.name || "";


  /* 주민번호 */

  document.getElementById(
    "certSsn"
  ).innerText =
    emp.ssn ||
    maskSsn(
      emp.ssnBack || ""
    );


  /* 주소 */

  document.getElementById(
    "certAddress"
  ).innerText =
    emp.address || "";


  /* 소속 */

  document.getElementById(
    "certDepartment"
  ).innerText =
    storeName;


  /* 직위 */

  document.getElementById(
    "certPosition"
  ).innerText =
    emp.position || "";


  /* 재직기간 */

  const joinDate =
    emp.joinDate ||
    emp.hireDate ||
    "";


  const leaveDate =
    emp.leaveDate ||
    emp.retireDate ||
    "";


  document.getElementById(
    "certPeriod"
  ).innerText =
    joinDate
      ? (
          joinDate +
          " ~ " +
          (
            leaveDate ||
            "재직중"
          )
        )
      : "";


  /* 담당업무 */

  document.getElementById(
    "certWork"
  ).innerText =
    work ||
    emp.jobType ||
    emp.department ||
    "";


  /* 제출용도 */

  document.getElementById(
    "certPurpose"
  ).innerText =
    purpose || "-";


  /* 발급일 */

  document.getElementById(
    "certToday"
  ).innerText =
    todayKorean();


  /* 하단 점포명 */

  document.getElementById(
    "certStoreName"
  ).innerText =
    storeName;


  /* =====================================================
     조회 성공 후에만 증명서 표시
  ====================================================== */

  const previewBox =
    document.getElementById(
      "previewBox"
    );


  previewBox.style.display =
    "block";


  setTimeout(
    function() {

      previewBox.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    },
    100
  );

}


/* =========================================================
   주민번호 마스킹
========================================================= */

function maskSsn(ssnBack) {

  if (!ssnBack) {
    return "*******";
  }


  return (
    ssnBack.substring(0, 1) +
    "******"
  );

}


/* =========================================================
   오늘 날짜
========================================================= */

function todayKorean() {

  const d =
    new Date();


  return (
    d.getFullYear() +
    "년 " +
    String(
      d.getMonth() + 1
    ).padStart(2, "0") +
    "월 " +
    String(
      d.getDate()
    ).padStart(2, "0") +
    "일"
  );

}


/* =========================================================
   예비 발급번호 생성
========================================================= */

function makeIssueNo(prefix) {

  const d =
    new Date();


  return (
    prefix +
    "-" +

    d.getFullYear() +

    String(
      d.getMonth() + 1
    ).padStart(2, "0") +

    String(
      d.getDate()
    ).padStart(2, "0") +

    "-" +

    String(
      d.getHours()
    ).padStart(2, "0") +

    String(
      d.getMinutes()
    ).padStart(2, "0") +

    String(
      d.getSeconds()
    ).padStart(2, "0")
  );

}