const ERP_AUTH_API = "https://script.google.com/macros/s/AKfycbyczBpNvw5SH3o9jFZ6ZdW6i-ro6CfNDqG-xwiB9GKVyAybKF4d6PyN9ACF_ukHM7sr/exec";
const ERP_AUTH_TOKEN_KEY = "thebigkorea_erp_session";

async function erpAuthRequest(payload){
  const response = await fetch(ERP_AUTH_API, {
    method: "POST",
    redirect: "follow",
    cache: "no-store",
    headers: {"Content-Type":"text/plain;charset=utf-8"},
    body: JSON.stringify(payload)
  });
  if(!response.ok) throw new Error("인증 서버 연결 실패");
  return await response.json();
}

function erpShowLogin(message=""){
  document.documentElement.classList.add("erp-auth-pending");
  const gate=document.getElementById("erpLoginGate");
  const msg=document.getElementById("erpLoginMessage");
  const logout=document.getElementById("erpLogoutButton");
  if(gate) gate.hidden=false;
  if(msg) msg.textContent=message;
  if(logout) logout.hidden=true;
}

function erpUnlock(){
  const gate=document.getElementById("erpLoginGate");
  const logout=document.getElementById("erpLogoutButton");
  if(gate) gate.hidden=true;
  if(logout) logout.hidden=false;
  document.documentElement.classList.remove("erp-auth-pending");
}

async function erpVerifySession(){
  const token=sessionStorage.getItem(ERP_AUTH_TOKEN_KEY);
  if(!token){ erpShowLogin(); return; }
  try{
    const data=await erpAuthRequest({action:"verify",token});
    if(data && data.ok && data.authenticated){ erpUnlock(); return; }
  }catch(e){
    console.error("ERP 인증 확인 실패",e);
  }
  sessionStorage.removeItem(ERP_AUTH_TOKEN_KEY);
  erpShowLogin("로그인 시간이 만료되었습니다. 다시 로그인해 주세요.");
}

async function erpLogin(event){
  event.preventDefault();
  const id=document.getElementById("erpLoginId");
  const pw=document.getElementById("erpLoginPassword");
  const btn=document.getElementById("erpLoginButton");
  const msg=document.getElementById("erpLoginMessage");
  if(!id || !pw || !btn) return;
  btn.disabled=true;
  btn.textContent="확인 중...";
  if(msg) msg.textContent="";
  try{
    const data=await erpAuthRequest({action:"login",userId:id.value.trim(),password:pw.value});
    pw.value="";
    if(data && data.ok && data.token){
      sessionStorage.setItem(ERP_AUTH_TOKEN_KEY,data.token);
      id.value="";
      erpUnlock();
      return;
    }
    if(msg) msg.textContent=(data && data.message) || "로그인에 실패했습니다.";
  }catch(e){
    console.error("ERP 로그인 실패",e);
    if(msg) msg.textContent="인증 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.";
  }finally{
    btn.disabled=false;
    btn.textContent="로그인";
  }
}

async function erpLogout(){
  const token=sessionStorage.getItem(ERP_AUTH_TOKEN_KEY);
  sessionStorage.removeItem(ERP_AUTH_TOKEN_KEY);
  erpShowLogin("로그아웃되었습니다.");
  try{ if(token) await erpAuthRequest({action:"logout",token}); }catch(e){}
}

document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("erpLoginForm");
  const logout=document.getElementById("erpLogoutButton");
  if(form) form.addEventListener("submit",erpLogin);
  if(logout) logout.addEventListener("click",erpLogout);
  erpVerifySession();
});
