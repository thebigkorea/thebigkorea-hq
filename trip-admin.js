const API_URL =
"https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec";

let ALL_TRIPS = [];

document.addEventListener("DOMContentLoaded", function () {
  loadTrips();
});

async function loadTrips() {

  try {

    const res =
      await fetch(API_URL + "?action=getTrips");

    const data = await res.json();

    if (!data.success) return;

    ALL_TRIPS = data.trips || [];

    renderTrips();

    updateSummary();

  } catch (err) {

    console.log(err);
  }
}

function renderTrips() {

  const tbody =
    document.getElementById("tripTable");

  tbody.innerHTML = "";

  if (!ALL_TRIPS.length) {

    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="empty">
          출장 신청내역이 없습니다.
        </td>
      </tr>
    `;

    return;
  }

  ALL_TRIPS.forEach(trip => {

    const statusClass =
      trip.status === "승인"
        ? "approved"
        : "pending";

    const tr =
      document.createElement("tr");

    tr.innerHTML = `
      <td>${trip.tripDate}</td>
      <td>${trip.userName}</td>
      <td>${trip.department}</td>
      <td>${trip.carNumber}</td>
      <td>${trip.destination}</td>
      <td>${trip.purpose}</td>
      <td>${trip.startTime} ~ ${trip.endTime}</td>

      <td>
        <span class="status ${statusClass}">
          ${trip.status}
        </span>
      </td>

      <td>

        ${
          trip.status === "승인"
          ? `
            승인완료
          `
          : `
            <div class="action-buttons">

              <button
                class="btn approve"
                onclick="approveTrip('${trip.id}')">
                승인
              </button>

            </div>
          `
        }

      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function approveTrip(id){

  if(!id){
    alert("출장 ID가 없습니다.");
    return;
  }

  const res = await fetch(API_URL,{
    method:"POST",
    body:JSON.stringify({
      action:"approveTrip",
      tripId:id
    })
  });

  const result = await res.json();

  if(result.success){
    alert("출장 승인 완료");
    loadTrips();
  }else{
    alert(result.message || "승인 실패");
  }
}

function updateSummary() {

  document.getElementById("totalTrips").textContent =
    number_(ALL_TRIPS.length);

  const pending =
    ALL_TRIPS.filter(row => {
      return row.status !== "승인";
    }).length;

  const approved =
    ALL_TRIPS.filter(row => {
      return row.status === "승인";
    }).length;

  document.getElementById("pendingTrips").textContent =
    number_(pending);

  document.getElementById("approvedTrips").textContent =
    number_(approved);
}

function number_(num) {

  return Number(num || 0).toLocaleString();
}