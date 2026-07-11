export default class Session {

    constructor(mode) {

        this.version = 2;

        this.mode = mode;

        this.startedAt = new Date();

        this.finishedAt = null;

        this.answers = [];

        this.statistics = null;

        this.questionSolvedCount = 0;

    }

    add(answer) {

        this.answers.push(answer);

        this.questionSolvedCount++;

    }

    finish() {

        this.finishedAt = new Date();

    }

    getQuestionSolvedCount() {

        return this.questionSolvedCount;

    }

}