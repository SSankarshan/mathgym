import { initializeCalculator } from "./calculator.js";
import { calculate } from "./stats.js";
import { saveSession } from "../storage/storage.js";
import { generateQuestions } from "../engine/engine.js";

import Session from "../models/Session.js";
import Answer from "../models/Answer.js";

const questionElement = document.getElementById("question");
const progressElement = document.getElementById("progress");
const answerInput = document.getElementById("answer");

const questions = Object.freeze(generateQuestions());

const session = new Session("TABLES");

let currentIndex = 0;
let startTime = 0;
let sessionFinished = false;

initializeCalculator(submit);

showQuestion();

function showQuestion() {

    if (currentIndex >= questions.length) {

        finishSession();

        return;

    }

    const question = questions[currentIndex];

    questionElement.textContent = question.display;

    progressElement.textContent =
        `${currentIndex + 1} / ${questions.length}`;

    answerInput.value = "";

    answerInput.focus();

    startTime = performance.now();

}

function submit() {

    if (sessionFinished)
        return;

    const value = answerInput.value.trim();

    if (value === "")
        return;

    const question = questions[currentIndex];

    session.add(

        new Answer({

            question,

            userAnswer: parseInt(value, 10),

            responseTimeMs:
                Math.round(performance.now() - startTime)

        })

    );

    currentIndex++;

    showQuestion();

}

function finishSession() {

    sessionFinished = true;

    session.finish();

    session.statistics = calculate(session);

    saveSession(session);

    document.getElementById("practiceScreen").hidden = true;

    document.getElementById("resultScreen").hidden = false;

    renderSummary();

}

function renderSummary() {

    const summary = document.getElementById("summaryTable");

    const wrong = document.getElementById("wrongTable");

    const weak = document.getElementById("weakTable");

    const s = session.statistics;

    summary.innerHTML = `

<tr><td>Questions</td><td>${s.totalQuestions}</td></tr>

<tr><td>Correct</td><td>${s.correct}</td></tr>

<tr><td>Wrong</td><td>${s.wrong}</td></tr>

<tr><td>Accuracy</td><td>${s.accuracy.toFixed(2)}%</td></tr>

<tr><td>Average</td><td>${(s.averageTime / 1000).toFixed(2)} sec</td></tr>

<tr><td>Median</td><td>${(s.medianTime / 1000).toFixed(2)} sec</td></tr>

<tr><td>Fastest</td><td>${(s.fastest / 1000).toFixed(2)} sec</td></tr>

<tr><td>Slowest</td><td>${(s.slowest / 1000).toFixed(2)} sec</td></tr>

`;

    wrong.innerHTML =

        "<tr><th>Question</th><th>Your</th><th>Correct</th><th>Time</th></tr>";

    s.wrongQuestions.forEach(a => {

        wrong.innerHTML += `

<tr>

<td>${a.question.display}</td>

<td>${a.userAnswer}</td>

<td>${a.question.answer}</td>

<td>${(a.responseTimeMs / 1000).toFixed(2)}</td>

</tr>

`;

    });

    weak.innerHTML =

        "<tr><th>Table</th><th>Accuracy</th><th>Average Time</th></tr>";

    s.weakTables.forEach(t => {

        weak.innerHTML += `

<tr>

<td>${t.table}</td>

<td>${t.accuracy.toFixed(2)}%</td>

<td>${(t.averageTime / 1000).toFixed(2)} sec</td>

</tr>

`;

    });

}

document
    .getElementById("restartButton")
    .addEventListener("click", () => {

        location.reload();

    });