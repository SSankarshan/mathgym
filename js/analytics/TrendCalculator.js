export function calculateTrend(sessions) {

    return sessions

        .filter(

            s =>

                s.statistics &&

                s.statistics.totalQuestions > 0

        )
        .slice()

        .sort(

            (a, b) =>

                new Date(a.startedAt) -

                new Date(b.startedAt)

        )

        .map(

            (session, index) => ({

                sessionNumber:

                    index + 1,

                date:

                    session.startedAt.substring(0, 10),

                accuracy:

                    session.statistics.accuracy,

                averageTimeMs:

                    session.statistics.averageTime,

                questions:

                    session.statistics.totalQuestions,

                correct:

                    session.statistics.correct,

                wrong:

                    session.statistics.wrong

            })

        );

}