import { CONFIG } from "../config/config.js";

import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

export function generate(customConfig = CONFIG.cubes) {

    const questions = [];

    for (

        let number = customConfig.minNumber;

        number <= customConfig.maxNumber;

        number++

    ) {

        questions.push(

            new Question({

                id: uuid(),

                type: "CUBE",

                operands: [number],

                display: `${number}³`,

                answer: number * number * number,

                topic: "Cubes",

                difficulty:

                    number <= 10
                        ? 1
                        : number <= 20
                            ? 2
                            : 3

            })

        );

    }

    return questions;

}