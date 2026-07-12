export function calculateWeaknesses(sessions) {

    return {

        weakTables:
            aggregateTables(sessions),

        weakMultipliers:
            aggregateMultipliers(sessions),

        slowQuestions:
            aggregateSlowQuestions(sessions)

    };

}

function aggregateTables(sessions) {

    const map = new Map();

    for (const session of sessions) {

        const list =
            session.statistics?.weakTables ?? [];

        for (const table of list) {

            if (!map.has(table.table)) {

                map.set(table.table, {

                    key: table.table,

                    attempts: 0,

                    accuracySum: 0,

                    timeSum: 0

                });

            }

            const stats =
                map.get(table.table);

            stats.attempts++;

            stats.accuracySum +=
                table.accuracy;

            stats.timeSum +=
                table.averageTime;

        }

    }

    return [...map.values()]

        .map(item => ({

            key: item.key,

            attempts: item.attempts,

            accuracy:

                item.accuracySum /

                item.attempts,

            averageTime:

                item.timeSum /

                item.attempts

        }))

        .sort(

            (a, b) =>

                a.accuracy -

                b.accuracy

        );

}

function aggregateMultipliers(sessions) {

    const map = new Map();

    for (const session of sessions) {

        const list =
            session.statistics?.weakMultipliers ?? [];

        for (const multiplier of list) {

            if (!map.has(multiplier.multiplier)) {

                map.set(

                    multiplier.multiplier,

                    {

                        key:
                            multiplier.multiplier,

                        attempts: 0,

                        accuracySum: 0,

                        timeSum: 0

                    }

                );

            }

            const stats =
                map.get(

                    multiplier.multiplier

                );

            stats.attempts++;

            stats.accuracySum +=

                multiplier.accuracy;

            stats.timeSum +=

                multiplier.averageTime;

        }

    }

    return [...map.values()]

        .map(item => ({

            key: item.key,

            attempts: item.attempts,

            accuracy:

                item.accuracySum /

                item.attempts,

            averageTime:

                item.timeSum /

                item.attempts

        }))

        .sort(

            (a, b) =>

                a.accuracy -

                b.accuracy

        );

}

function aggregateSlowQuestions(sessions) {

    const map = new Map();

    for (const session of sessions) {

        const list =
            session.statistics?.slowestQuestions ?? [];

        for (const item of list) {

            const key =
                item.question.display;

            if (!map.has(key)) {

                map.set(

                    key,

                    {

                        question: key,

                        attempts: 0,

                        correct: 0,

                        totalTime: 0

                    }

                );

            }

            const stats =
                map.get(key);

            stats.attempts++;

            if (item.correct) {

                stats.correct++;

            }

            stats.totalTime +=
                item.responseTimeMs;

        }

    }

    return [...map.values()]

        .map(

            stats => ({

                question:
                    stats.question,

                attempts:
                    stats.attempts,

                accuracy:

                    stats.correct *

                    100 /

                    stats.attempts,

                averageTime:

                    stats.totalTime /

                    stats.attempts

            })

        )

        .sort(

            (a, b) =>

                b.averageTime -

                a.averageTime

        );

}