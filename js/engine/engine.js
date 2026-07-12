import { shuffle } from "../utils/shuffle.js";

import { generate as generateTables } from "./tables.js";
import { generate as generateSquares } from "./squares.js";
import { generate as generateCubes } from "./cubes.js";
import { generate as generateSquareRoots } from "./squareRoots.js";
import { generate as generateCubeRoots } from "./cubeRoots.js";
import { generate as generateRatios } from "./ratios.js";
import { generate as generateEquivalents } from "./equivalents.js";
import { generate as generateMixed } from "./mixed.js";

export function generateQuestions(practiceType) {

    let questions = [];

    switch (practiceType) {

        case "TABLES":

            questions = generateTables();

            break;

        case "SQUARES":

            questions = generateSquares();

            break;

        case "CUBES":
            questions = generateCubes();
            break;


        case "SQUAREROOTS":
            questions = generateSquareRoots();
            break;

        case "CUBEROOTS":
            questions = generateCubeRoots();
            break;

        case "RATIOS":
            questions = generateRatios();
            break;

        case "EQUIVALENTS":

            questions = generateEquivalents();

            break;
        
        case "MIXED":

            questions = generateMixed();

            break;

        default:

            alert(`${practiceType} is not implemented yet.`);

            return [];

    }

    return shuffle(questions);

}