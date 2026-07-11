import { shuffle } from "../utils/shuffle.js";

import { generate as generateTables } from "./tables.js";
import { generate as generateSquares } from "./squares.js";
import { generate as generateEquivalents } from "./equivalents.js";

export function generateQuestions(practiceType) {

    let questions = [];

    switch (practiceType) {

        case "TABLES":

            questions =
                generateTables();

            break;

        case "SQUARES":

            questions =
                generateSquares();

            break;

        case "EQUIVALENTS":

            questions =
                generateEquivalents();

            break;

        default:

            alert(

                `${practiceType} is not implemented yet.`

            );

            return [];

    }

    return shuffle(

        questions

    );

}