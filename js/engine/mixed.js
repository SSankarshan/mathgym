import { CONFIG } from "../config/config.js";

import * as Tables from "./Tables.js";
import * as Squares from "./Squares.js";
import * as Cubes from "./Cubes.js";
import * as SquareRoots from "./SquareRoots.js";
import * as CubeRoots from "./CubeRoots.js";
import * as Equivalents from "./Equivalents.js";
import * as Ratios from "./Ratios.js";

export function generate(customConfig = CONFIG.mixedMemory) {

    const questions = [

        ...Tables.generate(),

        ...Squares.generate(),

        ...Cubes.generate(),

        ...SquareRoots.generate(),

        ...CubeRoots.generate(),

        ...Equivalents.generate(),

        ...Ratios.generate()

    ];

    shuffle(questions);

    return questions.slice(

        0,

        customConfig.questionCount

    );

}

function shuffle(array) {

    for (

        let i = array.length - 1;

        i > 0;

        i--

    ) {

        const j = Math.floor(

            Math.random() * (i + 1)

        );

        [

            array[i],

            array[j]

        ] = [

            array[j],

            array[i]

        ];

    }

}