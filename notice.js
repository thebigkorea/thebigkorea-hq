const API_URL =
  "https://script.google.com/macros/s/AKfycby8SCh-WsBXjBp1V-WsVKomUSWxlsWsnCUIMtNA8xTCNcnOqVGaQ-GCvyNY7XnzoLGgug/exec";

let ALL_NOTICES = [];

document.addEventListener("DOMContentLoaded", () => {
  initNoticeTypeCards();
  loadNotices();
});

function initNoticeTypeCards() {
  const cards = document.querySelectorAll(".type-card");
  const categoryInput = document.getElementById("category");
  const typeInput = document.getElementById("noticeType");
  const selectedText = document.getElementById("selectedTypeText");

  if (!cards.length) {
    console.warn("공지 유형 카드를 찾을 수 없습니다.");
    return;
  }

  cards.forEach(card => {
    card.addEventListener("click", function () {
      cards.forEach(item => item.classList.remove("active"));
      this.classList.add("active");

      const category = this.dataset.category || "공지사항";
      const type = this.dataset.type || "main";
      const title = this.querySelector("b");

      if (categoryInput) categoryInput.value = category;
      if (typeInput) typeInput.value = type;

      if (selectedText) {
        selectedText.textContent = title ? title.textContent : category;
      }
    });
  });
}

async function loadNotices() {
  const box = document.getElementById("noticeList");

  if (!box) return;

  box.innerHTML =
    '<div class="loading">공지사항을 불러오는 중입니다...</div>';

  try {
    const res = await fetch(
      API_URL + "?action=getNotices&_=" + Date.now(),
      { cache: "no-store" }
    );

    const data = await res.json();

    if (!data.success) {
      box.innerHTML =
        '<div class="loading">공지사항을 불러오지 못했습니다.</div>';
      return;
    }

    ALL_NOTICES = Array.isArray(data.notices) ? data.notices : [];
    renderNotices(ALL_NOTICES);

  } catch (err) {
    console.error(err);

    box.innerHTML =
      '<div class="loading">서버 연결 오류가 발생했습니다.</div>';
  }
}

function renderNotices(list) {
  const box = document.getElementById("noticeList");

  if (!box) return;

  if (!list.length) {
    box.innerHTML =
      '<div class="loading">등록된 공지사항이 없습니다.</div>';
    return;
  }

  box.innerHTML = list.map(n => {
    const important = String(n.important || "") === "Y";
    const imageUrl = n.imageUrl || getNoticeImage(n.noticeType);

    return `
      <article class="notice-item">
        <div class="notice-thumb">
          <img src="${escapeAttr(imageUrl)}"
               alt="${escapeAttr(n.category || "공지사항")}">
        </div>

        <div class="notice-main">
          <div class="notice-top">
            <span class="badge ${important ? "red" : ""}">
              ${important ? "중요" : escapeHtml(n.category)}
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
            대상 ${escapeHtml(n.target)}
            &nbsp; 작성자 ${escapeHtml(n.writer)}
            ${n.expireDate ? "&nbsp; 종료 " + escapeHtml(n.expireDate) : ""}
          </div>

          <div class="notice-buttons">
            <button type="button"
                    class="view-btn"
                    onclick="openNotice('${escapeJs(n.noticeId)}')">
              공지 확인하기
            </button>

            ${n.fileUrl ? `
              <button type="button"
                      class="file-link-btn"
                      onclick="window.open('${escapeJs(n.fileUrl)}','_blank','noopener')">
                📎 첨부파일
              </button>
            ` : ""}

            <button type="button"
                    class="kakao-btn"
                    onclick="copyNoticeLink('${escapeJs(n.noticeId)}')">
              링크 복사
            </button>

            <button type="button"
                    class="delete-btn"
                    onclick="deleteNotice('${escapeJs(n.noticeId)}')">
              삭제
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

async function saveNotice() {
  const category =
    document.getElementById("category").value;

  const noticeType =
    document.getElementById("noticeType").value;

  const target =
    document.getElementById("target").value;

  const title =
    document.getElementById("title").value.trim();

  const content =
    document.getElementById("content").value.trim();

  const expireDate =
    document.getElementById("expireDate").value;

  const important =
    document.getElementById("important").value;

  const writer =
    document.getElementById("writer").value.trim() || "관리자";

  const fileUrl =
    document.getElementById("fileUrl").value.trim();

  const saveBtn =
    document.getElementById("saveBtn");

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

  if (fileUrl && !/^https?:\/\//i.test(fileUrl)) {
    alert("첨부파일 링크를 확인해 주세요.");
    document.getElementById("fileUrl").focus();
    return;
  }

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML =
      "<b>등록 중...</b><span>잠시 기다려주세요</span>";
  }

  try {
    const res = await fetch(API_URL, {
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
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "등록 실패");
      return;
    }

    alert("공지사항이 등록되었습니다.");

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("important").value = "N";
    document.getElementById("fileUrl").value = "";
    document.getElementById("expireDate").value = "";

    await loadNotices();

  } catch (err) {
    console.error(err);

    alert(
      "서버 응답을 확인하지 못했습니다. 공지 목록을 새로고침하여 등록 여부를 확인해주세요."
    );

    await loadNotices();

  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML =
        "<b>공지 등록</b><span>선택한 유형으로 직원에게 전달</span>";
    }
  }
}

async function deleteNotice(noticeId) {
  if (!confirm("이 공지사항을 삭제할까요?")) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "deleteNotice",
        noticeId
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("삭제되었습니다.");
      await loadNotices();
    } else {
      alert(data.message || "삭제 실패");
    }

  } catch (err) {
    console.error(err);
    alert("서버 연결 오류가 발생했습니다.");
  }
}

function openNotice(noticeId) {
  const url =
    "https://thebigkorea.github.io/thebigkorea-hq/notice-view.html?id=" +
    encodeURIComponent(noticeId);

  window.open(url, "_blank", "noopener");
}

function copyNoticeLink(noticeId) {
  const notice =
    ALL_NOTICES.find(n => String(n.noticeId) === String(noticeId));

  if (!notice) {
    alert("공지 정보를 찾을 수 없습니다.");
    return;
  }

  const url =
    "https://thebigkorea.github.io/thebigkorea-hq/notice-view.html?id=" +
    encodeURIComponent(noticeId);

  const text =
`${notice.title}

${url}`;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("공지 링크가 복사되었습니다.");
      })
      .catch(() => {
        prompt("아래 내용을 복사하세요.", text);
      });
  } else {
    prompt("아래 내용을 복사하세요.", text);
  }
}

function getNoticeImage(type) {
  const base =
    "https://thebigkorea.github.io/thebigkorea-hq/images/";

  const files = {
    main: "notice-main.png",
    emergency: "notice-emergency.png",
    hygiene: "notice-hygiene.png",
    hr: "notice-hr.png",
    sales: "notice-sales.png",
    discipline: "notice-discipline.png"
  };

  return base + (files[type] || files.main);
}

function formatDate(value) {
  if (!value) return "";

  const d = new Date(value);

  if (isNaN(d.getTime())) {
    return String(value);
  }

  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
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

function escapeAttr(str) {
  return escapeHtml(str);
}

function escapeJs(str) {
  return String(str || "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\r/g, "")
    .replace(/\n/g, "\\n");
}
