const API_URL =
"https://script.google.com/macros/s/AKfycby8SCh-WsBXjBp1V-WsVKomUSWxlsWsnCUIMtNA8xTCNcnOqVGaQ-GCvyNY7XnzoLGgug/exec";

const NOTICE_VIEW_BASE =
"https://thebigkorea.github.io/thebigkorea-hq/notice-view.html";

const NOTICE_SHARE_BASE =
"https://thebigkorea.github.io/thebigkorea-hq/";

let selectedCategory = "공지사항";
let selectedNoticeType = "main";
let noticesCache = [];

document.addEventListener("DOMContentLoaded", () => {
  bindTypeCards();
  loadNotices();
});

function bindTypeCards() {
  const cards = document.querySelectorAll(".type-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      selectedCategory = card.dataset.category || "공지사항";
      selectedNoticeType = card.dataset.type || "main";

      const categoryEl = document.getElementById("category");
      const typeEl = document.getElementById("noticeType");
      const textEl = document.getElementById("selectedTypeText");

      if (categoryEl) categoryEl.value = selectedCategory;
      if (typeEl) typeEl.value = selectedNoticeType;
      if (textEl) textEl.textContent =
        card.querySelector("b")?.textContent || selectedCategory;
    });
  });
}

async function apiPost(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("서버 응답 오류: " + response.status);
  }

  return await response.json();
}

async function saveNotice() {
  const btn = document.getElementById("saveBtn");

  const title = document.getElementById("title")?.value.trim() || "";
  const content = document.getElementById("content")?.value.trim() || "";

  if (!title) {
    alert("제목을 입력해 주세요.");
    document.getElementById("title")?.focus();
    return;
  }

  if (!content) {
    alert("내용을 입력해 주세요.");
    document.getElementById("content")?.focus();
    return;
  }

  const payload = {
    action: "saveNotice",
    category: document.getElementById("category")?.value || selectedCategory,
    noticeType: document.getElementById("noticeType")?.value || selectedNoticeType,
    target: document.getElementById("target")?.value || "전체 직원",
    important: document.getElementById("important")?.value || "N",
    title,
    content,
    fileUrl: document.getElementById("fileUrl")?.value.trim() || "",
    expireDate: document.getElementById("expireDate")?.value || "",
    writer: document.getElementById("writer")?.value.trim() || "관리자"
  };

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = "<b>등록 중...</b><span>잠시 기다려주세요</span>";
    }

    const result = await apiPost(payload);

    if (!result.success) {
      throw new Error(result.message || "공지 등록에 실패했습니다.");
    }

    alert("공지사항이 등록되었습니다.");

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("fileUrl").value = "";

    await loadNotices();

  } catch (err) {
    console.error(err);
    alert("공지 등록 중 오류가 발생했습니다.\n" + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "<b>공지 등록</b><span>선택한 유형으로 직원에게 전달</span>";
    }
  }
}

async function loadNotices() {
  const listEl = document.getElementById("noticeList");
  if (!listEl) return;

  listEl.innerHTML = '<div class="loading">공지사항을 불러오는 중입니다...</div>';

  try {
    const response = await fetch(
      API_URL + "?action=getNotices&t=" + Date.now(),
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("서버 응답 오류: " + response.status);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "공지 조회 실패");
    }

    noticesCache = Array.isArray(data.notices) ? data.notices : [];
    renderNotices(noticesCache);

  } catch (err) {
    console.error(err);
    listEl.innerHTML =
      '<div class="loading">서버 연결 오류가 발생했습니다.</div>';
  }
}

function renderNotices(list) {
  const listEl = document.getElementById("noticeList");
  if (!listEl) return;

  if (!list.length) {
    listEl.innerHTML =
      '<div class="loading">등록된 공지사항이 없습니다.</div>';
    return;
  }

  listEl.innerHTML = list.map(n => {
    const viewUrl =
      NOTICE_VIEW_BASE + "?id=" + encodeURIComponent(n.noticeId || "");

    return `
      <article class="notice-item">
        <img class="notice-thumb"
             src="${escapeHtml(n.imageUrl || "")}"
             alt="${escapeHtml(n.category || "공지")}">

        <div class="notice-info">
          <div class="notice-topline">
            <span class="notice-badge">${escapeHtml(n.category || "공지사항")}</span>
            <span class="notice-date">${escapeHtml(formatDisplayDate(n.createdAt))}</span>
          </div>

          <h3>${escapeHtml(n.title || "")}</h3>
          <p>${escapeHtml(n.content || "")}</p>

          <div class="notice-meta">
            대상 ${escapeHtml(n.target || "전체 직원")}
            &nbsp; 작성자 ${escapeHtml(n.writer || "관리자")}
            ${n.expireDate ? "&nbsp; 종료 " + escapeHtml(n.expireDate) : ""}
          </div>

          <div class="notice-actions">
            <a class="action-btn primary-action"
               href="${viewUrl}"
               target="_blank"
               rel="noopener">공지 확인하기</a>

            ${n.fileUrl ? `
              <a class="action-btn"
                 href="${escapeHtml(n.fileUrl)}"
                 target="_blank"
                 rel="noopener">📎 첨부파일</a>
            ` : ""}

            <button type="button"
                    class="action-btn"
                    onclick="copyNoticeLink('${escapeJs(n.noticeId)}','${escapeJs(n.noticeType)}')">
              링크 복사
            </button>

            <button type="button"
                    class="action-btn delete-action"
                    onclick="deleteNotice('${escapeJs(n.noticeId)}')">
              삭제
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function getSharePage(type) {
  const valid = [
    "main",
    "emergency",
    "hygiene",
    "hr",
    "sales",
    "discipline"
  ];

  type = String(type || "main").trim();
  if (!valid.includes(type)) type = "main";

  return NOTICE_SHARE_BASE + "notice-share-" + type + ".html";
}

async function copyNoticeLink(noticeId, noticeType) {
  const shareUrl =
    getSharePage(noticeType) +
    "?id=" + encodeURIComponent(noticeId);

  try {
    await navigator.clipboard.writeText(shareUrl);
    alert("카카오톡 공유용 링크를 복사했습니다.");
  } catch (err) {
    const ta = document.createElement("textarea");
    ta.value = shareUrl;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    alert("카카오톡 공유용 링크를 복사했습니다.");
  }
}

async function deleteNotice(noticeId) {
  if (!confirm("이 공지사항을 삭제하시겠습니까?")) return;

  try {
    const result = await apiPost({
      action: "deleteNotice",
      noticeId
    });

    if (!result.success) {
      throw new Error(result.message || "삭제 실패");
    }

    await loadNotices();
  } catch (err) {
    console.error(err);
    alert("삭제 중 오류가 발생했습니다.\n" + err.message);
  }
}

function formatDisplayDate(value) {
  if (!value) return "";

  const d = new Date(String(value).replace(" ", "T"));
  if (isNaN(d.getTime())) {
    return String(value).substring(0, 10).replaceAll("-", ". ") + ".";
  }

  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeJs(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}
