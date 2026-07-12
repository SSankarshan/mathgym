import { CONFIG } from "../config/config.js";

import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

export function generate(customConfig = CONFIG.squareRoots) {

    const questions = [];

    for (

        let number = customConfig.minNumber;

        number <= customConfig.maxNumber;

        number++

    ) {

        questions.push(

            new Question({

                id: uuid(),

                type: "SQUARE_ROOT",

                operands: [number * number],

                display: `√${number * number}`,

                answer: number,

                topic: "Square Roots",

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