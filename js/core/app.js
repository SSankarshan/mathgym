import { initializeCalculator } from "./calculator.js";
import { calculate } from "./stats.js";
import { renderResult } from "./resultRenderer.js";
import SessionManager from "./SessionManager.js";
import QuestionQueue from "./QuestionQueue.js";

import { generateQuestions } from "../engine/engine.js";
import { CONFIG } from "../config/config.js";

import Session from "../models/Session.js";
import Answer from "../models/Answer.js";

import StorageManager from "../storage/StorageManager.js";

const questionElement = document.getElementById("question");
const progressElement = document.getElementById("progress");
const answerInput = document.getElementById("answer");

const storageManager = new StorageManager();

const questionQueue =
    new QuestionQueue(generateQuestions());

const session =
    new Session("TABLES");

const sessionManager =
    new SessionManager(
        session,
        questionQueue
    );

let currentQuestion = null;
let startTime = 0;
let sessionFinished = false;

initializeCalculator(submit);

showQuestion();

function showQuestion() {

    if (!sessionManager.hasNextQuestion()) {

        finishSession();

        return;

    }

    currentQuestion =
        sessionManager.getCurrentQuestion();

    questionElement.textContent =
        currentQuestion.display;

    const solvedQuestionCount =
        session.getQuestionSolvedCount();

    const totalQuestionCount =
        solvedQuestionCount +
        questionQueue.getTotalQuestionCount() +
        1;

    progressElement.textContent =
        `${solvedQuestionCount + 1} / ${totalQuestionCount}`;

    answerInput.value = "";

    answerInput.focus();

    startTime = performance.now();

}

function submit() {

    if (sessionFinished) {
        return;
    }

    const answerText =
        answerInput.value.trim();

    if (answerText === "") {
        return;
    }

    const responseTimeMs =
        Math.round(performance.now() - startTime);

    const answer =
        new Answer({

            question: currentQuestion,

            userAnswer:
                parseInt(answerText, 10),

            responseTimeMs

        });

    sessionManager.addAnswer(answer);

    handleAdaptiveQueue(answer);

    showQuestion();

}

function handleAdaptiveQueue(answer) {

    if (!CONFIG.session.adaptiveMode) {
        return;
    }

    if (
        CONFIG.session.repeatWrongQuestion &&
        !answer.correct
    ) {

        questionQueue.repeatQuestion(

            answer.question,

            CONFIG.session.repeatWrongQuestionAfter

        );

        return;

    }

    if (
        CONFIG.session.repeatSlowQuestion &&
        answer.responseTimeMs >
        CONFIG.session.slowQuestionThresholdMs
    ) {

        questionQueue.repeatQuestion(

            answer.question,

            CONFIG.session.repeatSlowQuestionAfter

        );

    }

}

function finishSession() {

    if (sessionFinished) {
        return;
    }

    sessionFinished = true;

    sessionManager.finish();

    session.statistics =
        calculate(session);

    storageManager.saveSession(session);

    document.getElementById(
        "practiceScreen"
    ).hidden = true;

    document.getElementById(
        "resultScreen"
    ).hidden = false;

    renderResult(session);

}

document
    .getElementById("restartButton")
    .addEventListener(
        "click",
        () => window.location.reload()
    );