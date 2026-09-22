const API_URL =
  "https://script.google.com/macros/s/AKfycby8SCh-WsBXjBp1V-WsVKomUSWxlsWsnCUIMtNA8xTCNcnOqVGaQ-GCvyNY7XnzoLGgug/exec";

let ALL_NOTICES = [];

const TYPE_META = {
  main:       { category:"공지사항", label:"일반공지", icon:"📢" },
  emergency:  { category:"긴급공지", label:"긴급공지", icon:"🚨" },
  hygiene:    { category:"위생점검안내", label:"위생점검안내", icon:"🧼" },
  hr:         { category:"인사공지", label:"인사공지", icon:"👥" },
  sales:      { category:"매출공지", label:"매출공지", icon:"📈" },
  discipline: { category:"인사복무", label:"인사복무", icon:"📋" }
};

document.addEventListener("DOMContentLoaded", () => {
  initTypeCards();
  loadNotices();
});

function initTypeCards(){
  document.querySelectorAll(".type-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".type-card").forEach(x => x.classList.remove("active"));
      card.classList.add("active");

      const category = card.dataset.category;
      const type = card.dataset.type;

      document.getElementById("category").value = category;
      document.getElementById("noticeType").value = type;
      document.getElementById("selectedTypeText").textContent =
        TYPE_META[type]?.label || category;
    });
  });
}

async function loadNotices(){
  const box = document.getElementById("noticeList");
  box.innerHTML = '<div class="loading">공지사항을 불러오는 중입니다...</div>';

  try{
    const res = await fetch(API_URL + "?action=getNotices");
    const data = await res.json();

    if(!data.success){
      box.innerHTML = '<div class="empty">공지사항을 불러오지 못했습니다.</div>';
      return;
    }

    ALL_NOTICES = data.notices || [];
    renderNotices(ALL_NOTICES);
  }catch(err){
    console.error(err);
    box.innerHTML = '<div class="empty">서버 연결 오류가 발생했습니다.</div>';
  }
}

function renderNotices(list){
  const box = document.getElementById("noticeList");

  if(!list.length){
    box.innerHTML = '<div class="empty">등록된 공지사항이 없습니다.</div>';
    return;
  }

  box.innerHTML = list.map(n => {
    const important = n.important === "Y";
    const type = normalizeNoticeType(n.noticeType, n.category);
    const meta = TYPE_META[type] || TYPE_META.main;
    const image = getNoticeImage(type);

    return `
      <article class="notice-item type-${type}">
        <div class="notice-thumb">
          <img src="${image}" alt="${escapeHtml(meta.label)} 대표 이미지"
               onerror="this.parentElement.innerHTML='<span>${meta.icon}</span>'">
        </div>

        <div class="notice-body">
          <div class="notice-top">
            <div class="notice-badges">
              <span class="badge type-badge">${meta.icon} ${escapeHtml(meta.label)}</span>
              ${important ? '<span class="badge important-badge">중요</span>' : ''}
            </div>
            <span class="notice-date">${formatDate(n.createdAt)}</span>
          </div>

          <div class="notice-title">${escapeHtml(n.title)}</div>
          <div class="notice-content">${escapeHtml(n.content)}</div>

          <div class="notice-info">
            <span>대상 <b>${escapeHtml(n.target)}</b></span>
            <span>작성자 <b>${escapeHtml(n.writer)}</b></span>
            ${n.expireDate ? `<span>종료 <b>${escapeHtml(n.expireDate)}</b></span>` : ''}
          </div>

          <div class="notice-buttons">
            ${n.fileUrl ? `<button class="attach-btn" onclick="openAttachment('${escapeJs(n.fileUrl)}')">📎 첨부파일</button>` : ''}
            <button class="copy-btn" onclick="copyNoticeLink('${escapeJs(n.noticeId)}')">링크 복사</button>
            <button class="delete-btn" onclick="deleteNotice('${escapeJs(n.noticeId)}')">삭제</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

async function saveNotice(){
  const category = document.getElementById("category").value;
  const target = document.getElementById("target").value;
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const expireDate = document.getElementById("expireDate").value;
  const important = document.getElementById("important").value;
  const writer = document.getElementById("writer").value.trim() || "관리자";
  const noticeType = document.getElementById("noticeType").value;
  const fileUrl = document.getElementById("fileUrl").value.trim();
  const saveBtn = document.getElementById("saveBtn");

  if(!title){
    alert("제목을 입력하세요.");
    document.getElementById("title").focus();
    return;
  }

  if(!content){
    alert("공지 내용을 입력하세요.");
    document.getElementById("content").focus();
    return;
  }

  try{
    saveBtn.disabled = true;
    saveBtn.classList.add("saving");
    saveBtn.querySelector("span").textContent = "등록 중...";

    const res = await fetch(API_URL, {
      method:"POST",
      body:JSON.stringify({
        action:"saveNotice",
        category,
        target,
        title,
        content,
        expireDate,
        important,
        writer,
        noticeType,
        fileUrl
      })
    });

    const data = await res.json();

    if(data.success){
      alert("공지사항이 등록되었습니다.");

      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      document.getElementById("important").value = "N";
      document.getElementById("fileUrl").value = "";
      document.getElementById("expireDate").value = "";

      await loadNotices();
    }else{
      alert(data.message || "등록 실패");
    }
  }catch(err){
    console.error(err);
    alert("서버 연결 오류가 발생했습니다.");
  }finally{
    saveBtn.disabled = false;
    saveBtn.classList.remove("saving");
    saveBtn.querySelector("span").textContent = "공지 등록";
  }
}

async function deleteNotice(noticeId){
  if(!confirm("이 공지사항을 삭제할까요?")) return;

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
      await loadNotices();
    }else{
      alert(data.message || "삭제 실패");
    }
  }catch(err){
    alert("서버 연결 오류가 발생했습니다.");
  }
}

function normalizeNoticeType(type, category){
  if(TYPE_META[type]) return type;

  const map = {
    "공지사항":"main",
    "일반공지":"main",
    "긴급공지":"emergency",
    "위생점검안내":"hygiene",
    "인사공지":"hr",
    "매출공지":"sales",
    "인사복무":"discipline"
  };
  return map[category] || "main";
}

function getNoticeImage(type){
  const base = "https://thebigkorea.github.io/thebigkorea-hq/images/";
  const files = {
    main:"notice-main.png",
    emergency:"notice-emergency.png",
    hygiene:"notice-hygiene.png",
    hr:"notice-hr.png",
    sales:"notice-sales.png",
    discipline:"notice-discipline.png"
  };
  return base + (files[type] || files.main);
}

function openAttachment(url){
  if(!url) return;
  window.open(url, "_blank", "noopener");
}

function copyNoticeLink(noticeId){
  const notice = ALL_NOTICES.find(n => n.noticeId === noticeId);

  if(!notice){
    alert("공지 정보를 찾을 수 없습니다.");
    return;
  }

  const url =
    "https://thebigkorea.github.io/thebigkorea-hq/notice-view.html?id=" +
    encodeURIComponent(noticeId);

  const text = `${notice.title}\n\n${url}`;

  navigator.clipboard.writeText(text)
    .then(() => alert("공지 링크가 복사되었습니다."))
    .catch(() => prompt("아래 내용을 복사하세요.", text));
}

function formatDate(value){
  if(!value) return "";
  const d = new Date(value);
  if(isNaN(d.getTime())) return value;

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

function escapeJs(str){
  return String(str || "")
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll("\r", "")
    .replaceAll("\n", "\\n");
}
