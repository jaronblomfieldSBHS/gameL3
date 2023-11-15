// Prompt the user to enter a username
const username = prompt("Enter your username:");

// Check if the username is provided, and if not, use a default name
const playerName = username ? username : "User";

// Quiz Questions and Answers
const Questions = [{
        q: "Question 1 - What is the scientific name for the domestic cat?",
        a: [{
                text: "Felis catus",
                isCorrect: true
            },
            {
                text: "Canis familiaris",
                isCorrect: false
            },
            {
                text: "Panthera leo",
                isCorrect: false
            },
            {
                text: "Oryctolagus cuniculus",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 2 - What's a cat's favorite bedtime story?",
        a: [{
                text: "Puss in Boots",
                isCorrect: false
            },
            {
                text: "The Great Catsby",
                isCorrect: false
            },
            {
                text: "Alice in Whiskerland",
                isCorrect: true
            },
            {
                text: "The Wizard of Paws",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 3 - How many whiskers does the average cat have?",
        a: [{
                text: "8",
                isCorrect: false
            },
            {
                text: "12",
                isCorrect: false
            },
            {
                text: "16",
                isCorrect: true
            },
            {
                text: "20",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 4 - What is a group of cats called?",
        a: [{
                text: "Flock",
                isCorrect: false
            },
            {
                text: "Herd",
                isCorrect: false
            },
            {
                text: "Clowder",
                isCorrect: true
            },
            {
                text: "Pack",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 5 - What's a cat's secret talent?",
        a: [{
                text: "Juggling fish",
                isCorrect: false
            },
            {
                text: "Singing opera",
                isCorrect: false
            },
            {
                text: "Breakdancing",
                isCorrect: true
            },
            {
                text: "Solving crossword puzzles",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 6 - What is the average lifespan of an indoor cat?",
        a: [{
                text: "5-8 years",
                isCorrect: false
            },
            {
                text: "10-13 years",
                isCorrect: true
            },
            {
                text: "15-18 years",
                isCorrect: false
            },
            {
                text: "20-23 years",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 7 - Which cat breed is known for its curly coat?",
        a: [{
                text: "Persian",
                isCorrect: false
            },
            {
                text: "Bengal",
                isCorrect: false
            },
            {
                text: "Scottish Fold",
                isCorrect: true
            },
            {
                text: "Russian Blue",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 8 - What is the largest domestic cat breed?",
        a: [{
                text: "Siamese",
                isCorrect: false
            },
            {
                text: "Maine Coon",
                isCorrect: true
            },
            {
                text: "Bengal",
                isCorrect: false
            },
            {
                text: "Sphynx",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 9 - How do cats stay fit?",
        a: [{
                text: "Zumba classes",
                isCorrect: true
            },
            {
                text: "Extreme hide and seek",
                isCorrect: false
            },
            {
                text: "Yoga sessions",
                isCorrect: false
            },
            {
                text: "Marathon napping",
                isCorrect: false
            }
        ]
    },
    {
        q: "Question 10 - What is the most popular breed of cat in New Zealand?",
        a: [{
                text: "Siamese",
                isCorrect: false
            },
            {
                text: "Persian",
                isCorrect: false
            },
            {
                text: "Maine Coon",
                isCorrect: true
            },
            {
                text: "Bengal",
                isCorrect: false
            }
        ]
    }
];

// Canvas and Context Setup
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

    // Draw the background image
    const backgroundImage = new Image();
    backgroundImage.src = "images/background.png";
    canvasContext.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw game elements
    if (frameCount > 0) {
        // Draw the player as red if frameCount is positive
        drawImg(pattack, 125, 100, 50, 50);
    } else {
        drawImg(player, 125, 100, 50, 50); // Drawing the player normally
    }

    // Draw the enemy based on flash state
    if (enemyFlash && enemyFlashFrameCount > 0) {
        drawImg(eattack, 125, 30, 50, 50); // Display enemy as a red square
        enemyFlashFrameCount--;
    } else {
        drawImg(enemy, 125, 30, 50, 50); // Drawing the enemy normally
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

        // Change the background color of healthPoints to green
        healthPointsElement.style.backgroundColor = '#4CAF50'; // Green color

        // Reset the background color after 1 second
        setTimeout(() => {
            healthPointsElement.style.backgroundColor = 'gray'; // Reset to original color
        }, 1000);
    } else {
        // Deduct 100 points for an incorrect answer
        healthScore -= 100;
        frameCount = 10; // Set frame count to 10 when health is deducted

        // Change the background color of healthPoints to red
        healthPointsElement.style.backgroundColor = '#FF0000'; // Red color

        // Reset the background color after 1 second
        setTimeout(() => {
            healthPointsElement.style.backgroundColor = 'gray'; // Reset to original color
        }, 1000);
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
// Game over alert for when player loses the game
function gameOver() {
    optionsElement.style.display = "none";
    questionElement.style.display = "none";
    updateHealthDisplay(); // Ensure health score is up to date
    alert("Game Over");
}

// Load User's Score
function loadScore(playerName) {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `${playerName}, you scored ${score} out of ${Questions.length}`;

    // Check if the total score is 7-10 and displays an alert
    if (score >= 7 && score <= 10) {
        alert("You defeated the Enemy!");
    }

    // Check if the total score is 1-6 and displays an alert
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
    loadScore(playerName);
}

// Retry the Quiz
function retryQuiz() {
    window.location.reload();
}

// Initialize the Quiz
loadQuestion();

// Drawing a colored rectangle on the canvas
function colorRect(x, y, w, h, c) {
    canvasContext.fillStyle = c;
    canvasContext.fillRect(x, y, w, h);
}

// Drawing an image on the canvas
function drawImg(src, x, y, w, h) {
    canvasContext.drawImage(src, x, y, w, h);
}

// Displaying rules upon page load
// window.onload = function () {
//     alert("Rules:\n\n1. Answer the questions to defeat the enemy.\n2. Each correct answer gives you a point.\n3. Incorrect answers deduct 100 health points.\n4. Reach 0 health points to lose the game.\n5. Correctly answer 7 or more questions to win. \n\n You can retry at any point with the 'Retry' button!");
// };

function showCustomAlert() {
    var customAlert = document.getElementById("customAlert");
    customAlert.style.display = "block";
}

function closeCustomAlert() {
    var customAlert = document.getElementById("customAlert");
    customAlert.style.display = "none";
}