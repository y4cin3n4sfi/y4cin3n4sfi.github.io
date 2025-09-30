const quizData = [
  {
    question: "Which of these is NOT a pillar of OOP?",
    options: ["Encapsulation", "Polymorphism", "Abstraction", "Compilation"],
    answer: "Compilation"
  },
  {
    question: "What does 'inheritance' in OOP mean?",
    options: [
      "Creating a copy of a class",
      "One class acquiring properties of another",
      "Hiding internal details",
      "Overloading a method"
    ],
    answer: "One class acquiring properties of another"
  },
  {
    question: "Polymorphism allows:",
    options: [
      "Using the same method name with different implementations",
      "Creating multiple constructors only",
      "Writing code without classes",
      "Accessing private variables directly"
    ],
    answer: "Using the same method name with different implementations"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  let q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => selectOption(opt, q.answer);
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

function selectOption(selected, correct) {
  let buttons = document.querySelectorAll(".option");
  buttons.forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) {
      b.style.background = "#28a745"; // green
      b.style.color = "#fff";
    } else if (b.textContent === selected) {
      b.style.background = "#dc3545"; // red
      b.style.color = "#fff";
    }
  });
  if (selected === correct) score++;
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.textContent = `🎉 You scored ${score} out of ${quizData.length}`;
}

loadQuestion();
