export default class session {

    constructor(mode) {

        this.version = 1;

        this.mode = mode;

        this.startedAt = new Date();

        this.finishedAt = null;

        this.answers = [];

        this.statistics = null;

    }

    add(answer) {

        this.answers.push(answer);

    }

    finish() {

        this.finishedAt = new Date();

    }

}