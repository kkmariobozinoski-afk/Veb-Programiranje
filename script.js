const questions = [
    {
        question: "Which company made the PlayStation?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Sony", correct: true },
            { text: "Nintendo", correct: false },
            { text: "EA", correct: false }
        ]
    },
    {
        question: "In which game do you fight the killer Nemesis?",
        answers: [
            { text: "Resident Evil 3", correct: true },
            { text: "Silent Hill", correct: false },
            { text: "Dead by Daylight", correct: false },
            { text: "Outlast", correct: false }
        ]
    },
    {
        question: "What is the best-selling video game of all time?",
        answers: [
            { text: "GTA V", correct: false },
            { text: "Minecraft", correct: true },
            { text: "Fortnite", correct: false },
            { text: "Call of Duty", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    nextButton.innerText = "Next Question";   
    nextButton.onclick = null;                
    nextButton.style.display = "none";

    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answersElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answersElement.innerHTML = "";
}

function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    Array.from(answersElement.children).forEach(btn => {
        btn.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Restart";
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz;
}

startQuiz();