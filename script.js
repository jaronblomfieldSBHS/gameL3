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
    },
    {
        q: "-question 4-",
        a: [{
                text: "Answer 1",
                isCorrect: false
            },
            {
                text: "Answer 2",
                isCorrect: true
            },
            {
                text: "Answer 3",
                isCorrect: false
            },
            {
                text: "Answer 4",
                isCorrect: false
            }
        ]
    },
    {
        q: "-question 5-",
        a: [{
                text: "Answer 1",
                isCorrect: false
            },
            {
                text: "Answer 2",
                isCorrect: true
            },
            {
                text: "Answer 3",
                isCorrect: false
            },
            {
                text: "Answer 4",
                isCorrect: false
            }
        ]
    },
    {
        q: "-question 6-",
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
        q: "-question 7-",
        a: [{
                text: "Answer 1",
                isCorrect: true
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
                isCorrect: false
            }
        ]
    },
    {
        q: "-question 8-",
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
        q: "-question 9-",
        a: [{
                text: "Answer 1",
                isCorrect: false
            },
            {
                text: "Answer 2",
                isCorrect: true
            },
            {
                text: "Answer 3",
                isCorrect: false
            },
            {
                text: "Answer 4",
                isCorrect: false
            }
        ]
    },
    {
        q: "-question 10-",
        a: [{
                text: "Answer 1",
                isCorrect: true
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
                isCorrect: false
            }
        ]
    }
];

const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

// Current Question and Score
let currQuestion = 0;
let score = 0;
let healthScore = 1000;
const maxHealth = 1000;

//frame variables for attacking and being attacked
let frameCount = 0;
let enemyFlash = false;
let enemyFlashFrameCount = 0;
const maxEnemyFlashFrameCount = 10;

let frameCounter = 0; // Added frame counter variable
const maxFrameCounter = 20; // Adjust this value to control the speed of animation

//player varaibles
var player = new Image();
player.src = "images/catsprite1.png";
var playerFrame = 1;

//enemy varaibles
var enemy = new Image();
enemy.src = "images/enemysprite1.png";
var enemyFrame = 1;

//player attacked variables
var pattack = new Image();
pattack.src = "images/pow.png";

//enemy attacked variables
var eattack = new Image();
eattack.src = "images/slice.png";

// HTML Elements
const questionElement = document.getElementById("ques");
const optionsElement = document.getElementById("opt");
const healthPointsElement = document.getElementById("healthPoints");
document.getElementById("retryBtn").addEventListener("click", retryQuiz);

function gameLoop() {
    // Clear the canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    if (frameCount > 0) {
        // Draw the player as red if frameCount is positive
        drawImg(pattack, 125, 100, 50, 50);
    } else {
        drawImg(player, 125, 100, 50, 50); // Drawing the player normally
    }

    // Draw the enemy based on flash state
    if (enemyFlash && enemyFlashFrameCount > 0) {
        drawImg(eattack, 125, 10, 50, 50); // Display enemy as a red square
        enemyFlashFrameCount--;
    } else {
        drawImg(enemy, 125, 10, 50, 50); // Drawing the enemy normally
        enemyFlash = false; // Reset enemy flash state
    }

    // Call the next frame of the animation
    requestAnimationFrame(gameLoop);

    // Decrement frame count
    if (frameCount > 0) {
        frameCount--;
    }

     // Update player frame for animation
     frameCounter++;
     if (frameCounter >= maxFrameCounter) {
         if (playerFrame === 1) {
             player.src = "images/catsprite2.png";
             playerFrame = 2;
         } else {
             player.src = "images/catsprite1.png";
             playerFrame = 1;
         }

         if (enemyFrame === 1) {
            enemy.src = "images/enemysprite2.png";
            enemyFrame = 2;
        } else {
            enemy.src = "images/enemysprite1.png";
            enemyFrame = 1;
        }
         frameCounter = 0; // Reset frame counter
     }
}


// Start the game loop
gameLoop();

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

        // Set enemy flash frame count
        enemyFlashFrameCount = maxEnemyFlashFrameCount;
        enemyFlash = true;
    } else {
        // Deduct 100 points for an incorrect answer
        healthScore -= 100;
        frameCount = 10; // Set frame count to 10 when health is deducted
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

    // Check if the total score is 7-10 and displays an alert
    if (score >= 7 && score <= 10) {
        alert("You defeated the Enemy!");
    }

    //check if the total score is 1-6 and displays an alert
    if (score <= 6 && score >= 1) {
        alert("You did not defeat the Enemy!");
    }
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

function colorRect(x, y, w, h, c) {
    canvasContext.fillStyle = c;
    canvasContext.fillRect(x, y, w, h);
}

function drawImg(src, x, y, w, h) {
    canvasContext.drawImage(src, x, y, w, h);
}

window.onload = function() {
    alert("Rules:\n\n1. Answer the questions to defeat the enemy.\n2. Each correct answer gives you a point.\n3. Incorrect answers deduct 100 health points.\n4. Reach 0 health points to lose the game.\n5. Correctly answer 7 or more questions to win. \n\n You can retry at any point with the 'Retry' button!");
};