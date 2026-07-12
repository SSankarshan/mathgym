export function calculateWeakItems(

    sessions

) {

    const map = new Map();

    for (

        const session of sessions

    ) {

        for (

            const answer of session.answers

        ) {

            const key =

                answer.question

                    ?.weaknessKey;

            if (!key) {

                continue;

            }

            if (

                !map.has(key)

            ) {

                map.set(

                    key,

                    {

                        key,

                        attempts: 0,

                        correct: 0,

                        totalTime: 0

                    }

                );

            }

            const stat =

                map.get(key);

            stat.attempts++;

            if (

                answer.correct

            ) {

                stat.correct++;

            }

            stat.totalTime +=

                answer.responseTimeMs;

        }

    }

    return [

        ...map.values()

    ]

        .map(

            item => ({

                key:

                    item.key,

                attempts:

                    item.attempts,

                accuracy:

                    item.correct *

                    100 /

                    item.attempts,

                averageTime:

                    item.totalTime /

                    item.attempts

            })

        )

        .sort(

            (a, b) =>

                a.accuracy -

                b.accuracy ||

                b.averageTime -

                a.averageTime

        );

}