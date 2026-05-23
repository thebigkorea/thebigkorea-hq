const API_URL =
"https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec";

let ALL_LOGS = [];
let ALL_RESERVATIONS = [];

document.addEventListener("DOMContentLoaded", function () {
  loadDashboard();
  loadVehicles();
  loadLogs();
  loadReservations();

  document
    .getElementById("searchInput")
    .addEventListener("input", searchLogs);
});

async function loadDashboard() {
  try {
    const res = await fetch(API_URL + "?action=getDashboard");
    const data = await res.json();

    if (!data.success) return;

    document.getElementById("totalLogs").textContent =
      number_(data.totalLogs);

    document.getElementById("totalDistance").textContent =
      number_(data.totalDistance) + " km";

    document.getElementById("totalCost").textContent =
      number_(data.totalCost) + " 원";

  } catch (err) {
    console.log(err);
  }
}

async function loadVehicles() {
  try {
    const res = await fetch(API_URL + "?action=getVehicles");
    const data = await res.json();

    if (!data.success) return;

    document.getElementById("vehicleCount").textContent =
      number_(data.vehicles.length);

    const tbody = document.getElementById("vehicleTable");

    tbody.innerHTML = "";

    if (!data.vehicles.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty">
            등록된 차량이 없습니다.
          </td>
        </tr>
      `;
      return;
    }

    data.vehicles.forEach(vehicle => {

      const statusClass =
        vehicle.isActive === "사용"
          ? "active"
          : "stop";

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${vehicle.carNumber}</td>
        <td>${vehicle.carModel}</td>
        <td>${vehicle.manager}</td>
        <td>${vehicle.insuranceCompany}</td>
        <td>${vehicle.insuranceEndDate}</td>
        <td>${number_(vehicle.currentKm)} km</td>
        <td>
          <span class="status ${statusClass}">
            ${vehicle.isActive}
          </span>
        </td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.log(err);
  }
}

async function loadLogs() {
  try {
    const res = await fetch(API_URL + "?action=getVehicleLogs");
    const data = await res.json();

    if (!data.success) return;

    ALL_LOGS = data.logs || [];

    renderLogs(ALL_LOGS);

  } catch (err) {
    console.log(err);
  }
}

function renderLogs(logs) {

  const tbody = document.getElementById("logTable");

  tbody.innerHTML = "";

  if (!logs.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="empty">
          운행내역이 없습니다.
        </td>
      </tr>
    `;
    return;
  }

  logs.forEach(log => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${log.useDate}</td>
      <td>${log.carNumber}</td>
      <td>${log.driver}</td>
      <td>${log.purpose}</td>
      <td>${log.destination}</td>
      <td>${number_(log.distance)} km</td>
      <td>${number_(log.fuelCost)} 원</td>
      <td>${number_(log.parkingCost)} 원</td>
      <td>${number_(log.tollCost)} 원</td>
    `;

    tbody.appendChild(tr);
  });
}

function searchLogs() {

  const keyword =
    document
      .getElementById("searchInput")
      .value
      .trim()
      .toLowerCase();

  if (!keyword) {
    renderLogs(ALL_LOGS);
    return;
  }

  const filtered = ALL_LOGS.filter(log => {

    return (
      String(log.carNumber).toLowerCase().includes(keyword) ||
      String(log.driver).toLowerCase().includes(keyword) ||
      String(log.destination).toLowerCase().includes(keyword) ||
      String(log.purpose).toLowerCase().includes(keyword)
    );
  });

  renderLogs(filtered);
}

function number_(num) {
  return Number(num || 0).toLocaleString();
}
async function loadReservations() {
  try {
    const res = await fetch(API_URL + "?action=getReservations");
    const data = await res.json();

    if (!data.success) return;

    ALL_RESERVATIONS = data.reservations || [];

    renderTodayReservations();

  } catch (err) {
    console.log(err);
  }
}

function renderTodayReservations() {
  const tbody = document.getElementById("todayReservationTable");
  if (!tbody) return;

  const today = new Date().toISOString().split("T")[0];

  const todayList = ALL_RESERVATIONS.filter(row => {
    return String(row.reserveDate) === String(today);
  });

  tbody.innerHTML = "";

  if (!todayList.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty">
          오늘 예약된 차량이 없습니다.
        </td>
      </tr>
    `;
    return;
  }

  todayList.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.reserveDate}</td>
      <td>${row.startTime} ~ ${row.endTime}</td>
      <td>${row.carNumber}</td>
      <td>${row.userName}</td>
      <td>${row.purpose}</td>
      <td>${row.destination}</td>
      <td>${row.status}</td>
    `;

    tbody.appendChild(tr);
  });
}