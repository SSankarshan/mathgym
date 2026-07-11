export default class SessionManager {

    constructor(session, questionQueue) {

        this.session = session;

        this.questionQueue = questionQueue;

    }

    getCurrentQuestion() {

        return this.questionQueue.getNextQuestion();

    }

    hasNextQuestion() {

        return this.questionQueue.hasNextQuestion();

    }

    addAnswer(answer) {

        this.session.add(answer);

    }

    finish() {

        this.session.finish();

    }

}