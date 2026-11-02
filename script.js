// ============================================
// MS-700 EXAM SIMULATOR
// Mixed question format engine
// ============================================

const app = document.getElementById("app");

let currentQuestion = 0;
let selectedAnswers = {};
let reviewQuestions = [];
let examMode = "exam";
let timeRemaining = 100 * 60;
let timerInterval = null;
let submitted = false;

// ---------- HELPERS ----------

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function getQuestion() {
    return questions[currentQuestion];
}

function getAnswer() {
    return selectedAnswers[currentQuestion];
}

function isAnswered(index) {
    const question = questions[index];
    const answer = selectedAnswers[index];

    if (answer === undefined || answer === null) return false;

    switch (question.type || "multipleChoice") {
        case "multipleSelect":
            return Array.isArray(answer) && answer.length > 0;

        case "matching":
            return Array.isArray(answer) &&
                answer.length === question.pairs.length &&
                answer.every(value => value !== null && value !== undefined);

        case "ordering":
            return Array.isArray(answer) &&
                answer.length === question.items.length &&
                answer.every(value => value !== null && value !== undefined) &&
                new Set(answer).size === answer.length;

        default:
            return answer !== "";
    }
}

function unansweredCount() {
    return questions.filter((_, index) => !isAnswered(index)).length;
}

function answeredCount() {
    return questions.length - unansweredCount();
}

function questionTypeLabel(type) {
    const labels = {
        multipleChoice: "Multiple choice",
        dropdown: "Dropdown",
        multipleSelect: "Select all that apply",
        matching: "Matching",
        ordering: "Ordering"
    };

    return labels[type] || "Multiple choice";
}

// ---------- START EXAM ----------

function startExam(mode) {
    clearInterval(timerInterval);

    currentQuestion = 0;
    selectedAnswers = {};
    reviewQuestions = [];
    submitted = false;
    examMode = mode;
    timeRemaining = 100 * 60;

    showQuestion();

    if (examMode === "exam") {
        startTimer();
    }
}

// ---------- TIMER ----------

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (submitted) {
            clearInterval(timerInterval);
            return;
        }

        timeRemaining--;

        const timer = document.getElementById("timer");

        if (timer) {
            timer.textContent = formatTime(timeRemaining);

            if (timeRemaining <= 600) {
                timer.style.color = "#dc2626";
            }
        }

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            finishExam(true);
        }
    }, 1000);
}

// ---------- QUESTION NAVIGATION ----------

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function goToQuestion(index) {
    if (index >= 0 && index < questions.length) {
        currentQuestion = index;
        showQuestion();
    }
}

function toggleReview() {
    if (reviewQuestions.includes(currentQuestion)) {
        reviewQuestions = reviewQuestions.filter(
            index => index !== currentQuestion
        );
    } else {
        reviewQuestions.push(currentQuestion);
    }

    showQuestion();
}

// ---------- ANSWER HANDLERS ----------

function selectAnswer(index) {
    if (submitted) return;

    selectedAnswers[currentQuestion] = index;
    showQuestion();
}

function setDropdownAnswer(value) {
    if (submitted) return;

    selectedAnswers[currentQuestion] =
        value === "" ? null : Number(value);

    showQuestion();
}

function toggleMultiple(index, checked) {
    if (submitted) return;

    let answers = getAnswer();

    if (!Array.isArray(answers)) {
        answers = [];
    }

    if (checked && !answers.includes(index)) {
        answers.push(index);
    }

    if (!checked) {
        answers = answers.filter(value => value !== index);
    }

    selectedAnswers[currentQuestion] = answers;
    showQuestion();
}

function setMatchingAnswer(row, value) {
    if (submitted) return;

    const question = getQuestion();
    let answers = getAnswer();

    if (!Array.isArray(answers)) {
        answers = Array(question.pairs.length).fill(null);
    }

    answers[row] = value === "" ? null : Number(value);
    selectedAnswers[currentQuestion] = answers;

    showQuestion();
}

function setOrderingPosition(itemIndex, value) {
    if (submitted) return;

    const question = getQuestion();
    let answers = getAnswer();

    if (!Array.isArray(answers)) {
        answers = Array(question.items.length).fill(null);
    }

    answers[itemIndex] = value === "" ? null : Number(value);
    selectedAnswers[currentQuestion] = answers;

    showQuestion();
}

// ---------- RENDER QUESTION INPUTS ----------

