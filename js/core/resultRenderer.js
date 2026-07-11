import { formatTime } from "../utils/formatTime.js";

export function renderResult(session) {

    renderSummary(session.statistics);

    renderWrongQuestions(session.statistics);

    renderWeakTables(session.statistics);

    renderWeakMultipliers(session.statistics);

}

function renderSummary(statistics) {

    const summaryTable =
        document.getElementById("summaryTable");

    summaryTable.innerHTML = `

<tr>
    <td>Questions</td>
    <td>${statistics.totalQuestions}</td>
</tr>

<tr>
    <td>Correct</td>
    <td>${statistics.correct}</td>
</tr>

<tr>
    <td>Wrong</td>
    <td>${statistics.wrong}</td>
</tr>

<tr>
    <td>Accuracy</td>
    <td>${statistics.accuracy.toFixed(2)}%</td>
</tr>

<tr>
    <td>Average</td>
    <td>${formatTime(statistics.averageTime)}</td>
</tr>

<tr>
    <td>Median</td>
    <td>${formatTime(statistics.medianTime)}</td>
</tr>

<tr>
    <td>Fastest</td>
    <td>${formatTime(statistics.fastest)}</td>
</tr>

<tr>
    <td>Slowest</td>
    <td>${formatTime(statistics.slowest)}</td>
</tr>

<tr>
    <td>Questions / Minute</td>
    <td>${statistics.questionPerMinute.toFixed(2)}</td>
</tr>

`;

}

function renderWrongQuestions(statistics) {

    const wrongTable =
        document.getElementById("wrongTable");

    wrongTable.innerHTML = `

<tr>

<th>Question</th>

<th>Your Answer</th>

<th>Correct</th>

<th>Time</th>

</tr>

`;

    statistics.wrongQuestions.forEach(answer => {

        wrongTable.innerHTML += `

<tr>

<td>${answer.question.display}</td>

<td>${answer.userAnswer}</td>

<td>${answer.question.answer}</td>

<td>${formatTime(answer.responseTimeMs)}</td>

</tr>

`;

    });

}

function renderWeakTables(statistics) {

    const weakTable =
        document.getElementById("weakTable");

    weakTable.innerHTML = `

<tr>

<th>Table</th>

<th>Accuracy</th>

<th>Average Time</th>

</tr>

`;

    statistics.weakTables.forEach(table => {

        weakTable.innerHTML += `

<tr>

<td>${table.table}</td>

<td>${table.accuracy.toFixed(2)}%</td>

<td>${formatTime(table.averageTime)}</td>

</tr>

`;

    });

}

function renderWeakMultipliers(statistics) {

    const weakMultiplierTable =
        document.getElementById("weakMultiplierTable");

    if (!weakMultiplierTable) {
        return;
    }

    weakMultiplierTable.innerHTML = `

<tr>

<th>Multiplier</th>

<th>Accuracy</th>

<th>Average Time</th>

</tr>

`;

    statistics.weakMultipliers.forEach(multiplier => {

        weakMultiplierTable.innerHTML += `

<tr>

<td>${multiplier.multiplier}</td>

<td>${multiplier.accuracy.toFixed(2)}%</td>

<td>${formatTime(multiplier.averageTime)}</td>

</tr>

`;

    });

}