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
        }

        nextQuestion();
    }


    loadQues();

    function loadScore() {
        const scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.textContent = `You scored ${score} out of ${Questions.length}`;
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

    let squareX = canvas.width / 2;
    let squareY = canvas.height / 2;
    const squareSize = 30;
    const moveAmount = 10;

    function drawSquare() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(squareX, squareY, squareSize, squareSize);
    }

    function handleKey(event) {
        switch (event.key) {
            case "w":
                squareY -= moveAmount;
                break;
            case "s":
                squareY += moveAmount;
                break;
            case "a":
                squareX -= moveAmount;
                break;
            case "d":
                squareX += moveAmount;
                break;
        }

        // Ensure the square stays within the canvas boundaries
        squareX = Math.max(0, Math.min(squareX, canvas.width - squareSize));
        squareY = Math.max(0, Math.min(squareY, canvas.height - squareSize));

        drawSquare();
    }

    drawSquare();

    // Listen for key presses
    window.addEventListener("keydown", handleKey);