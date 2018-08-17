import * as Types from './../constants';

var initialState = {
    id: 1,
    question: "đầy là câu hỏi",
    answer: 1,
    answerA: "đây đáp án a",
    answerB: "đây đáp án b",
    answerC: "đây đáp án c",
    answerD: "đây đáp án d"
};
var nextState = {
    id: 3,
    question: "đầy là câu hỏi next",
    answer: 2,
    answerA: "đây đáp án a next",
    answerB: "đây đáp án b next",
    answerC: "đây đáp án c next",
    answerD: "đây đáp án d next"
};
var iqQuestion={
    id: 3,
    question: "đầy là câu hỏi next",
    answer: "haha"
}
const questions = (state = initialState, action) => {

    switch (action.type) {
        case Types.GET_CHOICE_QUESTION:

            return nextState;
        case Types.GET_IQ_QUESTION:

            return iqQuestion;
        default:
            return iqQuestion;
    }
}

export default questions;