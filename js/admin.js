
const items = [
  { id: 1, name: "Gentle Balance Wash", brand: "Moss & Root", category: "Shampoo", price: 22,
    reason: "Great for a dry scalp", img: "images/product-1.jpg" },
  { id: 2, name: "Cloud Curl Cream", brand: "Nurture", category: "Conditioner", price: 18,
    reason: "Supports soft curls", img: "images/product-2.jpg" },
  { id: 3, name: "Deep Dew Mask", brand: "Kindred Hair", category: "Mask", price: 28,
    reason: "Targets dryness", img: "images/product-3.jpg" },
  { id: 4, name: "Botanical Scalp Oil", brand: "Moss & Root", category: "Oil", price: 24,
    reason: "Calms a dry scalp", img: "images/product-4.jpg" },
  { id: 5, name: "Smooth Day Serum", brand: "Nurture", category: "Serum", price: 20,
    reason: "Helps reduce frizz", img: "images/product-5.jpg" },
  { id: 6, name: "Soft Rinse Conditioner", brand: "Kindred Hair", category: "Conditioner", price: 19,
    reason: "Lightweight moisture", img: "images/product-6.jpg" }
];

let nextId = 7;
let editingId = null;
let deletingId = null;
let pendingImg = "";
let query = "";
const BASE_COUNT = 86 - items.length;     
const rows = document.getElementById("rows");
const statProducts = document.getElementById("statProducts");
const prodModal = document.getElementById("prodModal");
const delModal = document.getElementById("delModal");
const modalTitle = document.getElementById("modalTitle");
const saveBtn = document.getElementById("saveBtn");
const aName = document.getElementById("aName");
const aBrand = document.getElementById("aBrand");
const aCategory = document.getElementById("aCategory");
const aPrice = document.getElementById("aPrice");
const aReason = document.getElementById("aReason");
const aFile = document.getElementById("aFile");
const preview = document.getElementById("preview");

function render() {
  const list = items.filter(function (p) {
    const text = (p.name + " " + p.brand + " " + p.category + " " + p.reason).toLowerCase();
    return text.includes(query.toLowerCase());
  });

  rows.innerHTML = list.map(function (p) {
    const thumb = p.img
      ? '<img src="' + p.img + '" alt="">'
      : '<div class="noimg"><i class="bi bi-box-seam"></i></div>';
    return "<tr>" +
      '<td><div class="a-prod">' + thumb + "<div><b>" + p.name + "</b><small>" + p.brand + "</small></div></div></td>" +
      "<td>" + p.category + "</td>" +
      "<td>" + p.reason + "</td>" +
      '<td><span class="status">Active</span></td>' +
      '<td class="a-actions">' +
        '<button class="icon-btn" onclick="openEdit(' + p.id + ')"><i class="bi bi-pencil"></i></button>' +
        '<button class="icon-btn del" onclick="openDelete(' + p.id + ')"><i class="bi bi-trash"></i></button>' +
      "</td></tr>";
  }).join("");

  statProducts.textContent = BASE_COUNT + items.length;
}


function showPreview() {
  preview.innerHTML = pendingImg
    ? '<img src="' + pendingImg + '" alt="">'
    : '<i class="bi bi-box-seam"></i>';
}

function checkForm() {
  saveBtn.disabled = !(aName.value.trim() && aBrand.value.trim());
}

function openAdd() {
  editingId = null;
  pendingImg = "";
  modalTitle.textContent = "Add product";
  saveBtn.textContent = "Add product";
  aName.value = "";
  aBrand.value = "";
  aCategory.value = "Shampoo";
  aPrice.value = 24;
  aReason.value = "";
  aFile.value = "";
  showPreview();
  checkForm();
  prodModal.classList.add("open");
}

function openEdit(id) {
  const p = items.find(function (x) { return x.id === id; });
  editingId = id;
  pendingImg = p.img;
  modalTitle.textContent = "Edit product";
  saveBtn.textContent = "Save changes";
  aName.value = p.name;
  aBrand.value = p.brand;
  aCategory.value = p.category;
  aPrice.value = p.price;
  aReason.value = p.reason;
  aFile.value = "";
  showPreview();
  checkForm();
  prodModal.classList.add("open");
}

function closeProd() { prodModal.classList.remove("open"); }

aName.addEventListener("input", checkForm);
aBrand.addEventListener("input", checkForm);

aFile.addEventListener("change", function () {
  const file = aFile.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    pendingImg = e.target.result;
    showPreview();
  };
  reader.readAsDataURL(file);
});

document.getElementById("prodForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    name: aName.value.trim(),
    brand: aBrand.value.trim(),
    category: aCategory.value,
    price: Number(aPrice.value),
    reason: aReason.value.trim() || "Recommended for you",
    img: pendingImg
  };
  if (editingId === null) {
    data.id = nextId++;
    items.push(data);
  } else {
    const p = items.find(function (x) { return x.id === editingId; });
    Object.assign(p, data);
  }
  closeProd();
  render();
});


function openDelete(id) {
  const p = items.find(function (x) { return x.id === id; });
  deletingId = id;
  document.getElementById("delName").textContent = p.name;
  delModal.classList.add("open");
}

function closeDel() { delModal.classList.remove("open"); }

document.getElementById("delConfirm").addEventListener("click", function () {
  const index = items.findIndex(function (x) { return x.id === deletingId; });
  if (index !== -1) items.splice(index, 1);
  closeDel();
  render();
});


document.getElementById("addBtn").addEventListener("click", openAdd);
document.getElementById("closeProd").addEventListener("click", closeProd);
document.getElementById("cancelProd").addEventListener("click", closeProd);
document.getElementById("closeDel").addEventListener("click", closeDel);
document.getElementById("cancelDel").addEventListener("click", closeDel);

prodModal.addEventListener("click", function (e) { if (e.target === prodModal) closeProd(); });
delModal.addEventListener("click", function (e) { if (e.target === delModal) closeDel(); });

document.getElementById("adminSearch").addEventListener("input", function (e) {
  query = e.target.value;
  render();
});

render();