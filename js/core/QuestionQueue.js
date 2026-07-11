export default class QuestionQueue {

    constructor(questionList) {

        this.questionList = [...questionList];

    }

    hasNextQuestion() {

        return this.questionList.length > 0;

    }

    getNextQuestion() {

        if (!this.hasNextQuestion()) {
            return null;
        }

        return this.questionList.shift();

    }

    repeatQuestion(question, insertAfterQuestionCount = 10) {

        const insertIndex = Math.min(
            insertAfterQuestionCount,
            this.questionList.length
        );

        this.questionList.splice(insertIndex, 0, question);

    }

    getRemainingQuestionCount() {

        return this.questionList.length;

    }

    getQuestionCount() {

        return this.questionList.length;
    
    }

    getTotalQuestionCount() {

        return this.questionList.length;
    
    }

}