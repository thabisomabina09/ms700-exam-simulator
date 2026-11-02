
let currentQuestion = 0;
let selectedAnswers = {};
let reviewQuestions = [];
let examMode = "practice";
let timeRemaining = 100 * 60;
let timerInterval = null;
let submitted = false;

const app = document.getElementById("app");

// Start the examination
function startExam(mode) {
    if (timerInterval) clearInterval(timerInterval);

    examMode = mode;
    currentQuestion = 0;
    selectedAnswers = {};
    reviewQuestions = [];
    timeRemaining = 100 * 60;
    submitted = false;

    showQuestion();
    startTimer();
}

// Display current question
function showQuestion() {
    const q = questions[currentQuestion];
    const answered = selectedAnswers[currentQuestion] !== undefined;
    const selected = selectedAnswers[currentQuestion];

    let optionsHTML = q.options.map((option, index) => `
        <button
            class="option-button"
            style="display:block;width:100%;text-align:left;
            margin:10px 0;background:${
                answered && selected === index ? "#dbeafe" : "#f1f3f8"
            };color:#222;border:1px solid #ccc;"
            onclick="selectAnswer(${index})"
            ${submitted ? "disabled" : ""}
        >
            ${String.fromCharCode(65 + index)}. ${option}
        </button>
    `).join("");

    const feedback = answered && (examMode === "practice" || submitted)
        ? `
            <div class="feedback" style="background:#eef5ff;
            padding:15px;margin-top:20px;border-radius:8px;">
                <h3 style="color:${selected === q.correctAnswer ? "green" : "red"}">
                    ${selected === q.correctAnswer ? "Correct answer!" : "Incorrect answer"}
                </h3>
                <p><strong>Correct answer:</strong>
                ${String.fromCharCode(65 + q.correctAnswer)}.
                ${q.options[q.correctAnswer]}</p>
                <p><strong>Explanation:</strong> ${q.explanation}</p>
            </div>
        `
        : "";

    const navigation = questions.map((item, index) => {
        let background = "#eeeeee";

        if (selectedAnswers[index] !== undefined) {
            background = "#cce5ff";
        }

        if (reviewQuestions.includes(index)) {
            background = "#ffe0a3";
        }

        if (index === currentQuestion) {
            background = "#464775";
        }

        return `
            <button
                onclick="goToQuestion(${index})"
                style="background:${background};
                color:${index === currentQuestion ? "white" : "#222"};
                padding:10px;min-width:38px;"
                ${submitted ? "" : ""}
            >
                ${index + 1}
            </button>
        `;
    }).join("");

    app.innerHTML = `
        <div style="display:flex;justify-content:space-between;
        flex-wrap:wrap;gap:10px;">
            <h2>MS-700 Examination</h2>
            <h3 id="timer">Time: ${formatTime(timeRemaining)}</h3>
        </div>

        <p><strong>Mode:</strong> ${examMode.toUpperCase()}</p>

        <p><strong>Question ${currentQuestion + 1}
        of ${questions.length}</strong></p>

        <p><strong>Topic:</strong> ${q.topic}</p>

        <div style="background:#e9edf5;height:8px;border-radius:8px;">
            <div style="width:${((currentQuestion + 1) /
                questions.length) * 100}%;
                background:#464775;height:8px;border-radius:8px;">
            </div>
        </div>

        <h3 style="margin-top:25px;">${q.question}</h3>

        <div>${optionsHTML}</div>

        ${feedback}

        <div style="margin-top:20px;">
            <button onclick="toggleReview()" ${submitted ? "disabled" : ""}>
                ${reviewQuestions.includes(currentQuestion)
                    ? "Remove Review Flag"
                    : "Mark for Review"}
            </button>
        </div>

        <div style="margin-top:20px;">
            <button onclick="previousQuestion()"
                ${currentQuestion === 0 ? "disabled" : ""}>
                Previous
            </button>

            <button onclick="nextQuestion()"
                ${currentQuestion === questions.length - 1 ? "disabled" : ""}>
                Next
            </button>
        </div>

        <hr style="margin:25px 0;">

        <h3>Question Navigation</h3>

        <p>Blue = Answered | Orange = Review | Grey = Unanswered</p>

        <div style="display:flex;flex-wrap:wrap;gap:4px;">
            ${navigation}
        </div>

        <p><strong>Answered:</strong>
        ${Object.keys(selectedAnswers).length} / ${questions.length}</p>

        <p><strong>Marked for review:</strong>
        ${reviewQuestions.length}</p>

        <button onclick="submitExam()" style="background:#198754;">
            Submit Examination
        </button>
    `;
}

