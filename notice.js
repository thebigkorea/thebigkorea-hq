const API_URL =
  "https://script.google.com/macros/s/AKfycby8SCh-WsBXjBp1V-WsVKomUSWxlsWsnCUIMtNA8xTCNcnOqVGaQ-GCvyNY7XnzoLGgug/exec";

document.addEventListener("DOMContentLoaded", () => {
  loadNotices();
});

async function loadNotices(){

  const box = document.getElementById("noticeList");
  box.innerHTML = "불러오는 중...";

  try{
    const res = await fetch(API_URL + "?action=getNotices");
    const data = await res.json();

    if(!data.success){
      box.innerHTML = "공지사항을 불러오지 못했습니다.";
      return;
    }

    renderNotices(data.notices || []);

  }catch(err){
    box.innerHTML = "서버 연결 오류가 발생했습니다.";
  }
}

function renderNotices(list){

  const box = document.getElementById("noticeList");

  if(list.length === 0){
    box.innerHTML = "등록된 공지사항이 없습니다.";
    return;
  }

  box.innerHTML = list.map(n => {

    const important =
      n.important === "Y";

    return `
      <div class="notice-item">
        <div class="notice-top">
          <span class="badge ${important ? "red" : ""}">
            ${important ? "중요" : n.category}
          </span>
          <span>${formatDate(n.createdAt)}</span>
        </div>

        <div class="notice-title">
          ${escapeHtml(n.title)}
        </div>

        <div class="notice-content">
          ${escapeHtml(n.content)}
        </div>

        <div class="notice-info">
          구분: ${n.category} /
          대상: ${n.target} /
          작성자: ${n.writer}
        </div>

        <button class="delete-btn"
          onclick="deleteNotice('${n.noticeId}')">
          삭제
        </button>
      </div>
    `;
  }).join("");
}

async function saveNotice(){

  const category =
    document.getElementById("category").value;

  const target =
    document.getElementById("target").value;

  const title =
    document.getElementById("title").value.trim();

  const content =
    document.getElementById("content").value.trim();

  const important =
    document.getElementById("important").value;

  const writer =
    document.getElementById("writer").value.trim()
    || "관리자";

  if(!title){
    alert("제목을 입력하세요.");
    return;
  }

  if(!content){
    alert("공지 내용을 입력하세요.");
    return;
  }

  try{
    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify({
        action:"saveNotice",
        category,
        target,
        title,
        content,
        important,
        writer
      })
    });

    const data = await res.json();

    if(data.success){
      alert("공지사항이 등록되었습니다.");

      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      document.getElementById("important").value = "N";

      loadNotices();
    }else{
      alert(data.message || "등록 실패");
    }

  }catch(err){
    alert("서버 연결 오류가 발생했습니다.");
  }
}

async function deleteNotice(noticeId){

  if(!confirm("이 공지사항을 삭제할까요?")){
    return;
  }

  try{
    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify({
        action:"deleteNotice",
        noticeId
      })
    });

    const data = await res.json();

    if(data.success){
      alert("삭제되었습니다.");
      loadNotices();
    }else{
      alert(data.message || "삭제 실패");
    }

  }catch(err){
    alert("서버 연결 오류가 발생했습니다.");
  }
}

function formatDate(value){

  if(!value) return "";

  const d = new Date(value);

  if(isNaN(d.getTime())){
    return value;
  }

  return d.toLocaleDateString("ko-KR", {
    year:"numeric",
    month:"2-digit",
    day:"2-digit"
  });
}

function escapeHtml(str){

  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}