function renderMultipleChoice(question, answer) {
    return `
        <div class="answer-options">
            ${question.options.map((option, index) => {
                const selected = answer === index;
                const correct = submitted && index === question.correctAnswer;
                const incorrect = submitted && selected && !correct;

                return `
                    <button
                        class="answer-option ${selected ? "selected" : ""} ${correct ? "correct" : ""} ${incorrect ? "incorrect" : ""}"
                        onclick="selectAnswer(${index})"
                        ${submitted ? "disabled" : ""}
                    >
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span>${escapeHTML(option)}</span>
                        ${correct ? " ✓" : ""}
                    </button>
                `;
            }).join("")}
        </div>
    `;
}

function renderDropdown(question, answer) {
    return `
        <label class="answer-label" for="dropdown-answer">
            Select the correct answer:
        </label>

        <select
            id="dropdown-answer"
            class="answer-select"
            onchange="setDropdownAnswer(this.value)"
            ${submitted ? "disabled" : ""}
        >
            <option value="">-- Select an answer --</option>

            ${question.options.map((option, index) => `
                <option
                    value="${index}"
                    ${answer === index ? "selected" : ""}
                >
                    ${escapeHTML(option)}
                </option>
            `).join("")}
        </select>

        ${submitted ? `
            <p class="correct-answer">
                Correct answer: ${escapeHTML(question.options[question.correctAnswer])}
            </p>
        ` : ""}
    `;
}

function renderMultipleSelect(question, answer) {
    const answers = Array.isArray(answer) ? answer : [];

    return `
        <p class="answer-instruction">
            Select all correct answers.
        </p>

        <div class="answer-options">
            ${question.options.map((option, index) => {
                const checked = answers.includes(index);
                const correct = submitted &&
                    question.correctAnswers.includes(index);

                const incorrect = submitted &&
                    checked &&
                    !question.correctAnswers.includes(index);

                return `
                    <label class="answer-option checkbox-option
                        ${checked ? "selected" : ""}
                        ${correct ? "correct" : ""}
                        ${incorrect ? "incorrect" : ""}">

                        <input
                            type="checkbox"
                            ${checked ? "checked" : ""}
                            onchange="toggleMultiple(${index}, this.checked)"
                            ${submitted ? "disabled" : ""}
                        >

                        <span>${escapeHTML(option)}</span>
                        ${correct ? " ✓" : ""}
                    </label>
                `;
            }).join("")}
        </div>

        ${submitted ? `
            <p class="correct-answer">
                Correct answers:
                ${question.correctAnswers.map(index =>
                    escapeHTML(question.options[index])
                ).join(", ")}
            </p>
        ` : ""}
    `;
}

function renderMatching(question, answer) {
    const answers = Array.isArray(answer)
        ? answer
        : Array(question.pairs.length).fill(null);

    const answerOptions = question.pairs.map(pair => pair.answer);

    return `
        <p class="answer-instruction">
            Match each item with its correct description.
        </p>

        <div class="matching-list">
            ${question.pairs.map((pair, row) => `
                <div class="matching-row">
                    <strong>${escapeHTML(pair.item)}</strong>

                    <select
                        class="answer-select"
                        onchange="setMatchingAnswer(${row}, this.value)"
                        ${submitted ? "disabled" : ""}
                    >
                        <option value="">-- Select a match --</option>

                        ${answerOptions.map((option, index) => `
                            <option
                                value="${index}"
                                ${answers[row] === index ? "selected" : ""}
                            >
                                ${escapeHTML(option)}
                            </option>
                        `).join("")}
                    </select>

                    ${submitted ? `
                        <small class="correct-answer">
                            Correct match: ${escapeHTML(pair.answer)}
                        </small>
                    ` : ""}
                </div>
            `).join("")}
        </div>
    `;
}

function renderOrdering(question, answer) {
    const answers = Array.isArray(answer)
        ? answer
        : Array(question.items.length).fill(null);

    return `
        <p class="answer-instruction">
            Assign a position to each activity. Position 1 should be first.
        </p>

        <div class="ordering-list">
            ${question.items.map((item, index) => `
                <div class="ordering-row">
                    <span>${escapeHTML(item)}</span>

                    <select
                        class="position-select"
                        onchange="setOrderingPosition(${index}, this.value)"
                        ${submitted ? "disabled" : ""}
                    >
                        <option value="">Position</option>

                        ${question.items.map((_, position) => `
                            <option
                                value="${position}"
                                ${answers[index] === position ? "selected" : ""}
                            >
                                ${position + 1}
                            </option>
                        `).join("")}
                    </select>
                </div>
            `).join("")}
        </div>

        ${submitted ? `
            <p class="correct-answer">
                Correct order:
                ${question.correctOrder.map(index =>
                    escapeHTML(question.items[index])
                ).join(" → ")}
            </p>
        ` : ""}
    `;
}

