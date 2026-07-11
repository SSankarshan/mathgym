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

        maxNumber: 50

    },

    cubes: {

        minNumber: 2,

        maxNumber: 30

    },

    squareRoots: {

        minNumber: 2,

        maxNumber: 100

    },

    cubeRoots: {

        minNumber: 2,

        maxNumber: 30

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

    session: {

        adaptiveMode: true,

        repeatWrongQuestion: true,

        repeatSlowQuestion: false,

        slowQuestionThresholdMs: 3000,

        repeatWrongQuestionAfter: 8,

        repeatSlowQuestionAfter: 12

    }

};