const API_URL =
"https://script.google.com/macros/s/AKfycby8SCh-WsBXjBp1V-WsVKomUSWxlsWsnCUIMtNA8xTCNcnOqVGaQ-GCvyNY7XnzoLGgug/exec";

const NOTICE_VIEW_BASE =
"https://thebigkorea.github.io/thebigkorea-hq/notice-view.html";

const NOTICE_SHARE_BASE =
"https://thebigkorea.github.io/thebigkorea-hq/";

const NOTICE_CACHE_KEY = "thebigkorea_notice_cache_v2";
const NOTICE_CACHE_TIME_KEY = "thebigkorea_notice_cache_time_v2";
const NOTICE_CACHE_MAX_AGE = 24 * 60 * 60 * 1000;

let selectedCategory = "공지사항";
let selectedNoticeType = "main";
let noticesCache = [];

document.addEventListener("DOMContentLoaded", () => {
  bindTypeCards();
  bindSearch();

  // 1. 저장된 목록이 있으면 즉시 표시
  const cached = readNoticeCache();
  if (cached.length) {
    noticesCache = cached;
    updateStats();
    applyFilters();
  }

  // 2. 서버 최신 데이터는 뒤에서 갱신
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
      if (textEl) {
        textEl.textContent =
          card.querySelector("b")?.textContent || selectedCategory;
      }
    });
  });
}

function bindSearch() {
  ["noticeSearch","typeFilter","statusFilter"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(id === "noticeSearch" ? "input" : "change", applyFilters);
  });
}

function normalizeNoticeType(n){
  const t=String(n.noticeType||"").trim();
  if(t) return t;
  const c=String(n.category||"").trim();
  if(c.includes("긴급")) return "emergency";
  if(c.includes("위생")) return "hygiene";
  if(c.includes("인사복무")||c.includes("복무")) return "discipline";
  if(c.includes("인사")) return "hr";
  if(c.includes("매출")) return "sales";
  return "main";
}

function parseDateOnly(v){
  if(!v) return null;
  const raw=String(v).trim();
  const m=raw.match(/(\d{4})[-./년\s]+(\d{1,2})[-./월\s]+(\d{1,2})/);
  if(m) return new Date(+m[1],+m[2]-1,+m[3],23,59,59,999);
  const d=new Date(raw); return isNaN(d)?null:d;
}
function isExpired(n){const d=parseDateOnly(n.expireDate);return d ? d < new Date() : false;}
function applyFilters(){
  const type=document.getElementById("typeFilter")?.value||"";
  const q=(document.getElementById("noticeSearch")?.value||"").trim().toLowerCase();
  const status=document.getElementById("statusFilter")?.value||"active";
  const filtered=noticesCache.filter(n=>{
    const typeOK=!type||normalizeNoticeType(n)===type;
    const titleOK=!q||String(n.title||"").toLowerCase().includes(q);
    const expired=isExpired(n);
    const statusOK=status==="all"||(status==="expired"?expired:!expired);
    return typeOK&&titleOK&&statusOK;
  });
  renderNotices(filtered);
  const count=document.getElementById("resultCount"); if(count) count.textContent=filtered.length+"건";
}
function updateStats(){
  const now=new Date(), y=now.getFullYear(), m=now.getMonth();
  const set=(id,n)=>{const e=document.getElementById(id);if(e)e.textContent=n+"건"};
  set("statTotal",noticesCache.length);
  set("statActive",noticesCache.filter(n=>!isExpired(n)).length);
  set("statExpired",noticesCache.filter(isExpired).length);
  set("statImportant",noticesCache.filter(n=>String(n.important||"").toUpperCase()==="Y").length);
  set("statFiles",noticesCache.filter(n=>String(n.fileUrl||"").trim()).length);
  set("statMonth",noticesCache.filter(n=>{const d=new Date(String(n.createdAt||"").replace(" ","T"));return !isNaN(d)&&d.getFullYear()===y&&d.getMonth()===m}).length);
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

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("fileUrl").value = "";

    // 서버 최신 목록을 받아 캐시까지 즉시 교체
    await loadNotices({ silent: true, force: true });

    alert("공지사항이 등록되었습니다.");

  } catch (err) {
    console.error(err);
    alert("공지 등록 중 오류가 발생했습니다.\n" + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML =
        "<b>공지 등록</b><span>선택한 유형으로 직원에게 전달</span>";
    }
  }
}