// ---------- QUESTION DISPLAY ----------

function showQuestion() {
    const question = getQuestion();
    const type = question.type || "multipleChoice";
    const answer = getAnswer();

    const marked = reviewQuestions.includes(currentQuestion);
    const progress = Math.round(
        ((currentQuestion + 1) / questions.length) * 100
    );

    let questionInput = "";

    switch (type) {
        case "dropdown":
            questionInput = renderDropdown(question, answer);
            break;

        case "multipleSelect":
            questionInput = renderMultipleSelect(question, answer);
            break;

        case "matching":
            questionInput = renderMatching(question, answer);
            break;

        case "ordering":
            questionInput = renderOrdering(question, answer);
            break;

        default:
            questionInput = renderMultipleChoice(question, answer);
    }

    const caseStudy = question.caseStudy
        ? `
            <div class="case-study">
                <h3>${escapeHTML(question.caseStudy.title)}</h3>
                <p>${escapeHTML(question.caseStudy.scenario)}</p>
            </div>
        `
        : "";

    const feedback = submitted
        ? `
            <div class="explanation">
                <h3>Answer explanation</h3>
                <p>${escapeHTML(question.explanation || "No explanation provided.")}</p>
            </div>
        `
        : "";

    app.innerHTML = `
        <div class="exam-header">
            <div>
                <h1>MS-700 Exam Simulator</h1>
                <p>${examMode === "exam" ? "Examination mode" : "Practice mode"}</p>
            </div>

            <div class="timer-box">
                <span>Time remaining</span>
                <strong id="timer">
                    ${examMode === "exam" ? formatTime(timeRemaining) : "No timer"}
                </strong>
            </div>
        </div>

        <div class="progress-section">
            <div class="progress-text">
                <span>Question ${currentQuestion + 1} of ${questions.length}</span>
                <span>${answeredCount()} answered</span>
            </div>

            <div class="progress-track">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>

        <div class="exam-layout">
            <section class="question-panel">
                <div class="question-meta">
                    <span>${escapeHTML(question.topic || "MS-700")}</span>
                    <span>${escapeHTML(questionTypeLabel(type))}</span>
                </div>

                ${caseStudy}

                <h2>${escapeHTML(question.question)}</h2>

                ${questionInput}

                ${feedback}

                <div class="question-actions">
                    <button
                        class="secondary-button"
                        onclick="toggleReview()"
                        ${submitted ? "disabled" : ""}
                    >
                        ${marked ? "★ Marked for review" : "☆ Mark for review"}
                    </button>

                    ${submitted ? `
                        <button class="primary-button" onclick="showResults()">
                            Back to results
                        </button>
                    ` : ""}
                </div>

                <div class="navigation-buttons">
                    <button
                        class="secondary-button"
                        onclick="previousQuestion()"
                        ${currentQuestion === 0 ? "disabled" : ""}
                    >
                        Previous
                    </button>

                    ${currentQuestion < questions.length - 1 ? `
                        <button class="primary-button" onclick="nextQuestion()">
                            Next
                        </button>
                    ` : ""}
                </div>
            </section>

            <aside class="question-sidebar">
                <h3>Question navigator</h3>

                <div class="question-grid">
                    ${questions.map((_, index) => `
                        <button
                            class="question-number
                                ${index === currentQuestion ? "active" : ""}
                                ${isAnswered(index) ? "answered" : ""}
                                ${reviewQuestions.includes(index) ? "marked" : ""}"
                            onclick="goToQuestion(${index})"
                        >
                            ${index + 1}
                        </button>
                    `).join("")}
                </div>

                <div class="legend">
                    <p><span class="legend-dot answered-dot"></span> Answered</p>
                    <p><span class="legend-dot marked-dot"></span> Marked for review</p>
                    <p><span class="legend-dot"></span> Not answered</p>
                </div>

                <div class="sidebar-summary">
                    <p>Answered: <strong>${answeredCount()}</strong></p>
                    <p>Unanswered: <strong>${unansweredCount()}</strong></p>
                    <p>Review flags: <strong>${reviewQuestions.length}</strong></p>
                </div>

                ${!submitted ? `
                    <button class="submit-button" onclick="submitExam()">
                        Submit exam
                    </button>
                ` : ""}
            </aside>
        </div>
    `;
}

