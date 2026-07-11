import { CONFIG } from "../config/config.js";

import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

export function generate(customConfig = CONFIG.squares) {

    const questions = [];

    for (

        let number = customConfig.minNumber;

        number <= customConfig.maxNumber;

        number++

    ) {

        questions.push(

            new Question({

                id: uuid(),

                type: "SQUARE",

                operands: [number],

                display: `${number}²`,

                answer: number * number,

                topic: "Squares",

                difficulty:

                    number <= 20
                        ? 1
                        : number <= 50
                            ? 2
                            : 3

            })

        );

    }

    return questions;

}