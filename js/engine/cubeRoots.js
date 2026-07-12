import { CONFIG } from "../config/config.js";

import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

export function generate(customConfig = CONFIG.cubeRoots) {

    const questions = [];

    for (

        let number = customConfig.minNumber;

        number <= customConfig.maxNumber;

        number++

    ) {

        questions.push(

            new Question({

                id: uuid(),

                type: "CUBE_ROOT",

                operands: [number * number * number],

                display: `∛${number * number * number}`,

                answer: number,

                topic: "Cube Roots",

                difficulty:

                    number <= 10
                        ? 1
                        : number <= 20
                            ? 2
                            : 3, weaknessKey:

                    `${number}`

            })

        );

    }

    return questions;

}