// ---------- SCORING ----------

function isCorrect(index) {
    const question = questions[index];
    const answer = selectedAnswers[index];

    if (!isAnswered(index)) return false;

    switch (question.type || "multipleChoice") {
        case "multipleSelect": {
            const correct = [...question.correctAnswers].sort();
            const selected = [...answer].sort();

            return correct.length === selected.length &&
                correct.every((value, i) => value === selected[i]);
        }

        case "matching":
            return question.correctMatches.every(
                (correct, i) => answer[i] === correct
            );

        case "ordering": {
            const userOrder = answer
                .map((position, itemIndex) => ({
                    position,
                    itemIndex
                }))
                .sort((a, b) => a.position - b.position)
                .map(item => item.itemIndex);

            return question.correctOrder.every(
                (correct, i) => userOrder[i] === correct
            );
        }

        default:
            return answer === question.correctAnswer;
    }
}

function calculateScore() {
    return questions.filter((_, index) => isCorrect(index)).length;
}

// ---------- SUBMIT EXAM ----------

function submitExam() {
    if (submitted) return;

    const unanswered = unansweredCount();

    const message = unanswered > 0
        ? `You have ${unanswered} unanswered question(s). Are you sure you want to submit?`
        : "Are you sure you want to submit your exam?";

    if (confirm(message)) {
        finishExam(false);
    }
}

function finishExam(timeExpired) {
    if (submitted) return;

    submitted = true;
    clearInterval(timerInterval);

    showResults(timeExpired);
}

// ---------- RESULTS ----------

function showResults(timeExpired = false) {
    const score = calculateScore();
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const unanswered = unansweredCount();
    const incorrect = total - score - unanswered;

    const topicResults = {};

    questions.forEach((question, index) => {
        const topic = question.topic || "Other";

        if (!topicResults[topic]) {
            topicResults[topic] = {
                total: 0,
                correct: 0
            };
        }

        topicResults[topic].total++;

        if (isCorrect(index)) {
            topicResults[topic].correct++;
        }
    });

    app.innerHTML = `
        <div class="results-container">
            <h1>MS-700 Exam Results</h1>

            ${timeExpired ? `
                <p class="warning-message">Your examination time has expired.</p>
            ` : ""}

            <div class="score-card">
                <h2>${percentage}%</h2>
                <p>Overall score</p>
                <strong>${score} out of ${total} correct</strong>
            </div>

            <div class="result-summary">
                <div>
                    <strong>${score}</strong>
                    <span>Correct</span>
                </div>

                <div>
                    <strong>${incorrect}</strong>
                    <span>Incorrect</span>
                </div>

                <div>
                    <strong>${unanswered}</strong>
                    <span>Unanswered</span>
                </div>
            </div>

            <h2>Topic performance</h2>

            <div class="topic-results">
                ${Object.entries(topicResults).map(([topic, result]) => {
                    const topicPercentage = Math.round(
                        (result.correct / result.total) * 100
                    );

                    return `
                        <div class="topic-result">
                            <div class="topic-result-heading">
                                <strong>${escapeHTML(topic)}</strong>
                                <span>${result.correct}/${result.total} (${topicPercentage}%)</span>
                            </div>

                            <div class="progress-track">
                                <div class="progress-fill" style="width: ${topicPercentage}%"></div>
                            </div>
                        </div>
                    `;
                }).join("")}
            </div>

            <h2>Review your answers</h2>

            <div class="review-results">
                ${questions.map((question, index) => `
                    <div class="review-result-row">
                        <span>
                            Question ${index + 1} —
                            ${isCorrect(index) ? "Correct" : isAnswered(index) ? "Incorrect" : "Unanswered"}
                        </span>

                        <button
                            class="secondary-button"
                            onclick="goToQuestion(${index})"
                        >
                            Review
                        </button>
                    </div>
                `).join("")}
            </div>

            <button class="primary-button restart-button" onclick="startExam('${examMode}')">
                Restart ${examMode === "exam" ? "exam" : "practice"}
            </button>

            <button class="secondary-button" onclick="location.reload()">
                Return to home page
            </button>
        </div>
    `;
}
