export function calculateSummary(sessions) {

    if (sessions.length === 0) {

        return {

            totalSessions: 0,

            totalQuestions: 0,

            totalCorrect: 0,

            totalWrong: 0,

            practiceDays: 0,

            firstPractice: null,

            lastPractice: null,

            totalPracticeTimeMs: 0,

            averageAccuracy: 0,

            bestAccuracy: 0,

            worstAccuracy: 0,

            averageResponseTimeMs: 0,

            fastestSessionMs: 0,

            slowestSessionMs: 0

        };

    }

    let totalQuestions = 0;

    let totalCorrect = 0;

    let totalWrong = 0;

    let totalPracticeTimeMs = 0;

    let accuracySum = 0;

    let responseTimeSum = 0;

    let bestAccuracy = 0;

    let worstAccuracy = 100;

    let fastestSession = Number.MAX_VALUE;

    let slowestSession = 0;

    const practiceDays = new Set();

    let firstPractice = null;

    let lastPractice = null;

    for (const session of sessions) {

        const stats =
            session.statistics;

        if (!stats) {

            continue;

        }

        totalQuestions +=
            stats.totalQuestions ?? 0;

        totalCorrect +=
            stats.correct ?? 0;

        totalWrong +=
            stats.wrong ?? 0;

        accuracySum +=
            stats.accuracy ?? 0;

        responseTimeSum +=
            stats.averageTime ?? 0;

        bestAccuracy = Math.max(

            bestAccuracy,

            stats.accuracy ?? 0

        );

        worstAccuracy = Math.min(

            worstAccuracy,

            stats.accuracy ?? 0

        );

        fastestSession = Math.min(

            fastestSession,

            stats.averageTime ?? Number.MAX_VALUE

        );

        slowestSession = Math.max(

            slowestSession,

            stats.averageTime ?? 0

        );

        if (

            session.startedAt &&

            session.finishedAt

        ) {

            totalPracticeTimeMs +=

                new Date(session.finishedAt) -

                new Date(session.startedAt);

        }

        if (session.startedAt) {

            practiceDays.add(

                session.startedAt.substring(

                    0,

                    10

                )

            );

            const started =

                new Date(

                    session.startedAt

                );

            if (

                !firstPractice ||

                started < firstPractice

            ) {

                firstPractice = started;

            }

            if (

                !lastPractice ||

                started > lastPractice

            ) {

                lastPractice = started;

            }

        }

    }

    if (

        fastestSession ===

        Number.MAX_VALUE

    ) {

        fastestSession = 0;

    }

    if (

        worstAccuracy ===

        100 &&

        bestAccuracy === 0

    ) {

        worstAccuracy = 0;

    }

    return {

        totalSessions:

            sessions.length,

        totalQuestions,

        totalCorrect,

        totalWrong,

        practiceDays:

            practiceDays.size,

        firstPractice,

        lastPractice,

        totalPracticeTimeMs,

        averageAccuracy:

            accuracySum /

            sessions.length,

        bestAccuracy,

        worstAccuracy,

        averageResponseTimeMs:

            responseTimeSum /

            sessions.length,

        fastestSessionMs:

            fastestSession,

        slowestSessionMs:

            slowestSession

    };

}