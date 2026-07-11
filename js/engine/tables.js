import { CONFIG } from "../config/config.js";

import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

export function generate(customConfig = CONFIG.tables) {

    const questions = [];

    for (

        let operand1 = customConfig.minOperand1;

        operand1 <= customConfig.maxOperand1;

        operand1++

    ) {

        for (

            let operand2 = customConfig.minOperand2;

            operand2 <= customConfig.maxOperand2;

            operand2++

        ) {

            if (

                customConfig.reducedOperand1.includes(operand1) &&

                operand2 <= customConfig.reducedOperand2Limit

            ) {

                continue;

            }

            questions.push(

                new Question({

                    id: uuid(),

                    type: "MULTIPLICATION",

                    operands: [

                        operand1,

                        operand2

                    ],

                    display:

                        `${operand1} × ${operand2}`,

                    answer:

                        operand1 * operand2,

                    topic: "Multiplication",

                    difficulty:

                        Math.max(

                            operand1,

                            operand2

                        ) >= 16

                            ? 3

                            : 2

                })

            );

        }

    }

    return questions;

}