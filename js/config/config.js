export const CONFIG = {

    app: {

        name: "Mental Math Gym",

        version: "0.1.0"

    },

    tables: {

        minTable: 2,

        maxTable: 20,

        minMultiplier: 2,

        maxMultiplier: 10,

        reducedTables: [2, 10, 11, 20],

        reducedMultiplierLimit: 5

    },

    session: {

        adaptiveMode: true,
    
        repeatWrongQuestion: true,
    
        repeatSlowQuestion: true,
    
        slowQuestionThresholdMs: 3000,
    
        repeatWrongQuestionAfter: 8,
    
        repeatSlowQuestionAfter: 12
    
    }

};