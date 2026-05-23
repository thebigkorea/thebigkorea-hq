const API_URL =
"https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec";

let ALL_TRIPS = [];

document.addEventListener("DOMContentLoaded", function () {

  setToday();

  loadVehicles();

  loadTrips();
});

function setToday() {

  const today =
    new Date().toISOString().split("T")[0];

  document.getElementById("tripDate").value = today;
}

async function loadVehicles() {

  try {

    const res =
      await fetch(API_URL + "?action=getVehicles");

    const data = await res.json();

    if (!data.success) return;

    const select =
      document.getElementById("carNumber");

    select.innerHTML = `
      <option value="">차량 선택</option>
    `;

    data.vehicles.forEach(vehicle => {

      const option =
        document.createElement("option");

      option.value = vehicle.carNumber;

      option.textContent =
        vehicle.carNumber + " / " + vehicle.carModel;

      select.appendChild(option);
    });

  } catch (err) {

    console.log(err);
  }
}

async function saveTrip() {

  const body = {
  action: "saveTrip",
  tripDate: value_("tripDate"),
  userName: value_("userName"),
  department: value_("department"),
  transportType: value_("transportType"),
  carNumber: value_("carNumber"),
  destination: value_("destination"),
  purpose: value_("purpose"),
  startTime: value_("startTime"),
  endTime: value_("endTime"),
  fuelCost: value_("fuelCost"),
  tollCost: value_("tollCost"),
  parkingCost: value_("parkingCost"),
  distance: value_("distance"),
  memo: value_("memo"),
  status: "출장중"
};

  try {

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (data.success) {

      alert("출장 신청이 저장되었습니다.");

      clearForm();

      loadTrips();

    } else {

      alert(data.message || "오류가 발생했습니다.");
    }

  } catch (err) {

    console.log(err);

    alert("서버 연결 실패");
  }
}

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

  const container =
    document.getElementById("tripList");

  container.innerHTML = "";

  if (!ALL_TRIPS.length) {

    container.innerHTML = `
      <div class="empty">
        출장 신청내역이 없습니다.
      </div>
    `;

    return;
  }

  ALL_TRIPS.forEach(trip => {

    const div =
      document.createElement("div");

    div.className = "trip-item";

    div.innerHTML = `
      <div class="trip-top">
        <div class="trip-name">
          ${trip.userName}
        </div>

        <div class="trip-date">
          ${trip.tripDate}
        </div>
      </div>

      <div class="trip-body">
        <div>부서 : ${trip.department}</div>
        <div>차량 : ${trip.carNumber}</div>
        <div>방문처 : ${trip.destination}</div>
        <div>출장목적 : ${trip.purpose}</div>
        <div>시간 : ${trip.startTime} ~ ${trip.endTime}</div>
        <div>상태 : ${trip.status}</div>
      </div>
    `;

    container.appendChild(div);
  });
}

function updateSummary() {

  document.getElementById("tripCount").textContent =
    number_(ALL_TRIPS.length);

  const today =
    new Date().toISOString().split("T")[0];

  const todayCount =
    ALL_TRIPS.filter(row => {
      return String(row.tripDate) === String(today);
    }).length;

  document.getElementById("todayTripCount").textContent =
    number_(todayCount);
}

function clearForm() {

  [
    "userName",
    "department",
    "destination",
    "purpose",
    "startTime",
    "endTime",
    "memo"
  ].forEach(id => {

    const el =
      document.getElementById(id);

    if (el) el.value = "";
  });
}

function value_(id) {

  return document.getElementById(id)?.value || "";
}

function number_(num) {

  return Number(num || 0).toLocaleString();
}