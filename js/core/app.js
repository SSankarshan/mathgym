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


import {

    login as loginUser,

    logout,

    observeAuthState

} from "../firebase/auth.js";


const loginScreen =
    document.getElementById(
        "loginScreen"
    );

const emailInput =
    document.getElementById(
        "email"
    );

const passwordInput =
    document.getElementById(
        "password"
    );

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

let storageManager;

let guestMode = false;

let session = null;

let questionQueue = null;

let sessionManager = null;

let currentQuestion = null;

let startTime = 0;

let sessionFinished = false;

initializeCalculator(submit);

observeAuthState(

    (user) => {

        if (guestMode) {

            return;

        }

        if (user) {

            storageManager =
                new StorageManager(false);

            loginScreen.hidden = true;

            dashboardScreen.hidden = false;

            practiceScreen.hidden = true;

            resultScreen.hidden = true;

            renderDashboard(

                storageManager

            );

        }

        else {

            loginScreen.hidden = false;

            dashboardScreen.hidden = true;

            practiceScreen.hidden = true;

            resultScreen.hidden = true;

        }

    }

);

// renderDashboard(storageManager);

document
    .getElementById("tablesButton")
    .addEventListener(
        "click",
        async () => startPractice("TABLES")
    );

document
    .getElementById("squaresButton")
    ?.addEventListener(
        "click",
        async () => startPractice("SQUARES")
    );

document
    .getElementById("cubesButton")
    ?.addEventListener(
        "click",
        async () => startPractice("CUBES")
    );

document
    .getElementById("squareRootsButton")
    ?.addEventListener(
        "click",
        async () => startPractice("SQUARE_ROOTS")
    );

document
    .getElementById("cubeRootsButton")
    ?.addEventListener(
        "click",
        async () => startPractice("CUBE_ROOTS")
    );


document
    .getElementById("equivalentsButton")
    ?.addEventListener(
        "click",
        async () => startPractice("EQUIVALENTS")
    );

document
    .getElementById("ratiosButton")
    ?.addEventListener(
        "click",
        async () => alert("Coming Soon")
    );

document
    .getElementById("mixedButton")
    ?.addEventListener(
        "click",
        async () => alert("Coming Soon")
    );

document
    .getElementById("restartButton")
    .addEventListener(
        "click",
        backToDashboard
    );
document

    .getElementById(
        "loginButton"
    )

    .addEventListener(

        "click",

        login

    );

    document

    .getElementById(

        "guestButton"

    )

    .addEventListener(

        "click",

        guestLogin

    );

document

    .getElementById("logoutButton")

    ?.addEventListener(

        "click",

        logoutUser

    );

document

    .getElementById("quitPracticeButton")

    .addEventListener(

        "click",

        quitPractice

    );

async function login() {

    try {

        guestMode = false;

        await loginUser(

            emailInput.value.trim(),

            passwordInput.value

        );

    }

    catch (error) {

        alert(error.message);

    }

}

function guestLogin() {

    guestMode = true;

    storageManager =
        new StorageManager(true);

    loginScreen.hidden = true;

    dashboardScreen.hidden = false;

    practiceScreen.hidden = true;

    resultScreen.hidden = true;

    renderDashboard(storageManager);

}

async function startPractice(practiceType) {

    dashboardScreen.hidden = true;

    resultScreen.hidden = true;

    practiceScreen.hidden = false;

    sessionFinished = false;

    session =
        new Session(practiceType);

    const questions =
        generateQuestions(practiceType);

    session.originalQuestionCount =
        questions.length;

    questionQueue =
        new QuestionQueue(questions);

    sessionManager =
        new SessionManager(

            session,

            questionQueue

        );

    await showQuestion();

}


async function showQuestion() {

    if (!sessionManager.hasNextQuestion()) {

        await finishSession();

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
        session.originalQuestionCount;

    progressElement.textContent =
        `${solvedQuestionCount + 1} / ${totalQuestionCount}`;

    answerInput.value = "";

    answerInput.focus();

    startTime = performance.now();

}

async function submit() {

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
    await saveCheckpoint();

    handleAdaptiveQueue(answer);

    await showQuestion();

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

async function finishSession() {

    alert("sessionFin");
    if (sessionFinished) {

        return;

    }

    sessionFinished = true;

    sessionManager.finish();

    session.statistics =
        calculate(session);

    if (

        session.firestoreId == null

    ) {

        await storageManager.createSession(

            session

        );

    }

    else {

        await storageManager.updateSession(

            session

        );

    }

    practiceScreen.hidden = true;

    resultScreen.hidden = false;

    renderResult(session);

}

function backToDashboard() {

    resultScreen.hidden = true;

    dashboardScreen.hidden = false;

    renderDashboard(storageManager);

}

async function logoutUser() {

    if (guestMode) {

        guestMode = false;

        storageManager = null;

        loginScreen.hidden = false;

        dashboardScreen.hidden = true;

        practiceScreen.hidden = true;

        resultScreen.hidden = true;

        return;

    }

    try {

        await logout();

    }

    catch (error) {

        alert(error.message);

    }

}

async function saveCheckpoint() {

    const solved =
        session.getQuestionSolvedCount();

    const total =
        session.originalQuestionCount;

    const percent =
        solved / total;

    if (

        percent >= 0.33 &&

        session.lastSavedCheckpoint < 1

    ) {

        if (

            session.firestoreId == null

        ) {

            await storageManager.createSession(

                session

            );

        }

        else {

            await storageManager.updateSession(

                session

            );

        }

        session.lastSavedCheckpoint = 1;

    }

    else if (

        percent >= 0.66 &&

        session.lastSavedCheckpoint < 2

    ) {

        await storageManager.updateSession(

            session

        );

        session.lastSavedCheckpoint = 2;

    }

}

function quitPractice() {

    if (

        !confirm(

            "Quit this practice?\n\nYour progress in this session will not be saved."

        )

    ) {

        return;

    }

    sessionFinished = true;

    session = null;

    questionQueue = null;

    sessionManager = null;

    practiceScreen.hidden = true;

    resultScreen.hidden = true;

    dashboardScreen.hidden = false;

    renderDashboard(storageManager);

}