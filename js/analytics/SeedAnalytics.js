import StorageManager from "../storage/StorageManager.js";

const storageManager = new StorageManager(false);

function random(min, max) {
    return Math.random() * (max - min) + min;
}

async function seed() {

    for (let i = 0; i < 20; i++) {

        const started =
            new Date();

        started.setDate(
            started.getDate() - (20 - i)
        );

        const accuracy =
            65 + i * 1.5 + random(-2, 2);

        const avgTime =
            5200 - i * 110 + random(-150, 150);

        const totalQuestions = 155;

        const correct =
            Math.round(
                totalQuestions * accuracy / 100
            );

        const wrong =
            totalQuestions - correct;

        const session = {

            version: 2,

            mode: "TABLES",

            startedAt:
                started.toISOString(),

            finishedAt:
                new Date(
                    started.getTime() +
                    avgTime * totalQuestions
                ).toISOString(),

            originalQuestionCount:
                totalQuestions,

            questionSolvedCount:
                totalQuestions,

            answers: [],

            statistics: {

                totalQuestions,

                correct,

                wrong,

                accuracy,

                averageTime: avgTime,

                fastest:
                    avgTime * 0.55,

                slowest:
                    avgTime * 2,

                medianTime:
                    avgTime,

                questionPerMinute:
                    60000 / avgTime

            }

        };

        await storageManager.createSession(
            session
        );
    }

    console.log("Finished.");
}

seed();