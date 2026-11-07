const chartData = {
  week:  { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], values: [100, 76, 100, 50, 84, 40, 71] },
  month: { labels: ["Week 1", "Week 2", "Week 3", "Week 4"],           values: [70, 85, 92, 82] }
};

const bars = document.getElementById("bars");
const chartTitle = document.getElementById("chartTitle");

function drawChart(mode) {
  const data = chartData[mode];
  chartTitle.textContent = mode === "week" ? "This week" : "This month";
  bars.innerHTML = data.labels.map(function (label, i) {
    return '<div class="bar-col"><div class="bar-wrap">' +
           '<div class="bar" style="height:' + data.values[i] + '%"></div></div>' +
           "<span>" + label + "</span></div>";
  }).join("");
}

document.querySelectorAll(".seg button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".seg button").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    drawChart(btn.dataset.mode);
  });
});

drawChart("week");