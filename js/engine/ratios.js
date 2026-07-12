import { CONFIG } from "../config/config.js";

import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

export function generate(customConfig = CONFIG.ratios) {

    const questions = [];

    for (

        const ratio of customConfig.ratios

    ) {

        questions.push(

            new Question({

                id: uuid(),

                type: "RATIO_PERCENT",

                operands: [

                    ratio.a,

                    ratio.b

                ],

                display:

                    `${ratio.a}:${ratio.b} = ?%`,

                answer:

                    ratio.percentage,

                topic: "Ratios",

                difficulty:

                    ratio.difficulty, weaknessKey:

                    `${ratio.a}:${ratio.b}`

            })

        );

    }

    return questions;

}