import { shuffle } from "../utils/shuffle.js";

import { generate as generateTables } from "./tables.js";

export function generateQuestions() {

    const questions = [

        ...generateTables()

    ];

    return shuffle(questions);

}