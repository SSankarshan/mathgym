export default class answer {

    constructor({

        question,

        userAnswer,

        responseTimeMs

    }) {

        this.question = question;

        this.userAnswer = userAnswer;

        this.correct = userAnswer === question.answer;

        this.responseTimeMs = responseTimeMs;

        this.timestamp = new Date();

    }

}