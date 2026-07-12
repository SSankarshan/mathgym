import { uuid } from "../utils/uuid.js";

import Question from "../models/Question.js";

import { FRACTIONS } from "./fractions.js";

export function generate() {

    const questions = [];

    FRACTIONS.forEach(

        ([numerator, denominator]) => {

            const decimal =
                numerator / denominator;

            const percentage =
                removeTrailingZeros(

                    decimal * 100

                );

            const thousandths =
                Math.round(

                    decimal * 1000

                );

            const weaknessKey =
                `${numerator}/${denominator}`;

            const difficulty =
                calculateDifficulty(

                    denominator

                );

            // Percentage -> Decimal ×1000

            questions.push(

                new Question({

                    id: uuid(),

                    type:

                        "PERCENTAGE_TO_THOUSANDTHS",

                    operands: [

                        percentage

                    ],

                    display:

                        `${percentage}% → ×1000`,

                    answer:

                        thousandths,

                    topic:

                        "Equivalents",

                    difficulty,

                    weaknessKey

                })

            );

            // Fraction -> Decimal ×1000

            questions.push(

                new Question({

                    id: uuid(),

                    type:

                        "FRACTION_TO_THOUSANDTHS",

                    operands: [

                        numerator,

                        denominator

                    ],

                    display:

                        `${numerator}/${denominator} → ×1000`,

                    answer:

                        thousandths,

                    topic:

                        "Equivalents",

                    difficulty,

                    weaknessKey

                })

            );

        }

    );

    return questions;

}

function removeTrailingZeros(

    value

) {

    return Number(

        value.toFixed(3)

    );

}

function calculateDifficulty(

    denominator

) {

    if (

        denominator <= 5

    ) {

        return 1;

    }

    if (

        denominator <= 12

    ) {

        return 2;

    }

    return 3;

}