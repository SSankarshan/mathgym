export function renderSummary(summary, weaknesses) {

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
<span class="analyticsLabel">Accuracy</span>
<span class="analyticsValue">${summary.averageAccuracy.toFixed(1)}%</span>
</div>

<div class="analyticsRow">
<span class="analyticsLabel">Average Time</span>
<span class="analyticsValue">${(summary.averageResponseTimeMs/1000).toFixed(2)} sec</span>
</div>

</div>

</div>

<div class="analyticsSection">

<h2>Weak Tables</h2>

${weaknesses.weakTables
.slice(0,5)
.map(table => `

<div class="analyticsCard">

<b>Table ${table.key}</b><br>

Accuracy :
${table.accuracy.toFixed(1)}%<br>

Average Time :
${(table.averageTime/1000).toFixed(2)} sec

</div>

`).join("")}

</div>

<div class="analyticsSection">

<h2>Weak Multipliers</h2>

${weaknesses.weakMultipliers
.slice(0,5)
.map(m => `

<div class="analyticsCard">

<b>${m.key}</b><br>

Accuracy :
${m.accuracy.toFixed(1)}%<br>

Average Time :
${(m.averageTime/1000).toFixed(2)} sec

</div>

`).join("")}

</div>

<div class="analyticsSection">

<h2>Hardest Questions</h2>

${weaknesses.slowQuestions
.slice(0,5)
.map(q => `

<div class="analyticsCard">

<b>${q.question}</b><br>

Accuracy :
${q.accuracy.toFixed(1)}%<br>

Average Time :
${(q.averageTime/1000).toFixed(2)} sec

</div>

`).join("")}

</div>

`;

}