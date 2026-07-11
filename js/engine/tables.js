import { CONFIG } from "../config/config.js";

import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

export function generate(customConfig = CONFIG.tables) {

    const questions = [];

    for (

        let table = customConfig.minTable;

        table <= customConfig.maxTable;

        table++

    ) {

        for (

            let multiplier = customConfig.minMultiplier;

            multiplier <= customConfig.maxMultiplier;

            multiplier++

        ) {

            if (

                customConfig.reducedTables.includes(table) &&

                multiplier <= customConfig.reducedMultiplierLimit

            ) {

                continue;

            }

            questions.push(

                new Question({

                    id: uuid(),

                    type: "TABLE",

                    operands: [table, multiplier],

                    display: `${table} × ${multiplier}`,

                    answer: table * multiplier,

                    topic: "Tables",

                    difficulty: table >= 16 ? 3 : 2

                })

            );

        }

    }

    return questions;

}