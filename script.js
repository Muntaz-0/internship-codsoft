/* ===================================
   QuizCraft - Main JavaScript
=================================== */

// Dark Mode
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

    });

}

window.addEventListener("load", () => {

    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeBtn) {
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

    }

});

// Register

function registerUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {
        name,
        email,
        password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    window.location.href = "login.html";

}

// Login

function loginUser() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (
        user &&
        user.email === email &&
        user.password === password
    ) {

        alert("Login Successful!");

        window.location.href = "index.html";

    } else {

        alert("Invalid Email or Password");

    }

}
/* ===================================
   Quiz Management
=================================== */

// Save Quiz
function saveQuiz() {

    let title = document.getElementById("quizTitle").value;
    let question = document.getElementById("question").value;
    let optionA = document.getElementById("optionA").value;
    let optionB = document.getElementById("optionB").value;
    let optionC = document.getElementById("optionC").value;
    let optionD = document.getElementById("optionD").value;
    let answer = document.getElementById("answer").value;

    const quiz = {
        title,
        question,
        options: [optionA, optionB, optionC, optionD],
        answer
    };

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    quizzes.push(quiz);

    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    alert("✅ Quiz Saved Successfully!");

    document.querySelector("form").reset();
}


// Display Saved Quizzes
function loadQuizzes() {

    const quizList = document.getElementById("quizList");

    if (!quizList) return;

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    quizList.innerHTML = "";

    if (quizzes.length === 0) {

        quizList.innerHTML = `
            <h2 style="text-align:center;">
                No quizzes available.
            </h2>
        `;

        return;
    }

    quizzes.forEach((quiz, index) => {

        quizList.innerHTML += `

        <div class="card">

            <h2>${quiz.title}</h2>

            <p>${quiz.question}</p>

            <button onclick="startQuiz(${index})" class="btn">

                Start Quiz

            </button>

        </div>

        `;

    });

}


// Open Selected Quiz
function startQuiz(index) {

    localStorage.setItem("selectedQuiz", index);

    window.location.href = "quiz.html";

}

window.onload = function () {

    loadQuizzes();

};
/* ===================================
   Quiz Taking & Score Calculation
=================================== */

let currentQuiz = null;

// Load Quiz
function loadQuiz() {

    const quizContainer = document.getElementById("quizContainer");

    if (!quizContainer) return;

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    let selected = localStorage.getItem("selectedQuiz");

    currentQuiz = quizzes[selected];

    if (!currentQuiz) {

        quizContainer.innerHTML = "<h2>No Quiz Found!</h2>";

        return;
    }

    quizContainer.innerHTML = `

    <h2>${currentQuiz.title}</h2>

    <h3>${currentQuiz.question}</h3>

    <form id="quizForm">

        <label>
            <input type="radio" name="answer" value="A">
            ${currentQuiz.options[0]}
        </label><br><br>

        <label>
            <input type="radio" name="answer" value="B">
            ${currentQuiz.options[1]}
        </label><br><br>

        <label>
            <input type="radio" name="answer" value="C">
            ${currentQuiz.options[2]}
        </label><br><br>

        <label>
            <input type="radio" name="answer" value="D">
            ${currentQuiz.options[3]}
        </label><br><br>

        <button type="button" class="btn" onclick="submitQuiz()">
            Submit Quiz
        </button>

    </form>

    `;
}


// Submit Quiz
function submitQuiz() {

    let selectedAnswer =
        document.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {

        alert("Please select an answer!");

        return;

    }

    let score = 0;

    if (selectedAnswer.value === currentQuiz.answer) {

        score = 1;

    }

    localStorage.setItem("score", score);

    localStorage.setItem("total", 1);

    window.location.href = "result.html";

}
function login() {
  // after checking username/password is correct
  localStorage.setItem("user", JSON.stringify(username));

  window.location.href = "home.html";
}

// Load Result
function loadResult() {

    const result = document.getElementById("result");

    if (!result) return;

    let score = Number(localStorage.getItem("score")) || 0;
    let total = Number(localStorage.getItem("total")) || 1;

    let percentage = (score / total) * 100;

    result.innerHTML = `

        <h1>Your Result</h1>

        <h2>${score} / ${total}</h2>

        <h3>${percentage}%</h3>

        <p>
            ${percentage >= 50 ? "🎉 Congratulations! You Passed!" : "❌ Better Luck Next Time!"}
        </p>

        <a href="quizzes.html" class="btn">
            Back to Quizzes
        </a>

    `;

}


// Auto Load
window.onload = function () {

    loadQuizzes();
    loadQuiz();
    login();
    loadResult();

};
