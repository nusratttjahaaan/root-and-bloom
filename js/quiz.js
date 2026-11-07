// ---------- The 10 questions ----------
// type "single" = pick one answer, "multi" = pick many
const questions = [
  { key: "hairType", title: "What is your natural hair type?", type: "single",
    options: ["Straight", "Wavy", "Curly", "Coily"] },

  { key: "scalp", title: "How does your scalp usually feel?", type: "single",
    options: ["Normal", "Dry", "Oily", "Combination", "Sensitive"] },

  { key: "concern", title: "What is your main hair concern?", type: "single",
    options: ["Hair Fall", "Dandruff", "Dryness", "Frizz", "Hair Damage", "Slow Hair Growth"] },

  { key: "washing", title: "How often do you wash your hair?", type: "single",
    options: ["Daily", "2–3 times a week", "Once a week", "Less than once a week"] },

  { key: "texture", title: "How would you describe your hair texture?", type: "single",
    hint: "Choose the option that best matches the thickness of your individual hair strands.",
    options: [
      { label: "Very Fine", desc: "Strands feel delicate and lightweight" },
      { label: "Fine", desc: "Thin strands with less volume" },
      { label: "Medium", desc: "Average strand thickness" },
      { label: "Thick", desc: "Noticeably thicker strands" },
      { label: "Very Thick", desc: "Heavy, dense strands" },
      { label: "Coarse", desc: "Thick, rough-feeling strands" }
    ] },

  { key: "chemical", title: "Have you chemically treated your hair?", type: "multi", exclusive: "No",
    options: ["No", "Hair Coloring", "Straightening", "Rebonding", "Perming", "Bleaching"] },

  { key: "heat", title: "How often do you use heat on your hair?", type: "single",
    options: ["Never", "Rarely", "Sometimes", "Frequently"] },

  { key: "goal", title: "What is your main hair goal?", type: "single",
    options: ["Healthier Hair", "Hair Growth", "Reduce Hair Fall", "Reduce Frizz", "More Shine", "Better Scalp Health"] },

  { key: "condition", title: "How would you describe your hair's current condition?", type: "single",
    options: ["Healthy", "Slightly Dry", "Dry", "Damaged", "Severely Damaged"] },

  { key: "avoid", title: "Are there any ingredients you prefer to avoid?", type: "multi", exclusive: "No Preference",
    options: ["No Preference", "Fragrance", "Sulfates", "Silicones", "Parabens", "Other"] }
];


let current = 0;                       
const answers = {};                   


const qTitle = document.getElementById("qTitle");
const qHint = document.getElementById("qHint");
const optionsBox = document.getElementById("options");
const stepText = document.getElementById("stepText");
const stepFill = document.getElementById("stepFill");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const otherBox = document.getElementById("otherBox");
const otherInput = document.getElementById("otherInput");


function showQuestion() {
  const q = questions[current];

  qTitle.textContent = q.title;
  qHint.textContent = q.hint || "";
  qHint.style.display = q.hint ? "block" : "none";
  stepText.textContent = "Step " + (current + 1) + " of " + questions.length;
  stepFill.style.width = ((current + 1) / questions.length * 100) + "%";

  optionsBox.innerHTML = "";
  q.options.forEach(function (opt) {
    const label = typeof opt === "string" ? opt : opt.label;
    const desc = typeof opt === "string" ? "" : opt.desc;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = label + (desc ? "<small>" + desc + "</small>" : "");

    // keep the highlight if the user already answered this question
    const saved = answers[q.key];
    if (saved && (saved === label || (Array.isArray(saved) && saved.includes(label)))) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", function () { chooseOption(q, label, btn); });
    optionsBox.appendChild(btn);
  });


  const otherPicked = Array.isArray(answers[q.key]) && answers[q.key].includes("Other");
  otherBox.style.display = otherPicked ? "block" : "none";

  backBtn.disabled = current === 0;
  nextBtn.textContent = current === questions.length - 1 ? "See my results →" : "Continue →";
  updateNext();
}
function chooseOption(q, label, btn) {
  if (q.type === "single") {
    answers[q.key] = label;
  } else {
    let list = answers[q.key] || [];
    if (label === q.exclusive) {
      list = [label];        
    } else {
      list = list.filter(function (x) { return x !== q.exclusive; });
      if (list.includes(label)) {
        list = list.filter(function (x) { return x !== label; });   
      } else {
        list.push(label);
      }
    }
    answers[q.key] = list;
  }
  showQuestion();
}

function updateNext() {
  const a = answers[questions[current].key];
  nextBtn.disabled = !a || (Array.isArray(a) && a.length === 0);
}

otherInput.addEventListener("input", function () {
  answers.otherText = otherInput.value;
});


nextBtn.addEventListener("click", function () {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    
    localStorage.setItem("hairAnswers", JSON.stringify(answers));
    window.location.href = "result.html";
  }
});

backBtn.addEventListener("click", function () {
  if (current > 0) {
    current--;
    showQuestion();
  }
});

showQuestion();