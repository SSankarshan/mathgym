export const CONFIG = {

    app: {

        name: "Mental Math Gym",

        version: "2.0"

    },

    tables: {

        minOperand1: 2,

        maxOperand1: 20,

        minOperand2: 2,

        maxOperand2: 10,

        reducedOperand1: [2, 10, 11, 20],

        reducedOperand2Limit: 5

    },

    squares: {

        minNumber: 2,

        maxNumber: 25

    },

    cubes: {

        minNumber: 2,

        maxNumber: 20

    },

    squareRoots: {

        minNumber: 2,

        maxNumber: 25

    },

    cubeRoots: {

        minNumber: 2,

        maxNumber: 20

    },

    ratios: {

        ratios: [

            {

                a: 1,

                b: 2,

                percentage: 50,

                difficulty: 1

            },

            {

                a: 1,

                b: 3,

                percentage: 33.33,

                difficulty: 2

            },

            {

                a: 2,

                b: 3,

                percentage: 66.67,

                difficulty: 2

            },

            {

                a: 3,

                b: 4,

                percentage: 75,

                difficulty: 1

            },

            {

                a: 4,

                b: 5,

                percentage: 80,

                difficulty: 1

            },

            {

                a: 5,

                b: 8,

                percentage: 62.5,

                difficulty: 2

            },

            {

                a: 3,

                b: 5,

                percentage: 60,

                difficulty: 1

            },

            {

                a: 7,

                b: 8,

                percentage: 87.5,

                difficulty: 3

            },

            {

                a: 5,

                b: 6,

                percentage: 83.33,

                difficulty: 3

            },

            {

                a: 7,

                b: 10,

                percentage: 70,

                difficulty: 1

            }

        ]

    },

    percentages: {

        minNumber: 1,

        maxNumber: 1000,

        allowedPercentages: [

            1,
            2,
            5,
            10,
            20,
            25,
            40,
            50,
            60,
            75,
            80,
            90,
            100

        ]

    },

    mixedMemory: {

        questionCount: 100

    },

    session: {

        adaptiveMode: true,

        repeatWrongQuestion: true,

        repeatSlowQuestion: false,

        slowQuestionThresholdMs: 3000,

        repeatWrongQuestionAfter: 8,

        repeatSlowQuestionAfter: 12

    }

};