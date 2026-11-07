const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

const icons = {
  "Hair wash": "droplet", "Gentle wash": "droplet", "Conditioning": "droplet-half",
  "Scalp oil": "flower1", "Hair mask": "stars", "Scalp massage": "hand-index"
};
const activities = {
  "2026-05-09": [{ name: "Scalp oil", time: "8:00 PM", done: false }],
  "2026-05-12": [{ name: "Hair mask", time: "6:30 PM", done: false }],
  "2026-05-14": [{ name: "Gentle wash", time: "7:30 PM", done: true }],
  "2026-05-15": [{ name: "Conditioning", time: "7:00 PM", done: false }]
};

let viewYear = 2026;
let viewMonth = 4;                 // 0 = January, so 4 = May
let selected = "2026-05-14";

const calGrid = document.getElementById("calGrid");
const calTitle = document.getElementById("calTitle");
const calCount = document.getElementById("calCount");
const dayDate = document.getElementById("dayDate");
const dayName = document.getElementById("dayName");
const dayList = document.getElementById("dayList");
const modal = document.getElementById("modal");

function pad(n) { return String(n).padStart(2, "0"); }
function makeKey(y, m, d) { return y + "-" + pad(m + 1) + "-" + pad(d); }

function renderCalendar() {
  calTitle.textContent = monthNames[viewMonth] + " " + viewYear;

  const firstDay = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  let html = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    .map(function (d) { return '<div class="cal-dow">' + d + "</div>"; }).join("");

  for (let i = 0; i < firstDay; i++) html += '<div class="cal-day empty"></div>';

  let monthTotal = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = makeKey(viewYear, viewMonth, d);
    const list = activities[key] || [];
    monthTotal += list.length;

    let dot = "";
    if (list.length > 0) {
      const allDone = list.every(function (a) { return a.done; });
      dot = '<span class="dot ' + (allDone ? "done" : "upcoming") + '"></span>';
    }
    html += '<button class="cal-day ' + (key === selected ? "selected" : "") +
            '" onclick="selectDay(\'' + key + '\')">' + d + dot + "</button>";
  }

  calGrid.innerHTML = html;
  calCount.textContent = monthTotal + " activities this month";
}

function renderDay() {
  const parts = selected.split("-");
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  dayName.textContent = date.toLocaleDateString("en-US", { weekday: "long" });
  dayDate.textContent = monthNames[date.getMonth()] + " " + date.getDate();

  const list = activities[selected] || [];
  if (list.length === 0) {
    dayList.innerHTML = '<p class="empty-day">Nothing planned for this day.</p>';
    return;
  }
  dayList.innerHTML = list.map(function (a, i) {
    return '<div class="task">' +
      '<div class="task-icon"><i class="bi bi-' + (icons[a.name] || "droplet") + '"></i></div>' +
      '<div class="task-info"><b>' + a.name + "</b><small>" + a.time + "</small></div>" +
      '<button class="tick ' + (a.done ? "on" : "") + '" onclick="toggleDone(' + i + ')">' +
      '<i class="bi bi-check2"></i></button></div>';
  }).join("");
}

function selectDay(key) {
  selected = key;
  renderCalendar();
  renderDay();
}

function toggleDone(i) {
  activities[selected][i].done = !activities[selected][i].done;
  renderCalendar();
  renderDay();
}

document.getElementById("prevBtn").addEventListener("click", function () {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  renderCalendar();
});
document.getElementById("nextBtn").addEventListener("click", function () {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  renderCalendar();
});

function openModal() {
  document.getElementById("fDate").value = selected;
  modal.classList.add("open");
}
function closeModal() { modal.classList.remove("open"); }

function formatTime(t) {
  if (!t) return "Anytime";
  const parts = t.split(":");
  let h = Number(parts[0]);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return h + ":" + parts[1] + " " + ampm;
}

document.getElementById("openModalTop").addEventListener("click", openModal);
document.getElementById("openModalDay").addEventListener("click", openModal);
document.getElementById("closeX").addEventListener("click", closeModal);
document.getElementById("cancelBtn").addEventListener("click", closeModal);
modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });

document.getElementById("addForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("fActivity").value;
  const date = document.getElementById("fDate").value;
  const time = formatTime(document.getElementById("fTime").value);

  if (!activities[date]) activities[date] = [];
  activities[date].push({ name: name, time: time, done: false });

  const p = date.split("-");
  viewYear = Number(p[0]);
  viewMonth = Number(p[1]) - 1;
  selected = date;

  renderCalendar();
  renderDay();
  closeModal();
  this.reset();
});

renderCalendar();
renderDay();