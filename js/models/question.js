export default class Question {

    constructor({

        id,

        type,

        operands,

        display,

        answer,

        topic,

        difficulty,

        weaknessKey

    }) {

        this.id = id;

        this.type = type;

        this.operands = operands;

        this.display = display;

        this.answer = answer;

        this.topic = topic;

        this.difficulty = difficulty;

        this.weaknessKey = weaknessKey;

    }

}