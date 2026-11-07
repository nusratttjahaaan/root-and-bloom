
const doctors = [
  { id: 1, name: "Dr. Amina Noor", specialty: "Hair & scalp health", years: 12, city: "Dhaka",
    img: "doctor-1.jpg", popImg: "doctor-1-profile.jpg" },
  { id: 2, name: "Dr. Samira Ali", specialty: "Clinical dermatology", years: 9, city: "Chattogram",
    img: "doctor-2.jpg", popImg: "doctor-2.jpg" },
  { id: 3, name: "Dr. Rehan Karim", specialty: "Hair loss care", years: 14, city: "Dhaka",
    img: "doctor-3.jpg", popImg: "doctor-3.jpg" }
];

let search = "";
let place = "All locations";

const grid = document.getElementById("docGrid");
const noResults = document.getElementById("noResults");
const modal = document.getElementById("docModal");
const box = document.getElementById("docBox");

function render() {
  const list = doctors.filter(function (d) {
    const okSearch = (d.name + " " + d.specialty).toLowerCase().includes(search.toLowerCase());
    const okLocation = place === "All locations" || d.city === place;
    return okSearch && okLocation;
  });

  noResults.style.display = list.length === 0 ? "block" : "none";

  grid.innerHTML = list.map(function (d) {
    return '<div class="derma-card">' +
      '<img src="images/' + d.img + '" alt="' + d.name + '">' +
      '<div class="derma-info">' +
        "<h4>" + d.name + "</h4>" +
        '<div class="derma-spec">' + d.specialty + "</div>" +
        '<div class="derma-line"><i class="bi bi-heart-pulse"></i> ' + d.years + " years</div>" +
        '<div class="derma-line"><i class="bi bi-house-door"></i> ' + d.city + "</div>" +
      "</div>" +
      '<button class="btn-line" onclick="openDoctor(' + d.id + ')">View profile</button>' +
    "</div>";
  }).join("");
}

function openDoctor(id) {
  const d = doctors.find(function (x) { return x.id === id; });
  box.innerHTML =
    '<div class="modal-top"><h3>' + d.name + '</h3>' +
    '<button type="button" onclick="closeDoctor()">&times;</button></div>' +
    '<div class="doc-pop">' +
      '<img src="images/' + d.popImg + '" alt="' + d.name + '">' +
      "<div>" +
        '<span class="tag-sm gold">Dermatologist</span>' +
        "<h4>" + d.specialty + "</h4>" +
        "<p>Provides professional information about " + d.specialty.toLowerCase() + ".</p>" +
        '<div class="derma-line"><i class="bi bi-heart-pulse"></i> ' + d.years + " years experience</div>" +
        '<div class="derma-line"><i class="bi bi-house-door"></i> ' + d.city + "</div>" +
      "</div>" +
    "</div>";
  modal.classList.add("open");
}

function closeDoctor() { modal.classList.remove("open"); }

modal.addEventListener("click", function (e) {
  if (e.target === modal) closeDoctor();
});

document.getElementById("docSearch").addEventListener("input", function (e) {
  search = e.target.value;
  render();
});

document.getElementById("locSelect").addEventListener("change", function (e) {
  place = e.target.value;
  render();
});

render();