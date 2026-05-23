const API_URL =
"https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec";

let ALL_TRIPS = [];

document.addEventListener("DOMContentLoaded", function () {
  loadTrips();
});

async function loadTrips() {
  try {
    const res = await fetch(API_URL + "?action=getTrips");
    const data = await res.json();

    if (!data.success) return;

    ALL_TRIPS = data.trips || [];

    renderExpenses();
    updateExpenseSummary();

  } catch (err) {
    console.log(err);
  }
}

function renderExpenses() {
  const tbody = document.getElementById("expenseTable");
  tbody.innerHTML = "";

  if (!ALL_TRIPS.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="11" class="empty">
          이동비 내역이 없습니다.
        </td>
      </tr>
    `;
    return;
  }

  ALL_TRIPS.forEach(trip => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${trip.tripDate || ""}</td>
      <td>${trip.userName || ""}</td>
      <td>${trip.department || ""}</td>
      <td>${trip.transportType || ""}</td>
      <td>${trip.carNumber || ""}</td>
      <td>${trip.destination || ""}</td>
      <td>${number_(trip.fuelCost)} 원</td>
      <td>${number_(trip.tollCost)} 원</td>
      <td>${number_(trip.parkingCost)} 원</td>
      <td>${number_(trip.distance)} km</td>
      <td>${trip.status || ""}</td>
    `;

    tbody.appendChild(tr);
  });
}

function updateExpenseSummary() {
  let fuel = 0;
  let toll = 0;
  let parking = 0;

  ALL_TRIPS.forEach(trip => {
    fuel += Number(trip.fuelCost || 0);
    toll += Number(trip.tollCost || 0);
    parking += Number(trip.parkingCost || 0);
  });

  document.getElementById("totalFuelCost").textContent =
    number_(fuel) + " 원";

  document.getElementById("totalTollCost").textContent =
    number_(toll) + " 원";

  document.getElementById("totalParkingCost").textContent =
    number_(parking) + " 원";
}

function number_(num) {
  return Number(num || 0).toLocaleString();
}