const ERP_AUTH_API = "https://script.google.com/macros/s/AKfycbyczBpNvw5SH3o9jFZ6ZdW6i-ro6CfNDqG-xwiB9GKVyAybKF4d6PyN9ACF_ukHM7sr/exec";

const ERP_AUTH_TOKEN_KEY = "thebigkorea_erp_session";
const ERP_AUTH_EXPIRES_KEY = "thebigkorea_erp_session_expires";

// 브라우저 측 로그인 유지시간: 6시간
const ERP_AUTH_DURATION = 6 * 60 * 60 * 1000;


/* =========================================================
   인증 서버 요청
========================================================= */

async function erpAuthRequest(payload){
  const response = await fetch(ERP_AUTH_API, {
    method: "POST",
    redirect: "follow",
    cache: "no-store",
    headers: {
      "Content-Type":"text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  if(!response.ok){
    throw new Error("인증 서버 연결 실패");
  }

  return await response.json();
}


/* =========================================================
   로그인 정보 관리
   - localStorage 사용
   - 새 탭 / 새 페이지에서도 로그인 유지
========================================================= */

function erpSaveSession(token){
  const expiresAt = Date.now() + ERP_AUTH_DURATION;

  localStorage.setItem(ERP_AUTH_TOKEN_KEY, token);
  localStorage.setItem(ERP_AUTH_EXPIRES_KEY, String(expiresAt));
}


function erpGetToken(){

  const token = localStorage.getItem(ERP_AUTH_TOKEN_KEY);
  const expiresAt = Number(
    localStorage.getItem(ERP_AUTH_EXPIRES_KEY) || 0
  );

  if(!token){
    return null;
  }

  // 6시간이 지난 경우 자동 삭제
  if(!expiresAt || Date.now() >= expiresAt){
    erpClearSession();
    return null;
  }

  return token;
}


function erpClearSession(){
  localStorage.removeItem(ERP_AUTH_TOKEN_KEY);
  localStorage.removeItem(ERP_AUTH_EXPIRES_KEY);
}


/* =========================================================
   로그인 화면 표시
========================================================= */

function erpShowLogin(message=""){

  document.documentElement.classList.add("erp-auth-pending");

  const gate = document.getElementById("erpLoginGate");
  const msg = document.getElementById("erpLoginMessage");
  const logout = document.getElementById("erpLogoutButton");

  if(gate) gate.hidden = false;
  if(msg) msg.textContent = message;
  if(logout) logout.hidden = true;
}


/* =========================================================
   ERP 화면 잠금 해제
========================================================= */

function erpUnlock(){

  const gate = document.getElementById("erpLoginGate");
  const logout = document.getElementById("erpLogoutButton");

  if(gate) gate.hidden = true;
  if(logout) logout.hidden = false;

  document.documentElement.classList.remove("erp-auth-pending");
}


/* =========================================================
   메인 ERP 로그인 상태 확인
========================================================= */

async function erpVerifySession(){

  const token = erpGetToken();

  if(!token){
    erpShowLogin();
    return;
  }

  try{

    const data = await erpAuthRequest({
      action:"verify",
      token:token
    });

    if(data && data.ok && data.authenticated){
      erpUnlock();
      return;
    }

  }catch(e){

    console.error(
      "ERP 인증 확인 실패",
      e
    );

  }

  erpClearSession();

  erpShowLogin(
    "로그인 시간이 만료되었습니다. 다시 로그인해 주세요."
  );
}


/* =========================================================
   로그인
========================================================= */

async function erpLogin(event){

  event.preventDefault();

  const id = document.getElementById("erpLoginId");
  const pw = document.getElementById("erpLoginPassword");
  const btn = document.getElementById("erpLoginButton");
  const msg = document.getElementById("erpLoginMessage");

  if(!id || !pw || !btn){
    return;
  }

  btn.disabled = true;
  btn.textContent = "확인 중...";

  if(msg){
    msg.textContent = "";
  }

  try{

    const data = await erpAuthRequest({
      action:"login",
      userId:id.value.trim(),
      password:pw.value
    });

    // 입력한 비밀번호는 즉시 화면에서 삭제
    pw.value = "";

    if(data && data.ok && data.token){

      // 토큰만 저장
      // 아이디/비밀번호 자체는 저장하지 않음
      erpSaveSession(data.token);

      id.value = "";

      erpUnlock();

      return;
    }

    if(msg){
      msg.textContent =
        (data && data.message) ||
        "로그인에 실패했습니다.";
    }

  }catch(e){

    console.error(
      "ERP 로그인 실패",
      e
    );

    if(msg){
      msg.textContent =
        "인증 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.";
    }

  }finally{

    btn.disabled = false;
    btn.textContent = "로그인";
  }
}


/* =========================================================
   로그아웃
========================================================= */

async function erpLogout(){

  const token = erpGetToken();

  // 브라우저 인증정보 즉시 제거
  erpClearSession();

  erpShowLogin(
    "로그아웃되었습니다."
  );

  try{

    if(token){
      await erpAuthRequest({
        action:"logout",
        token:token
      });
    }

  }catch(e){
    console.error(
      "ERP 로그아웃 서버 처리 실패",
      e
    );
  }
}


/* =========================================================
   메인 index.html 이벤트
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  ()=>{

    const form =
      document.getElementById("erpLoginForm");

    const logout =
      document.getElementById("erpLogoutButton");

    if(form){
      form.addEventListener(
        "submit",
        erpLogin
      );
    }

    if(logout){
      logout.addEventListener(
        "click",
        erpLogout
      );
    }

    erpVerifySession();
  }
);


/* =========================================================
   ERP 내부 페이지 직접접속 보호

   index.html
       ↓ 로그인

   다른 내부 HTML
       ↓
   같은 localStorage 토큰 확인
       ↓
   서버 인증 확인
       ↓
   정상 화면 표시

   인증 실패
       ↓
   index.html 이동
========================================================= */

(function protectErpInternalPage(){

  const path = window.location.pathname;

  const fileName =
    path.split("/").pop().toLowerCase();


  // =========================================================
// ERP 로그인 예외 페이지
// 직원·외부인에게 직접 전달되어야 하는 화면만 등록
// =========================================================

const ERP_PUBLIC_PAGES = [
  "contract-view.html",       // 체결된 근로·용역계약서 조회
  "contract-complete.html"    // 계약 완료 안내
];

// 메인 로그인 페이지 + 공개 페이지는 ERP 인증 제외
if(
  fileName === "" ||
  fileName === "index.html" ||
  ERP_PUBLIC_PAGES.includes(fileName)
){
  return;
}


  // 인증 확인 전 내부 화면 숨김
  document.documentElement.style.visibility =
    "hidden";


  async function verifyInternalPage(){

    const token = erpGetToken();


    // 토큰이 없거나 6시간이 지난 경우
    if(!token){

      window.location.replace(
        "./index.html"
      );

      return;
    }


    try{

      const data =
        await erpAuthRequest({

          action:"verify",

          token:token

        });


      if(
        data &&
        data.ok &&
        data.authenticated
      ){

        // 인증 성공
        document.documentElement.style.visibility =
          "";

        return;
      }


    }catch(error){

      console.error(
        "ERP 내부 페이지 인증 실패",
        error
      );

    }


    // 서버에서도 인증 실패
    erpClearSession();


    // 로그인 페이지 이동
    window.location.replace(
      "./index.html"
    );
  }


  verifyInternalPage();

})();