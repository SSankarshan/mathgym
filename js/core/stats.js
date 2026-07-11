function median(values) {

    if (values.length === 0)
        return 0;

    const mid = Math.floor(values.length / 2);

    if (values.length % 2 === 0)
        return (values[mid - 1] + values[mid]) / 2;

    return values[mid];

}

function calculateWeakTables(answers) {

    const map = {};

    answers.forEach(answer => {

        const table = answer.question.operands[0];

        if (!map[table]) {

            map[table] = {

                table,

                total: 0,

                correct: 0,

                totalTime: 0

            };

        }

        map[table].total++;

        if (answer.correct)
            map[table].correct++;

        map[table].totalTime += answer.responseTimeMs;

    });

    return Object.values(map)

        .map(t => ({

            table: t.table,

            accuracy: t.correct * 100 / t.total,

            averageTime: t.totalTime / t.total

        }))

        .sort((a, b) => {

            if (a.accuracy !== b.accuracy)
                return a.accuracy - b.accuracy;

            return b.averageTime - a.averageTime;

        });

}

function calculateWeakMultipliers(answers) {

    const map = {};

    answers.forEach(answer => {

        const multiplier = answer.question.operands[1];

        if (!map[multiplier]) {

            map[multiplier] = {

                multiplier,

                total: 0,

                correct: 0,

                totalTime: 0

            };

        }

        map[multiplier].total++;

        if (answer.correct)
            map[multiplier].correct++;

        map[multiplier].totalTime += answer.responseTimeMs;

    });

    return Object.values(map)

        .map(m => ({

            multiplier: m.multiplier,

            accuracy: m.correct * 100 / m.total,

            averageTime: m.totalTime / m.total

        }))

        .sort((a, b) => {

            if (a.accuracy !== b.accuracy)
                return a.accuracy - b.accuracy;

            return b.averageTime - a.averageTime;

        });

}

export function calculate(session) {

    const answers = session.answers;

    const totalQuestions = answers.length;

    const correctAnswers = answers.filter(a => a.correct);

    const wrongAnswers = answers.filter(a => !a.correct);

    const responseTimes = answers
        .map(a => a.responseTimeMs)
        .sort((a, b) => a - b);

    const totalTime = responseTimes.reduce((s, t) => s + t, 0);

    return {

        totalQuestions,

        correct: correctAnswers.length,

        wrong: wrongAnswers.length,

        accuracy:
            totalQuestions === 0
                ? 0
                : correctAnswers.length * 100 / totalQuestions,

        averageTime:
            totalQuestions === 0
                ? 0
                : totalTime / totalQuestions,

        medianTime: median(responseTimes),

        fastest:
            responseTimes.length === 0
                ? 0
                : responseTimes[0],

        slowest:
            responseTimes.length === 0
                ? 0
                : responseTimes[responseTimes.length - 1],

        wrongQuestions: wrongAnswers,

        slowestQuestions: [...answers]
            .sort((a, b) => b.responseTimeMs - a.responseTimeMs)
            .slice(0, 10),

        weakTables: calculateWeakTables(answers),

        weakMultipliers: calculateWeakMultipliers(answers)

    };

}