const API_URL =
"https://script.google.com/macros/s/AKfycby8SCh-WsBXjBp1V-WsVKomUSWxlsWsnCUIMtNA8xTCNcnOqVGaQ-GCvyNY7XnzoLGgug/exec";

const NOTICE_VIEW_BASE =
"https://thebigkorea.github.io/thebigkorea-hq/notice-view.html";

const NOTICE_SHARE_BASE =
"https://thebigkorea.github.io/thebigkorea-hq/";

const NOTICE_CACHE_KEY = "thebigkorea_notice_cache_v3";

let selectedCategory = "공지사항";
let selectedNoticeType = "main";
let noticesCache = [];

document.addEventListener("DOMContentLoaded", () => {
  bindTypeCards();
  bindNoticeFilters();

  const cached = readNoticeCache();
  if (cached.length) {
    noticesCache = cached;
    applyNoticeFilters();
  }

  loadNotices({ silent: cached.length > 0 });
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
      if (textEl) textEl.textContent = card.querySelector("b")?.textContent || selectedCategory;
    });
  });
}

function bindNoticeFilters() {
  const typeFilter = document.getElementById("noticeTypeFilter");
  const titleSearch = document.getElementById("noticeTitleSearch");
  const statusFilter = document.getElementById("noticeStatusFilter");

  if (typeFilter) typeFilter.addEventListener("change", applyNoticeFilters);
  if (statusFilter) statusFilter.addEventListener("change", applyNoticeFilters);

  if (titleSearch) {
    let timer;
    titleSearch.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(applyNoticeFilters, 80);
    });
  }
}

async function apiPost(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("서버 응답 오류: " + response.status);
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
    if (!result.success) throw new Error(result.message || "공지 등록에 실패했습니다.");

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("fileUrl").value = "";

    await loadNotices({ silent: true, force: true });
    alert("공지사항이 등록되었습니다.");
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

async function loadNotices(options = {}) {
  const { silent = false, force = false } = options;
  const listEl = document.getElementById("noticeList");
  if (!listEl) return;

  const refreshBtn = document.querySelector(".refresh-btn");

  if (!silent && !noticesCache.length) {
    listEl.innerHTML = '<div class="loading">공지사항을 불러오는 중입니다...</div>';
  }

  if (refreshBtn) {
    refreshBtn.disabled = true;
    refreshBtn.textContent = "↻ 갱신 중";
  }

  try {
    const url = API_URL + "?action=getNotices" + (force ? "&refresh=1&t=" + Date.now() : "");
    const response = await fetch(url, { cache: force ? "no-store" : "default" });
    if (!response.ok) throw new Error("서버 응답 오류: " + response.status);

    const data = await response.json();
    if (!data.success) throw new Error(data.message || "공지 조회 실패");

    noticesCache = Array.isArray(data.notices) ? data.notices : [];
    saveNoticeCache(noticesCache);
    applyNoticeFilters();
  } catch (err) {
    console.error(err);
    if (!noticesCache.length) {
      const cached = readNoticeCache();
      if (cached.length) {
        noticesCache = cached;
        applyNoticeFilters();
      } else {
        listEl.innerHTML = '<div class="loading">서버 연결 오류가 발생했습니다.</div>';
      }
    }
  } finally {
    if (refreshBtn) {
      refreshBtn.disabled = false;
      refreshBtn.textContent = "↻ 새로고침";
    }
  }
}

function applyNoticeFilters() {
  const typeValue = document.getElementById("noticeTypeFilter")?.value || "all";
  const titleValue = (document.getElementById("noticeTitleSearch")?.value || "").trim().toLowerCase();
  const statusValue = document.getElementById("noticeStatusFilter")?.value || "active";

  const filtered = noticesCache.filter(n => {
    const noticeType = normalizeNoticeType(n.noticeType, n.category);
    const typeMatch = typeValue === "all" || noticeType === typeValue;
    const titleMatch = !titleValue || String(n.title || "").toLowerCase().includes(titleValue);
    const expired = isExpiredNotice(n.expireDate);
    const statusMatch =
      statusValue === "all" ||
      (statusValue === "active" && !expired) ||
      (statusValue === "expired" && expired);

    return typeMatch && titleMatch && statusMatch;
  });

  renderNotices(filtered);
  const countEl = document.getElementById("noticeResultCount");
  if (countEl) countEl.textContent = filtered.length + "건";
}

function isExpiredNotice(expireDate) {
  if (!expireDate) return false;
  const raw = String(expireDate).trim().substring(0, 10);
  if (!raw) return false;

  const parts = raw.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return false;

  // 종료일 당일 23:59:59까지 진행중
  const expire = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59, 999);
  return Date.now() > expire.getTime();
}

