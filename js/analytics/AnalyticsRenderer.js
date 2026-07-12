export function renderSummary(

    summary,

    trend

) {

    const analytics =
        document.getElementById(
            "analyticsContent"
        );

    analytics.innerHTML = `

<div class="analyticsSection">

<h2>Lifetime Summary</h2>

<div class="analyticsCard">

<div class="analyticsRow">
<span class="analyticsLabel">Sessions</span>
<span class="analyticsValue">${summary.totalSessions}</span>
</div>

<div class="analyticsRow">
<span class="analyticsLabel">Questions</span>
<span class="analyticsValue">${summary.totalQuestions}</span>
</div>

<div class="analyticsRow">
<span class="analyticsLabel">Correct</span>
<span class="analyticsValue">${summary.totalCorrect}</span>
</div>

<div class="analyticsRow">
<span class="analyticsLabel">Wrong</span>
<span class="analyticsValue">${summary.totalWrong}</span>
</div>

<div class="analyticsRow">
<span class="analyticsLabel">Practice Days</span>
<span class="analyticsValue">${summary.practiceDays}</span>
</div>

<div class="analyticsRow">
<span class="analyticsLabel">Average Accuracy</span>
<span class="analyticsValue">${summary.averageAccuracy.toFixed(1)}%</span>
</div>

<div class="analyticsRow">
<span class="analyticsLabel">Best Accuracy</span>
<span class="analyticsValue">${summary.bestAccuracy.toFixed(1)}%</span>
</div>

<div class="analyticsRow">
<span class="analyticsLabel">Average Speed</span>
<span class="analyticsValue">${(60000 / summary.averageResponseTimeMs).toFixed(2)} Questions / Minute</span>
</div>

</div>

</div>

<div class="analyticsSection">

<h2>Improvement Trend</h2>

<table>

<tr>

<th>#</th>

<th>Date</th>

<th>Accuracy</th>

<th>Avg Time</th>

<th>Questions</th>

</tr>

${trend.map(

session => `

<tr>

<td>${session.sessionNumber}</td>

<td>${session.date}</td>

<td>${session.accuracy.toFixed(1)}%</td>

<td>${(session.averageTimeMs / 1000).toFixed(2)} sec</td>

<td>${session.questions}</td>

</tr>

`

).join("")}

</table>

</div>

`;

}