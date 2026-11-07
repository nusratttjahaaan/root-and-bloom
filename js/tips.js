// ---------- Tips data (fake for now; later it comes from the database) ----------
const tips = [
  { id: 1, tag: "Moisture", title: "Apply conditioner in sections",
    text: "Help every curl get the moisture it needs.", img: "login-hero.jpg", saved: false },
  { id: 2, tag: "Scalp care", title: "Use warm\u2014not hot\u2014water",
    text: "A gentler temperature can help a dry scalp feel calmer.", img: "product-2.jpg", saved: false },
  { id: 3, tag: "Routine", title: "Refresh without rewashing",
    text: "A light water mist can revive curls between wash days.", img: "product-4.jpg", saved: false },
  { id: 4, tag: "Styling", title: "Dry with less friction",
    text: "Use a soft cotton towel and avoid rough rubbing.", img: "login-hero.jpg", saved: false }
];

let category = "For you";
const grid = document.getElementById("tipsGrid");

function render() {
  const list = tips.filter(function (t) {
    return category === "For you" || t.tag === category;
  });

  grid.innerHTML = list.map(function (t) {
    return '<div class="tip-item">' +
      '<img src="images/' + t.img + '" alt="' + t.title + '">' +
      '<div class="tip-body">' +
        '<span class="tip-tag">' + t.tag + "</span>" +
        "<h4>" + t.title + "</h4>" +
        "<p>" + t.text + "</p>" +
        '<button class="save-tip ' + (t.saved ? "saved" : "") + '" onclick="toggleSave(' + t.id + ')">' +
          '<i class="bi ' + (t.saved ? "bi-heart-fill" : "bi-heart") + '"></i> ' +
          (t.saved ? "Saved" : "Save tip") +
        "</button>" +
      "</div></div>";
  }).join("");
}

function toggleSave(id) {
  const t = tips.find(function (x) { return x.id === id; });
  t.saved = !t.saved;
  render();
}

document.querySelectorAll(".filter-chip").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-chip").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    category = btn.dataset.cat;
    render();
  });
});

render();