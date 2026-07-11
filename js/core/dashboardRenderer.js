import { formatTime } from "../utils/formatTime.js";

export function renderDashboard(storageManager) {

    const sessionList =
        storageManager.loadSessions();

    let totalSessions = sessionList.length;

    let totalQuestions = 0;

    let bestAccuracy = 0;

    let fastestAverageTime = Number.MAX_VALUE;

    let totalPracticeTime = 0;

    sessionList.forEach(session => {

        if (!session.statistics) {
            return;
        }

        totalQuestions +=
            session.statistics.totalQuestions;

        bestAccuracy = Math.max(

            bestAccuracy,

            session.statistics.accuracy

        );

        fastestAverageTime = Math.min(

            fastestAverageTime,

            session.statistics.averageTime

        );

        totalPracticeTime +=

            session.answers.reduce(

                (sum, answer) =>

                    sum + answer.responseTimeMs,

                0

            );

    });

    document.getElementById(

        "dashboardTotalSessions"

    ).textContent = totalSessions;

    document.getElementById(

        "dashboardTotalQuestions"

    ).textContent = totalQuestions;

    document.getElementById(

        "dashboardBestAccuracy"

    ).textContent =

        bestAccuracy.toFixed(2) + "%";

    document.getElementById(

        "dashboardFastestAverage"

    ).textContent =

        fastestAverageTime === Number.MAX_VALUE

            ? "-"

            : formatTime(fastestAverageTime);

    updateDashboardTitle(

        totalSessions,

        totalQuestions,

        totalPracticeTime

    );

}

function updateDashboardTitle(

    totalSessions,

    totalQuestions,

    totalPracticeTime

) {

    const title =
        document.querySelector("#dashboardScreen h1");

    if (totalSessions === 0) {

        title.textContent =
            "Mental Math Gym";

        return;

    }

    const totalMinutes = Math.floor(

        totalPracticeTime / 60000

    );

    title.textContent =

        `Mental Math Gym • ${totalQuestions} Questions • ${totalMinutes} min`;

}