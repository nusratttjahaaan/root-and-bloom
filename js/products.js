const products = [
  { id: 1, name: "Gentle Balance Wash", brand: "Moss & Root", category: "Shampoo", match: 96, rating: 4.8, price: 22,
    desc: "Great for a dry scalp", img: "product-1.jpg", coconut: false,
    about: "A gentle formula selected for your curly hair and moisture goal.",
    ingredients: "Aloe leaf juice, oat protein, glycerin, and jojoba esters." },

  { id: 2, name: "Cloud Curl Cream", brand: "Nurture", category: "Conditioner", match: 92, rating: 4.6, price: 18,
    desc: "Supports soft curls", img: "product-2.jpg", coconut: false, liked: true,
    about: "A soft, creamy formula that helps define curls without weighing them down.",
    ingredients: "Shea butter, aloe, glycerin, and flaxseed extract." },

  { id: 3, name: "Deep Dew Mask", brand: "Kindred Hair", category: "Mask", match: 88, rating: 4.9, price: 28,
    desc: "Targets dryness", img: "product-3.jpg", coconut: true,
    about: "An intensive weekly mask that restores moisture to dry strands.",
    ingredients: "Coconut oil, shea butter, panthenol, and argan oil." },

  { id: 4, name: "Botanical Scalp Oil", brand: "Moss & Root", category: "Oil", match: 85, rating: 4.7, price: 24,
    desc: "Calms a dry scalp", img: "product-4.jpg", coconut: false,
    about: "A light oil blend that soothes tightness and flaking on a dry scalp.",
    ingredients: "Jojoba oil, rosemary extract, and vitamin E." },

  { id: 5, name: "Smooth Day Serum", brand: "Nurture", category: "Serum", match: 82, rating: 4.4, price: 20,
    desc: "Helps reduce frizz", img: "product-5.jpg", coconut: false,
    about: "A weightless serum that smooths frizz and adds a soft shine.",
    ingredients: "Squalane, silk protein, and sunflower seed oil." },

  { id: 6, name: "Soft Rinse Conditioner", brand: "Kindred Hair", category: "Conditioner", match: 79, rating: 4.5, price: 19,
    desc: "Lightweight moisture", img: "product-6.jpg", coconut: true,
    about: "A lightweight daily conditioner for easy detangling.",
    ingredients: "Coconut oil, glycerin, and cetyl alcohol." }
];


let category = "All";
let search = "";
let safeOnly = false;
let sortBy = "match";

const grid = document.getElementById("grid");
const countText = document.getElementById("countText");
const noResults = document.getElementById("noResults");
const overlay = document.getElementById("overlay");
const panel = document.getElementById("panel");


function render() {
  let list = products.filter(function (p) {
    const okCategory = category === "All" || p.category === category;
    const okSearch = (p.name + " " + p.brand).toLowerCase().includes(search.toLowerCase());
    const okSafe = !safeOnly || !p.coconut;
    return okCategory && okSearch && okSafe;
  });

  if (sortBy === "match") list.sort(function (a, b) { return b.match - a.match; });
  if (sortBy === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
  if (sortBy === "low") list.sort(function (a, b) { return a.price - b.price; });
  if (sortBy === "high") list.sort(function (a, b) { return b.price - a.price; });

  countText.textContent = list.length + " products";
  noResults.style.display = list.length === 0 ? "block" : "none";

  grid.innerHTML = list.map(function (p) {
    return `
      <div class="prod-card">
        <div class="prod-img">
          <img src="images/${p.img}" alt="${p.name}">
          <button class="heart ${p.liked ? "liked" : ""}" onclick="toggleHeart(${p.id})">
            <i class="bi ${p.liked ? "bi-heart-fill" : "bi-heart"}"></i>
          </button>
        </div>
        <div class="prod-body">
          <div class="prod-meta">
            <span class="match">${p.match}% match</span>
            <span class="star"><i class="bi bi-star-fill"></i> ${p.rating}</span>
          </div>
          <div class="prod-brand">${p.brand}</div>
          <div class="prod-name">${p.name}</div>
          <div class="prod-desc">${p.desc}</div>
          ${p.coconut ? '<div class="warn"><i class="bi bi-exclamation-triangle"></i> Contains coconut oil</div>' : ""}
          <div class="prod-foot">
            <span class="price">$${p.price}</span>
            <button class="btn-view" onclick="openDetail(${p.id})">View product</button>
          </div>
        </div>
      </div>`;
  }).join("");
}

function toggleHeart(id) {
  const p = products.find(function (x) { return x.id === id; });
  p.liked = !p.liked;
  render();
}

function openDetail(id) {
  const p = products.find(function (x) { return x.id === id; });
  const note = p.coconut
    ? '<div class="detail-note warn-box"><i class="bi bi-exclamation-triangle"></i> Contains coconut oil, which you flagged.</div>'
    : '<div class="detail-note"><i class="bi bi-shield-check"></i> No saved sensitivities found</div>';

  panel.innerHTML = `
    <button class="detail-close" onclick="closeDetail()">&times;</button>
    <span class="match">${p.match}% match</span>
    <h2>${p.name}</h2>
    <img src="images/${p.img}" alt="${p.name}">
    <p><b>${p.brand}</b> &middot; <i class="bi bi-star-fill" style="color:#a8741a"></i> ${p.rating} &middot; $${p.price}</p>
    <p>${p.desc}. ${p.about}</p>
    ${note}
    <h4>Key ingredients</h4>
    <p>${p.ingredients}</p>
    <div class="detail-actions">
      <button class="btn-view" onclick="closeDetail()">Save product</button>
      <button class="btn-outline-brand" style="justify-content:center" onclick="closeDetail()">Mark as tried</button>
    </div>`;
  overlay.classList.add("open");
}

function closeDetail() { overlay.classList.remove("open"); }

overlay.addEventListener("click", function (e) {
  if (e.target === overlay) closeDetail();      
});


document.querySelectorAll(".filter-chip").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-chip").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    category = btn.dataset.cat;
    render();
  });
});

document.getElementById("searchInput").addEventListener("input", function (e) {
  search = e.target.value;
  render();
});

document.getElementById("sortSelect").addEventListener("change", function (e) {
  sortBy = e.target.value;
  render();
});

document.getElementById("safeBtn").addEventListener("click", function () {
  safeOnly = !safeOnly;
  this.classList.toggle("on", safeOnly);
  render();
});

render();