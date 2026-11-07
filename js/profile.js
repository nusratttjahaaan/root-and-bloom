
const defaults = {
  pName: "Nusrat Maysha",
  pEmail: "nusrat.maysha@example.com",
  pPattern: "Curly",
  pScalp: "Dry",
  pConcern: "Dryness",
  pWash: "Once a week"
};
const defaultSensitivities = ["Coconut oil"];
let sensitivities = defaultSensitivities.slice();
let editing = false;


const editBtn = document.getElementById("editBtn");
const fields = document.querySelectorAll(".profile-main input, .profile-main select");
const sensBox = document.getElementById("sensBox");

function setEditing(on) {
  editing = on;
  fields.forEach(function (f) { f.disabled = !on; });
  editBtn.textContent = on ? "Save changes" : "Edit profile";
}

function updateSideCard() {
  document.getElementById("sideName").textContent = document.getElementById("pName").value;
  document.getElementById("sideEmail").textContent = document.getElementById("pEmail").value;
  document.getElementById("sideHair").textContent = document.getElementById("pPattern").value;
  document.getElementById("sideScalp").textContent = document.getElementById("pScalp").value + " scalp";
}

editBtn.addEventListener("click", function () {
  if (editing) {
    updateSideCard();
    setEditing(false);
  } else {
    setEditing(true);
  }
});


function drawSensitivities() {
  if (sensitivities.length === 0) {
    sensBox.innerHTML = '<span class="no-sens">No sensitivities saved.</span>';
    return;
  }
  sensBox.innerHTML = sensitivities.map(function (name, i) {
    return '<span class="sens-chip">' + name +
           ' <button type="button" onclick="removeSensitivity(' + i + ')">&times;</button></span>';
  }).join(" ");
}

function removeSensitivity(i) {
  sensitivities.splice(i, 1);
  drawSensitivities();
}

document.getElementById("resetBtn").addEventListener("click", function () {
  Object.keys(defaults).forEach(function (id) {
    document.getElementById(id).value = defaults[id];
  });
  sensitivities = defaultSensitivities.slice();
  drawSensitivities();
  updateSideCard();
  setEditing(false);
});

setEditing(false);
drawSensitivities();