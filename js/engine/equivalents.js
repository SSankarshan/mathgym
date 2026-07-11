import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

import { FRACTIONS } from "./fractions.js";

export function generate() {

    const questions = [];

    FRACTIONS.forEach(([numerator, denominator]) => {

        const decimal =
            numerator / denominator;

        const thousandths =
            Math.round(
                decimal * 1000
            );

        questions.push(

            new Question({

                id: uuid(),

                type: "FRACTION_TO_DECIMAL",

                operands: [

                    numerator,

                    denominator

                ],

                display:
                    `${removeTrailingZeros(decimal * 100)}%\nDecimal ×1000`,

                answer: thousandths,

                difficulty:
                    calculateDifficulty(
                        denominator
                    )

            })

        );

        questions.push(

            new Question({

                id: uuid(),

                type: "PERCENTAGE_TO_DECIMAL",

                operands: [

                    decimal * 100

                ],

                display:

                    `${removeTrailingZeros(decimal * 100)}%`,

                answer: decimal,

                topic: "Equivalents",

                difficulty:
                    calculateDifficulty(
                        denominator
                    )

            })

        );

    });

    return questions;

}

function roundToThreePlaces(value) {

    return Number(

        value.toFixed(3)

    );

}

function removeTrailingZeros(value) {

    return Number(

        value.toFixed(3)

    );

}

function calculateDifficulty(denominator) {

    if (denominator <= 5) {

        return 1;

    }

    if (denominator <= 12) {

        return 2;

    }

    return 3;

}