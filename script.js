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

    let currQuestion = 0;
    let score = 0;

    function loadQues() {
        const question = document.getElementById("ques");
        const opt = document.getElementById("opt");

        question.textContent = Questions[currQuestion].q;
        opt.innerHTML = "";

        for (let i = 0; i < Questions[currQuestion].a.length; i++) {
            // Create a button element for each answer choice
            const choice = document.createElement("button");
            choice.type = "button"; // Set button type
            choice.classList.add("choice-button"); // Add a class for styling
            choice.textContent = Questions[currQuestion].a[i].text; // Set the answer text

            // Add a click event listener to handle user's choice
            choice.addEventListener("click", function () {
                handleChoice(i);
            });

            // Append the choice button to the options container
            opt.appendChild(choice);
        }
    }

    // Function to handle the user's choice
    function handleChoice(selectedIndex) {
        if (Questions[currQuestion].a[selectedIndex].isCorrect) {
            score++;
        } else {
            // Deduct health points for incorrect answers
            deductHealth();
        }

        nextQuestion();
    }


    loadQues();

    function loadScore() {
        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.textContent = `You scored ${score*1} out of ${(Questions.length)*1}`;
        }
    }

    function nextQuestion() {
        if (currQuestion < Questions.length - 1) {
            currQuestion++;
            loadQues();
        } else {
            // Hide the question and options, show the score
            document.getElementById("opt").style.display = "none";
            document.getElementById("ques").style.display = "none";
            // document.getElementById("btn").style.display = "none";
            loadScore();
        }
    }

    function checkAns() {
        const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);

        if (Questions[currQuestion].a[selectedAns].isCorrect) {
            score++;
        }

        nextQuestion();
    }

    function retryQuiz() {
        // Reload the current page, effectively resetting the quiz
        location.reload();
    }

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    let playerX = 500;
    let playerY = 500;
    const playerSize = 30;
    const moveAmount = 10;
    let healthPoints = 1000; // Initialize player's health points

    var player = new Image();
    player.src = "images/catsprite1.png";

    function drawplayer() {
        ctx.drawImage(player, playerX, playerY, playerSize, playerSize);

        // Display health points on the canvas
        ctx.fillStyle = "white";
        ctx.font = "100% Arial";
        ctx.fillText(`Health: ${healthPoints}`, 10, 30);
    }

    function drawImg(src, x, y, w, h) {
        canvasContext.drawImage(src, x, y, w, h);
    }

    function handleKey(event) {
        switch (event.key) {
            case "w":
                playerY -= moveAmount;
                break;
            case "s":
                playerY += moveAmount;
                break;
            case "a":
                playerX -= moveAmount;
                break;
            case "d":
                playerX += moveAmount;
                break;
        }

        // Ensure the player stays within the canvas boundaries
        playerX = Math.max(0, Math.min(playerX, canvas.width - playerSize));
        playerY = Math.max(0, Math.min(playerY, canvas.height - playerSize));

        drawplayer();
    }

    drawplayer();

    // Listen for key presses
    window.addEventListener("keydown", handleKey);

    // Function to deduct health points for incorrect answers
    function deductHealth() {
        healthPoints -= 500;
        if (healthPoints <= 0) {
            // Game over logic here
            alert("Game over! Your health points reached " + healthPoints);
            location.reload(); // Reload the game
        }
        drawplayer();
    }