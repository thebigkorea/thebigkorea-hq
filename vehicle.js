const API_URL =
"https://script.google.com/macros/s/AKfycbzD9fUFvLxl6-cZGm6IUslFQrZDJk3P6Ip8to2NEWiktC2HR9a9VPFK-fNlxdcc_yg/exec";

document.addEventListener("DOMContentLoaded", function () {
  setToday();
  loadVehicles();
  loadDashboard();
  loadLogs();
});

function setToday() {
  const today = new Date().toISOString().split("T")[0];

  const ids = [
    "useDate",
    "maintenanceDate",
    "nextDate",
    "accidentDate",
    "expenseUseDate",
    "insuranceEndDate"
  ];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = today;
  });
}

function showTab(id) {
  document.querySelectorAll(".panel").forEach(panel => {
    panel.classList.remove("active");
  });

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  event.target.classList.add("active");
}

async function loadVehicles() {
  try {
    const res = await fetch(API_URL + "?action=getVehicles");
    const data = await res.json();

    if (!data.success) return;

    const selects = [
      document.getElementById("carNumber"),
      document.getElementById("maintenanceCarNumber"),
      document.getElementById("accidentCarNumber"),
      document.getElementById("expenseCarNumber"),
      document.getElementById("reserveCarNumber")
    ];

    selects.forEach(select => {
      if (!select) return;

      select.innerHTML = `
        <option value="">차량 선택</option>
      `;

      data.vehicles.forEach(vehicle => {
        const option = document.createElement("option");

        option.value = vehicle.carNumber;
        option.textContent =
          vehicle.carNumber + " / " + vehicle.carModel;

        select.appendChild(option);
      });
    });

  } catch (err) {
    console.log(err);
  }
}

async function saveVehicle() {
  const body = {
    action: "saveVehicle",
    carNumber: value_("newCarNumber"),
    carModel: value_("carModel"),
    manager: value_("manager"),
    insuranceCompany: value_("insuranceCompany"),
    insuranceEndDate: value_("insuranceEndDate"),
    maintenanceKm: value_("maintenanceKm"),
    currentKm: value_("currentKm"),
    isActive: value_("isActive"),
    memo: value_("vehicleMemo")
  };

  await postData(body, "차량이 등록되었습니다.");

  clearVehicleForm();
  loadVehicles();
}

async function saveVehicleLog() {
  const body = {
    action: "saveVehicleLog",
    useDate: value_("useDate"),
    driver: value_("driver"),
    carNumber: value_("carNumber"),
    purpose: value_("purpose"),
    destination: value_("destination"),
    startKm: value_("startKm"),
    endKm: value_("endKm"),
    fuelCost: value_("fuelCost"),
    parkingCost: value_("parkingCost"),
    tollCost: value_("tollCost"),
    memo: value_("memo")
  };

  await postData(body, "운행일지가 저장되었습니다.");

  clearLogForm();
  loadDashboard();
  loadLogs();
}

async function saveMaintenance() {
  const body = {
    action: "saveMaintenance",
    carNumber: value_("maintenanceCarNumber"),
    maintenanceDate: value_("maintenanceDate"),
    item: value_("maintenanceItem"),
    company: value_("maintenanceCompany"),
    cost: value_("maintenanceCost"),
    nextDate: value_("nextDate"),
    memo: value_("maintenanceMemo")
  };

  await postData(body, "정비내역이 저장되었습니다.");
}

async function saveAccident() {
  const body = {
    action: "saveAccident",
    accidentDate: value_("accidentDate"),
    carNumber: value_("accidentCarNumber"),
    driver: value_("accidentDriver"),
    place: value_("accidentPlace"),
    content: value_("accidentContent"),
    insuranceNo: value_("insuranceNo"),
    status: value_("accidentStatus"),
    memo: value_("accidentMemo")
  };

  await postData(body, "사고내역이 저장되었습니다.");
}

async function saveExpense() {
  const body = {
    action: "saveExpense",
    useDate: value_("expenseUseDate"),
    carNumber: value_("expenseCarNumber"),
    item: value_("expenseItem"),
    amount: value_("expenseAmount"),
    payment: value_("payment"),
    memo: value_("expenseMemo")
  };

  await postData(body, "비용내역이 저장되었습니다.");
}

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

async function loadLogs() {
  try {
    const res = await fetch(API_URL + "?action=getVehicleLogs");
    const data = await res.json();

    if (!data.success) return;

    const container = document.getElementById("logList");

    container.innerHTML = "";

    if (!data.logs.length) {
      container.innerHTML = `
        <div class="empty">
          아직 등록된 운행내역이 없습니다.
        </div>
      `;
      return;
    }

    data.logs.forEach(log => {
      const div = document.createElement("div");

      div.className = "log-item";

      div.innerHTML = `
        <div class="log-top">
          <div class="log-car">
            ${log.carNumber}
          </div>

          <div class="log-date">
            ${log.useDate}
          </div>
        </div>

        <div class="log-body">
          <div>운전자 : ${log.driver}</div>
          <div>목적 : ${log.purpose}</div>
          <div>방문처 : ${log.destination}</div>
          <div>운행거리 : ${number_(log.distance)} km</div>
          <div>주유비 : ${number_(log.fuelCost)} 원</div>
          <div>주차비 : ${number_(log.parkingCost)} 원</div>
        </div>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.log(err);
  }
}

async function postData(body, successMessage) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (data.success) {
      alert(successMessage);
    } else {
      alert(data.message || "오류가 발생했습니다.");
    }

  } catch (err) {
    console.log(err);
    alert("서버 연결 실패");
  }
}

function value_(id) {
  return document.getElementById(id)?.value || "";
}

function number_(num) {
  return Number(num || 0).toLocaleString();
}

function clearVehicleForm() {
  [
    "newCarNumber",
    "carModel",
    "manager",
    "insuranceCompany",
    "maintenanceKm",
    "currentKm",
    "vehicleMemo"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

function clearLogForm() {
  [
    "driver",
    "purpose",
    "destination",
    "startKm",
    "endKm",
    "fuelCost",
    "parkingCost",
    "tollCost",
    "memo"
  ].forEach(id => {
    const el = document.getElementById(id);

    if (el) {
      if (
        id === "fuelCost" ||
        id === "parkingCost" ||
        id === "tollCost"
      ) {
        el.value = 0;
      } else {
        el.value = "";
      }
    }
  });
}
async function saveReservation() {

  const body = {
    action: "saveReservation",
    reserveDate: value_("reserveDate"),
    startTime: value_("reserveStartTime"),
    endTime: value_("reserveEndTime"),
    userName: value_("reserveUserName"),
    carNumber: value_("reserveCarNumber"),
    purpose: value_("reservePurpose"),
    destination: value_("reserveDestination"),
    memo: value_("reserveMemo"),
    status: "예약"
  };

  await postData(body, "차량 예약이 저장되었습니다.");

  [
    "reserveUserName",
    "reservePurpose",
    "reserveDestination",
    "reserveStartTime",
    "reserveEndTime",
    "reserveMemo"
  ].forEach(id => {

    const el = document.getElementById(id);

    if (el) el.value = "";
  });
}