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

function initTypeCards() {
  document.querySelectorAll(".type-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".type-card")
        .forEach(x => x.classList.remove("active"));

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

async function fetchJson(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    const text = await response.text();

    if (!text) {
      throw new Error("서버 응답이 비어 있습니다.");
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("JSON 아님:", text);
      throw new Error("서버 응답 형식이 올바르지 않습니다.");
    }

    return data;

  } finally {
    clearTimeout(timer);
  }
}

async function loadNotices() {
  const box = document.getElementById("noticeList");
  box.innerHTML = '<div class="loading">공지사항을 불러오는 중입니다...</div>';

  try {
    const data = await fetchJson(
      API_URL + "?action=getNotices&_=" + Date.now()
    );

    if (!data.success) {
      throw new Error(data.message || "공지 조회 실패");
    }

    ALL_NOTICES = data.notices || [];
    renderNotices(ALL_NOTICES);

  } catch (err) {
    console.error("loadNotices error:", err);

    const message =
      err.name === "AbortError"
        ? "서버 응답이 늦어 조회를 중단했습니다. 새로고침을 눌러주세요."
        : "공지사항을 불러오지 못했습니다. " + (err.message || "");

    box.innerHTML =
      '<div class="empty error-box">' +
      escapeHtml(message) +
      '<br><button type="button" onclick="loadNotices()">다시 조회</button></div>';
  }
}

function renderNotices(list) {
  const box = document.getElementById("noticeList");

  if (!list.length) {
    box.innerHTML = '<div class="empty">등록된 공지사항이 없습니다.</div>';
    return;
  }

  box.innerHTML = list.map(n => {
    const important = n.important === "Y";
    const type = normalizeNoticeType(n.noticeType, n.category);
    const meta = TYPE_META[type] || TYPE_META.main;
    const image = getNoticeImage(type);

    return `
      <article class="notice-item">
        <div class="notice-thumb">
          <img src="${image}" alt="${escapeHtml(meta.label)} 대표 이미지">
        </div>

        <div class="notice-body">
          <div class="notice-top">
            <div class="notice-badges">
              <span class="badge">${meta.icon} ${escapeHtml(meta.label)}</span>
              ${important ? '<span class="badge important">중요</span>' : ''}
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

async function saveNotice() {
  const category = document.getElementById("category").value;
  const target = document.getElementById("target").value;
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const expireDate = document.getElementById("expireDate").value;
  const important = document.getElementById("important").value;
  const writer = document.getElementById("writer").value.trim() || "관리자";
  const noticeType = document.getElementById("noticeType").value;
  const fileUrl = document.getElementById("fileUrl").value.trim();
  const btn = document.getElementById("saveBtn");

  if (!title) {
    alert("제목을 입력하세요.");
    document.getElementById("title").focus();
    return;
  }

  if (!content) {
    alert("공지 내용을 입력하세요.");
    document.getElementById("content").focus();
    return;
  }

  if (btn.disabled) return;

  try {
    btn.disabled = true;
    btn.querySelector("b").textContent = "등록 중...";
    btn.querySelector("span").textContent = "잠시만 기다려주세요";

    const data = await fetchJson(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "saveNotice",
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
    }, 15000);

    if (!data.success) {
      throw new Error(data.message || "등록 실패");
    }

    // 저장 성공 즉시 버튼과 입력창을 정상화합니다.
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("important").value = "N";
    document.getElementById("fileUrl").value = "";
    document.getElementById("expireDate").value = "";

    alert("공지사항이 등록되었습니다.");

    // 목록 갱신은 저장 성공 뒤 별도 처리
    loadNotices();

  } catch (err) {
    console.error("saveNotice error:", err);

    if (err.name === "AbortError") {
      alert("서버 응답이 늦습니다. 공지 목록을 새로고침하여 등록 여부를 먼저 확인해주세요.");
    } else {
      alert("공지 등록 중 오류가 발생했습니다.\n" + (err.message || ""));
    }
  } finally {
    btn.disabled = false;
    btn.querySelector("b").textContent = "공지 등록";
    btn.querySelector("span").textContent = "선택한 유형으로 직원에게 전달";
  }
}

async function deleteNotice(noticeId) {
  if (!confirm("이 공지사항을 삭제할까요?")) return;

  try {
    const data = await fetchJson(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "deleteNotice",
        noticeId
      })
    });

    if (!data.success) {
      throw new Error(data.message || "삭제 실패");
    }

    alert("삭제되었습니다.");
    loadNotices();

  } catch (err) {
    alert("삭제 중 오류가 발생했습니다.\n" + (err.message || ""));
  }
}

function normalizeNoticeType(type, category) {
  if (TYPE_META[type]) return type;

  const map = {
    "공지사항":"main",
    "일반공지":"main",
    "긴급공지":"emergency",
    "위생점검안내":"hygiene",
    "인사공지":"hr",
    "매출공지":"sales",
    "인사복무":"discipline"
  };

  return map[String(category || "").trim()] || "main";
}

function getNoticeImage(type) {
  const base =
    "https://thebigkorea.github.io/thebigkorea-hq/images/";

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

function copyNoticeLink(noticeId) {
  const notice =
    ALL_NOTICES.find(n => String(n.noticeId) === String(noticeId));

  if (!notice) {
    alert("공지 정보를 찾을 수 없습니다.");
    return;
  }

  // 안정화 버전에서는 GitHub 공지 상세주소를 사용합니다.
  const url =
    "https://thebigkorea.github.io/thebigkorea-hq/notice-view.html?id=" +
    encodeURIComponent(noticeId);

  const text = `${notice.title}\n\n${url}`;

  navigator.clipboard.writeText(text)
    .then(() => alert("공지 링크가 복사되었습니다."))
    .catch(() => prompt("아래 내용을 복사하세요.", text));
}

function openAttachment(url) {
  if (url) window.open(url, "_blank", "noopener");
}

function formatDate(value) {
  if (!value) return "";

  const d = new Date(value);

  if (isNaN(d.getTime())) return value;

  return d.toLocaleDateString("ko-KR", {
    year:"numeric",
    month:"2-digit",
    day:"2-digit"
  });
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeJs(str) {
  return String(str || "")
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'")
    .replaceAll("\r", "")
    .replaceAll("\n", "\\n");
}
