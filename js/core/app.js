import { initializeCalculator } from "./calculator.js";
import { calculate } from "./stats.js";
import { renderResult } from "./resultRenderer.js";
import { renderDashboard } from "./dashboardRenderer.js";

import SessionManager from "./SessionManager.js";
import QuestionQueue from "./QuestionQueue.js";

import { generateQuestions } from "../engine/engine.js";
import { CONFIG } from "../config/config.js";

import Session from "../models/Session.js";
import Answer from "../models/Answer.js";

import StorageManager from "../storage/StorageManager.js";

const dashboardScreen =
    document.getElementById("dashboardScreen");

const practiceScreen =
    document.getElementById("practiceScreen");

const resultScreen =
    document.getElementById("resultScreen");

const questionElement =
    document.getElementById("question");

const progressElement =
    document.getElementById("progress");

const answerInput =
    document.getElementById("answer");

const storageManager =
    new StorageManager();

let session = null;

let questionQueue = null;

let sessionManager = null;

let currentQuestion = null;

let startTime = 0;

let sessionFinished = false;

initializeCalculator(submit);

renderDashboard(storageManager);

document
    .getElementById("tablesButton")
    .addEventListener(
        "click",
        () => startPractice("TABLES")
    );

document
    .getElementById("squaresButton")
    ?.addEventListener(
        "click",
        () => startPractice("SQUARES")
    );

document
    .getElementById("cubesButton")
    ?.addEventListener(
        "click",
        () => startPractice("CUBES")
    );

document
    .getElementById("squareRootsButton")
    ?.addEventListener(
        "click",
        () => startPractice("SQUARE_ROOTS")
    );

document
    .getElementById("cubeRootsButton")
    ?.addEventListener(
        "click",
        () => startPractice("CUBE_ROOTS")
    );


document
    .getElementById("equivalentsButton")
    ?.addEventListener(
        "click",
        () => startPractice("EQUIVALENTS")
    );

document
    .getElementById("ratiosButton")
    ?.addEventListener(
        "click",
        () => alert("Coming Soon")
    );

document
    .getElementById("mixedButton")
    ?.addEventListener(
        "click",
        () => alert("Coming Soon")
    );

document
    .getElementById("restartButton")
    .addEventListener(
        "click",
        backToDashboard
    );

function startPractice(practiceType) {

    dashboardScreen.hidden = true;

    resultScreen.hidden = true;

    practiceScreen.hidden = false;

    sessionFinished = false;

    session =
        new Session(practiceType);

    questionQueue =
        new QuestionQueue(
            generateQuestions(practiceType)
        );

    sessionManager =
        new SessionManager(
            session,
            questionQueue
        );

    showQuestion();

}


function showQuestion() {

    if (!sessionManager.hasNextQuestion()) {

        finishSession();

        return;

    }

    currentQuestion =
        sessionManager.getCurrentQuestion();

    questionElement.innerHTML =
        currentQuestion.display.replace(
            /\n/g,
            "<br>"
        );

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

    const answer =
        new Answer({

            question:
                currentQuestion,

            userAnswer:
                Number(
                    answerText
                ),

            responseTimeMs:
                Math.round(
                    performance.now() -
                    startTime
                )

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

    practiceScreen.hidden = true;

    resultScreen.hidden = false;

    renderResult(session);

}

function backToDashboard() {

    resultScreen.hidden = true;

    dashboardScreen.hidden = false;

    renderDashboard(storageManager);

}