async function loadNotices(options = {}) {
  const { silent = false, force = false } = options;

  const listEl = document.getElementById("noticeList");
  if (!listEl) return;

  // 수동 새로고침일 경우 기존 목록은 그대로 두고 버튼만 표시
  const refreshBtn = document.querySelector(".refresh-btn");

  if (!silent && !noticesCache.length) {
    listEl.innerHTML =
      '<div class="loading">공지사항을 불러오는 중입니다...</div>';
  }

  if (refreshBtn) {
    refreshBtn.disabled = true;
    refreshBtn.dataset.oldText = refreshBtn.textContent;
    refreshBtn.textContent = "↻ 갱신 중";
  }

  try {
    // Date.now()를 URL에 매번 붙이지 않는다.
    // force일 때만 브라우저 캐시를 피한다.
    const url =
      API_URL +
      "?action=getNotices" +
      (force ? "&refresh=1" : "");

    const response = await fetch(url, {
      cache: force ? "no-store" : "default"
    });

    if (!response.ok) {
      throw new Error("서버 응답 오류: " + response.status);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "공지 조회 실패");
    }

    noticesCache = Array.isArray(data.notices) ? data.notices : [];

    saveNoticeCache(noticesCache);
    updateStats();
    applyFilters();

  } catch (err) {
    console.error(err);

    // 캐시가 있으면 서버 오류가 나도 기존 공지는 그대로 유지
    if (!noticesCache.length) {
      const cached = readNoticeCache();

      if (cached.length) {
        noticesCache = cached;
        renderNotices(noticesCache);
      } else {
        listEl.innerHTML =
          '<div class="loading">서버 연결 오류가 발생했습니다.</div>';
      }
    }
  } finally {
    if (refreshBtn) {
      refreshBtn.disabled = false;
      refreshBtn.textContent =
        refreshBtn.dataset.oldText || "↻ 새로고침";
    }
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
             src="${escapeHtml(n.imageUrl || getFallbackImage(n))}"
             alt="${escapeHtml(n.category || "공지")}"
             loading="lazy"
             decoding="async">

        <div class="notice-info">

          <div class="notice-topline">
            <span class="notice-badge">
              ${escapeHtml(n.category || "공지사항")}
            </span>

            ${
              String(n.important || "").toUpperCase() === "Y"
                ? '<span class="notice-badge important-badge">중요</span>'
                : ""
            }

            <span class="notice-date">
              ${escapeHtml(formatDisplayDate(n.createdAt))}
            </span>
          </div>

          <h3>${escapeHtml(n.title || "")}</h3>

          <p>${escapeHtml(n.content || "")}</p>

          <div class="notice-meta">
            <span class="meta-item">♙ 대상 ${escapeHtml(n.target || "전체 직원")}</span>
            <span class="meta-item">♙ 작성자 ${escapeHtml(n.writer || "관리자")}</span>
            ${
              n.expireDate
                ? '<span class="meta-item">▣ 종료 ' +
                  escapeHtml(n.expireDate) +
                  "</span>"
                : ""
            }
          </div>

        </div>

        <div class="notice-actions">

          <a class="action-btn primary-action"
             href="${viewUrl}"
             target="_blank"
             rel="noopener">
            ◉ 공지 확인하기 ›
          </a>

          <div class="secondary-actions">

            ${
              n.fileUrl
                ? `
                  <a class="action-btn"
                     href="${escapeHtml(n.fileUrl)}"
                     target="_blank"
                     rel="noopener">
                    📎 첨부파일
                  </a>
                `
                : ""
            }

            <button type="button"
                    class="action-btn"
                    onclick="copyNoticeLink('${escapeJs(n.noticeId)}','${escapeJs(n.noticeType)}')">
              🔗 링크 복사
            </button>

            <button type="button" class="action-btn reregister-action" onclick="reRegisterNotice('${escapeJs(n.noticeId)}')">↻ 수정·재등록</button>

            <button type="button"
                    class="action-btn delete-action"
                    onclick="deleteNotice('${escapeJs(n.noticeId)}')">
              🗑 삭제
            </button>

          </div>

        </div>

      </article>
    `;
  }).join("");
}

function saveNoticeCache(list) {
  try {
    localStorage.setItem(NOTICE_CACHE_KEY, JSON.stringify(list || []));
    localStorage.setItem(NOTICE_CACHE_TIME_KEY, String(Date.now()));
  } catch (e) {
    console.warn("공지 캐시 저장 실패", e);
  }
}

function readNoticeCache() {
  try {
    const raw = localStorage.getItem(NOTICE_CACHE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (e) {
    console.warn("공지 캐시 읽기 실패", e);
    return [];
  }
}

function clearNoticeCache() {
  try {
    localStorage.removeItem(NOTICE_CACHE_KEY);
    localStorage.removeItem(NOTICE_CACHE_TIME_KEY);
  } catch (e) {}
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

    // 화면에서 먼저 제거해 즉각 반응하게 함
    noticesCache = noticesCache.filter(
      n => String(n.noticeId) !== String(noticeId)
    );

    saveNoticeCache(noticesCache);
    updateStats();
    applyFilters();

    // 서버 데이터도 뒤에서 한 번 동기화
    loadNotices({ silent: true, force: true });

  } catch (err) {
    console.error(err);
    alert("삭제 중 오류가 발생했습니다.\n" + err.message);
  }
}

function getFallbackImage(n){
  const base="https://thebigkorea.github.io/thebigkorea-hq/images/";
  const files={main:"notice-main.png",emergency:"notice-emergency.png",hygiene:"notice-hygiene.png",hr:"notice-hr.png",sales:"notice-sales.png",discipline:"notice-discipline.png"};
  return base+(files[normalizeNoticeType(n)]||files.main);
}
function reRegisterNotice(noticeId){
  const n=noticesCache.find(x=>String(x.noticeId)===String(noticeId)); if(!n)return;
  const type=normalizeNoticeType(n);
  const card=document.querySelector(`.type-card[data-type="${type}"]`); if(card)card.click();
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v||""};
  set("target",n.target||"전체 직원");set("important",n.important||"N");set("title",n.title);set("content",n.content);set("fileUrl",n.fileUrl);set("writer",n.writer||"관리자");
  set("expireDate","");
  document.querySelector(".content-panel")?.scrollIntoView({behavior:"smooth",block:"start"});
  document.getElementById("title")?.focus();
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