function normalizeNoticeType(type, category) {
  const valid = ["main","emergency","hygiene","hr","sales","discipline"];
  type = String(type || "").trim();
  if (valid.includes(type)) return type;

  const map = {
    "공지사항":"main",
    "일반공지":"main",
    "긴급공지":"emergency",
    "위생점검안내":"hygiene",
    "위생점검":"hygiene",
    "인사공지":"hr",
    "매출공지":"sales",
    "인사복무":"discipline"
  };
  return map[String(category || "").trim()] || "main";
}

function renderNotices(list) {
  const listEl = document.getElementById("noticeList");
  if (!listEl) return;

  if (!list.length) {
    listEl.innerHTML =
      '<div class="notice-empty"><b>조건에 맞는 공지사항이 없습니다.</b><span>공지유형, 제목 또는 게시상태를 변경해 보세요.</span></div>';
    return;
  }

  listEl.innerHTML = list.map(n => {
    const viewUrl = NOTICE_VIEW_BASE + "?id=" + encodeURIComponent(n.noticeId || "");

    return `
      <article class="notice-item">
        <img class="notice-thumb"
             src="${escapeHtml(n.imageUrl || "")}"
             alt="${escapeHtml(n.category || "공지")}"
             loading="lazy"
             decoding="async">

        <div class="notice-info">
          <div class="notice-topline">
            <span class="notice-badge">${escapeHtml(n.category || "공지사항")}</span>
            ${String(n.important || "").toUpperCase() === "Y" ? '<span class="notice-badge important-badge">중요</span>' : ""}
            <span class="notice-date">${escapeHtml(formatDisplayDate(n.createdAt))}</span>
          </div>

          <h3>${escapeHtml(n.title || "")}</h3>
          <p>${escapeHtml(n.content || "")}</p>

          <div class="notice-meta">
            <span class="meta-item">♙ 대상 ${escapeHtml(n.target || "전체 직원")}</span>
            <span class="meta-item">♙ 작성자 ${escapeHtml(n.writer || "관리자")}</span>
            ${n.expireDate
              ? '<span class="meta-item">▣ 종료 ' + escapeHtml(String(n.expireDate).substring(0,10)) + '</span>'
              : '<span class="meta-item">▣ 상시 게시</span>'}
          </div>
        </div>

        <div class="notice-actions">
          <a class="action-btn primary-action" href="${viewUrl}" target="_blank" rel="noopener">◉ 공지 확인하기 ›</a>

          <div class="secondary-actions">
            ${n.fileUrl ? `<a class="action-btn" href="${escapeHtml(n.fileUrl)}" target="_blank" rel="noopener">📎 첨부파일</a>` : ""}
            <button type="button" class="action-btn" onclick="copyNoticeLink('${escapeJs(n.noticeId)}','${escapeJs(n.noticeType)}')">🔗 링크 복사</button>
          </div>

          <button type="button" class="action-btn delete-action" onclick="deleteNotice('${escapeJs(n.noticeId)}')">🗑 삭제</button>
        </div>
      </article>
    `;
  }).join("");
}

function saveNoticeCache(list) {
  try { localStorage.setItem(NOTICE_CACHE_KEY, JSON.stringify(list || [])); }
  catch (e) { console.warn("공지 캐시 저장 실패", e); }
}

function readNoticeCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(NOTICE_CACHE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function getSharePage(type) {
  const valid = ["main","emergency","hygiene","hr","sales","discipline"];
  type = String(type || "main").trim();
  if (!valid.includes(type)) type = "main";
  return NOTICE_SHARE_BASE + "notice-share-" + type + ".html";
}

async function copyNoticeLink(noticeId, noticeType) {
  const shareUrl = getSharePage(noticeType) + "?id=" + encodeURIComponent(noticeId);

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
    const result = await apiPost({ action:"deleteNotice", noticeId });
    if (!result.success) throw new Error(result.message || "삭제 실패");

    noticesCache = noticesCache.filter(n => String(n.noticeId) !== String(noticeId));
    saveNoticeCache(noticesCache);
    applyNoticeFilters();
    loadNotices({ silent:true, force:true });
  } catch (err) {
    console.error(err);
    alert("삭제 중 오류가 발생했습니다.\n" + err.message);
  }
}

function formatDisplayDate(value) {
  if (!value) return "";
  const d = new Date(String(value).replace(" ", "T"));
  if (isNaN(d.getTime())) return String(value).substring(0,10).replaceAll("-", ". ") + ".";
  return d.toLocaleDateString("ko-KR", { year:"numeric", month:"2-digit", day:"2-digit" });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}

function escapeJs(value) {
  return String(value ?? "")
    .replace(/\\/g,"\\\\")
    .replace(/'/g,"\\'");
}
