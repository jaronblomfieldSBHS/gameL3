// Quiz Questions and Answers
const Questions = [{
        q: "-question 1-",
        a: [{
                text: "Answer 1",
                isCorrect: false
            },
            {
                text: "Answer 2",
                isCorrect: false
            },
            {
                text: "Answer 3",
                isCorrect: true
            },
            {
                text: "Answer 4",
                isCorrect: false
            }
        ]
    },
    {
        q: "-question 2-",
        a: [{
                text: "Answer 1",
                isCorrect: false
            },
            {
                text: "Answer 2",
                isCorrect: false
            },
            {
                text: "Answer 3",
                isCorrect: false
            },
            {
                text: "Answer 4",
                isCorrect: true
            }
        ]
    },
    {
        q: "-question 3-",
        a: [{
                text: "Answer 1",
                isCorrect: false
            },
            {
                text: "Answer 2",
                isCorrect: false
            },
            {
                text: "Answer 3",
                isCorrect: true
            },
            {
                text: "Answer 4",
                isCorrect: false
            }
        ]
    }
];

// Current Question and Score
let currQuestion = 0;
let score = 0;
let healthScore = 1000;
const maxHealth = 1000;


// HTML Elements
const questionElement = document.getElementById("ques");
const optionsElement = document.getElementById("opt");
const healthPointsElement = document.getElementById("healthPoints");
document.getElementById("retryBtn").addEventListener("click", retryQuiz);


// Load Question and Answer Choices
function loadQuestion() {
    questionElement.textContent = Questions[currQuestion].q;
    optionsElement.innerHTML = "";

    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        const choice = document.createElement("button");
        choice.type = "button";
        choice.classList.add("choice-button");
        choice.textContent = Questions[currQuestion].a[i].text;

        choice.addEventListener("click", function () {
            handleChoice(i);
        });

        optionsElement.appendChild(choice);
    }
}

// Handle User's Choice
function handleChoice(selectedIndex) {
    if (Questions[currQuestion].a[selectedIndex].isCorrect) {
        score++;
    } else {
        // Deduct 500 points for an incorrect answer
        healthScore -= 500;
    }

    updateHealthDisplay();

    // Check if the game is over
    if (healthScore <= 0) {
        gameOver();
    } else {
        nextQuestion();
    }
}

// Update Health Score Display
function updateHealthDisplay() {
    healthPointsElement.textContent = `Health Points: ${healthScore}`;
}

function gameOver() {
    optionsElement.style.display = "none";
    questionElement.style.display = "none";
    updateHealthDisplay(); // Ensure health score is up to date
    alert("Game Over");
}

// Load User's Score
function loadScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `You scored ${score} out of ${Questions.length}`;
}

// Move to the Next Question
function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQuestion();
    } else {
        // Quiz is complete
        showScore();
    }
}

// Show User's Final Score
function showScore() {
    optionsElement.style.display = "none";
    questionElement.style.display = "none";
    loadScore();
}

// Retry the Quiz
function retryQuiz() {
    window.location.reload();
}

// Initialize the Quiz
loadQuestion();