// Select an answer
function selectAnswer(index) {
    if (submitted) return;

    selectedAnswers[currentQuestion] = index;
    showQuestion();
}

// Navigate forward
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

// Navigate backward
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Jump to a particular question
function goToQuestion(index) {
    currentQuestion = index;
    showQuestion();
}

// Mark or unmark a question for review
function toggleReview() {
    if (submitted) return;

    if (reviewQuestions.includes(currentQuestion)) {
        reviewQuestions = reviewQuestions.filter(
            index => index !== currentQuestion
        );
    } else {
        reviewQuestions.push(currentQuestion);
    }

    showQuestion();
}

// Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;

        const timer = document.getElementById("timer");

        if (timer) {
            timer.textContent = "Time: " + formatTime(timeRemaining);
        }

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time is up! Your examination will be submitted.");
            finishExam();
        }
    }, 1000);
}

// Format timer
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return String(minutes).padStart(2, "0") + ":" +
        String(remainingSeconds).padStart(2, "0");
}

// Calculate examination score
function calculateScore() {
    let score = 0;

    questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctAnswer) {
            score++;
        }
    });

    return score;
}

// Submit examination
function submitExam() {
    if (submitted) return;

    const unanswered = questions.length -
        Object.keys(selectedAnswers).length;

    const message = unanswered > 0
        ? `You have ${unanswered} unanswered questions. Submit anyway?`
        : "Are you sure you want to submit your examination?";

    if (confirm(message)) {
        finishExam();
    }
}

// Complete examination
function finishExam() {
    clearInterval(timerInterval);
    submitted = true;
    showResults();
}

// Display results
function showResults() {
    const score = calculateScore();
    const percentage = Math.round(
        (score / questions.length) * 100
    );

    const status = percentage >= 70
        ? "Practice benchmark achieved!"
        : "More practice recommended.";

    const domainResults = {};

    questions.forEach((q, index) => {
        if (!domainResults[q.topic]) {
            domainResults[q.topic] = {
                total: 0,
                correct: 0
            };
        }

        domainResults[q.topic].total++;

        if (selectedAnswers[index] === q.correctAnswer) {
            domainResults[q.topic].correct++;
        }
    });

    const domainHTML = Object.entries(domainResults)
        .map(([topic, data]) => `
            <p>
                <strong>${topic}:</strong>
                ${data.correct}/${data.total}
                (${Math.round(data.correct / data.total * 100)}%)
            </p>
        `).join("");

    const reviewHTML = questions.map((q, index) => {
        const answer = selectedAnswers[index];
        const correct = answer === q.correctAnswer;

        return `
            <div style="background:#f5f5f5;padding:15px;
            margin:12px 0;border-radius:8px;text-align:left;">

                <h4>Question ${index + 1} - ${q.topic}</h4>

                <p>${q.question}</p>

                <p><strong>Your answer:</strong>
                ${answer === undefined
                    ? "Not answered"
                    : String.fromCharCode(65 + answer) +
                      ". " + q.options[answer]}</p>

                <p><strong>Correct answer:</strong>
                ${String.fromCharCode(65 + q.correctAnswer)}.
                ${q.options[q.correctAnswer]}</p>

                <p style="color:${correct ? "green" : "red"}">
                    <strong>${correct ? "CORRECT" : "INCORRECT"}</strong>
                </p>

                <p><strong>Explanation:</strong> ${q.explanation}</p>
            </div>
        `;
    }).join("");

    app.innerHTML = `
        <h2>Examination Results</h2>

        <div style="background:#eef0fa;padding:25px;
        border-radius:10px;margin:20px 0;">

            <h1 style="font-size:48px;color:#464775;">
                ${percentage}%
            </h1>

            <h2>${score} / ${questions.length} Correct</h2>

            <h3>${status}</h3>

            <p>Incorrect: ${questions.length -
                Object.keys(selectedAnswers).filter(
                    index => selectedAnswers[index] ===
                        questions[index].correctAnswer
                ).length - unansweredCount()}</p>

            <p>Unanswered: ${unansweredCount()}</p>
        </div>

        <h3>Performance by Topic</h3>

        ${domainHTML}

        <hr>

        <h2>Answer Review and Explanations</h2>

        ${reviewHTML}

        <button onclick="location.reload()">
            Start New Examination
        </button>
    `;
}

function unansweredCount() {
    return questions.length - Object.keys(selectedAnswers).length;
}
