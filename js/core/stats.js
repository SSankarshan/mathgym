function median(values) {

    if (values.length === 0)
        return 0;

    const mid = Math.floor(values.length / 2);

    if (values.length % 2 === 0)
        return (values[mid - 1] + values[mid]) / 2;

    return values[mid];

}

function calculateQuestionPerMinute(answers) {

    if (answers.length === 0)
        return 0;

    const totalTimeMs = answers.reduce(

        (sum, answer) => sum + answer.responseTimeMs,

        0

    );

    if (totalTimeMs === 0)
        return 0;

    return answers.length / (totalTimeMs / 60000);

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

        .map(tableStats => ({

            table: tableStats.table,

            accuracy:
                tableStats.correct * 100 / tableStats.total,

            averageTime:
                tableStats.totalTime / tableStats.total

        }))

        .sort((first, second) => {

            if (first.accuracy !== second.accuracy)
                return first.accuracy - second.accuracy;

            return second.averageTime - first.averageTime;

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

        .map(multiplierStats => ({

            multiplier: multiplierStats.multiplier,

            accuracy:
                multiplierStats.correct * 100 / multiplierStats.total,

            averageTime:
                multiplierStats.totalTime / multiplierStats.total

        }))

        .sort((first, second) => {

            if (first.accuracy !== second.accuracy)
                return first.accuracy - second.accuracy;

            return second.averageTime - first.averageTime;

        });

}

export function calculate(session) {

    const answers = session.answers;

    const totalQuestions = answers.length;

    const correctAnswers = answers.filter(answer => answer.correct);

    const wrongAnswers = answers.filter(answer => !answer.correct);

    const responseTimes = answers

        .map(answer => answer.responseTimeMs)

        .sort((first, second) => first - second);

    const totalTime = responseTimes.reduce(

        (sum, time) => sum + time,

        0

    );

    return {

        totalQuestions,

        correct: correctAnswers.length,

        wrong: wrongAnswers.length,

        accuracy:

            totalQuestions === 0

                ? 0

                : (correctAnswers.length * 100) / totalQuestions,

        averageTime:

            totalQuestions === 0

                ? 0

                : totalTime / totalQuestions,

        medianTime:

            median(responseTimes),

        fastest:

            responseTimes.length === 0

                ? 0

                : responseTimes[0],

        slowest:

            responseTimes.length === 0

                ? 0

                : responseTimes[responseTimes.length - 1],

        questionPerMinute:

            calculateQuestionPerMinute(answers),

        wrongQuestions:

            wrongAnswers,

        slowestQuestions:

            [...answers]

                .sort(

                    (first, second) =>

                        second.responseTimeMs - first.responseTimeMs

                )

                .slice(0, 10),

        weakTables:

            calculateWeakTables(answers),

        weakMultipliers:

            calculateWeakMultipliers(answers)

    };

}