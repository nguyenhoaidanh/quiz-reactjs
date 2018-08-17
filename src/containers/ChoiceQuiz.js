import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Result from "./../components/Result";
import { getChoiceQuestion } from './../actions/index';
import Axios from './../utils/function';
import NotFound from '../components/NotFound';
var timeforaquestion = 2;
var beginState = {
    classA: 'as',
    classB: 'as',
    classC: 'as',
    classD: 'as',
    userAnswers: 0,
    time: timeforaquestion,
    correct: null
};
var tostring = [null, "A", "B", "C", "D"];
class ChoiceQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...beginState,
            total: 0,
            heart: 3,
            showResult: false
        };
    }

    componentWillReceiveProps() {
        this.setState(beginState);
        var { match } = this.props;
        if (match) {
            this.createTimer();
        }
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            this.createTimer();
        }
    }
    createTimer = () => {
        var timer = setInterval(() => {
            var { time } = this.state;
            this.setState({ time: time - 1 });
            if (this.state.time == 0) {
                clearInterval(timer);
                this.checkAnswer();
            }
        }, 1000);
    }

    sendAnswer = (as) => {
        switch (as) {
            case 1:
                this.setState({
                    classA: 'as active',
                    classB: 'as',
                    classC: 'as',
                    classD: 'as', userAnswers: as
                })
                break;
            case 2:
                this.setState({
                    classB: 'as active',
                    classA: 'as',
                    classC: 'as',
                    classD: 'as', userAnswers: as
                })
                break;
            case 3:
                this.setState({
                    classC: 'as active',
                    classB: 'as',
                    classA: 'as',
                    classD: 'as', userAnswers: as
                })
                break;
            case 4:
                this.setState({
                    classD: 'as active',
                    classB: 'as',
                    classC: 'as',
                    classA: 'as', userAnswers: as
                })
                break;
        }
    }
    checkAnswer = () => {
        var { answer } = this.props;
        var { userAnswers, classA, classB, classC, classD, total, heart } = this.state;
        if (answer == userAnswers)
            this.setState({ correct: true, total: total + 1 });
        else {
            this.setState({ correct: false, heart: heart - 1 });
            switch (userAnswers) {
                case 1:
                    this.setState({ classA: "as false" });
                    break;
                case 2:
                    this.setState({ classB: "as false" });
                    break;
                case 3:
                    this.setState({ classC: "as false" });
                    break;
                case 4:
                    this.setState({ classD: "as false" });
                    break;
            }

        }
        switch (answer) {
            case 1:
                this.setState({ classA: "as true" });
                break;
            case 2:
                this.setState({ classB: "as true" });
                break;
            case 3:
                this.setState({ classC: "as true" });
                break;
            case 4:
                this.setState({ classD: "as true" });
                break;
        }
        if (this.state.heart == 0) this.showResult(this.state.total);
    }
    showResult = (total) => {
        this.setState({ showResult: true });
        var username = localStorage.getItem('username');
        total += '/' + this.props.match.params.number;
        var result = { username, total: total, type: 2 };
        console.log(result);


        Axios('/save-result', 'POST', result).then((res) => {
            console.log('Save done');
        });
    }
    nextQuestion = (nextID) => {
        (this.props.getNextQuestion(nextID));

    }
    render() {
        var isLogin = localStorage.getItem('username');
        if (isLogin == null) return (<NotFound />);
        else <Redirect to="/" />;
        var { match, id, answerA, answerB, answerC, answerD, question, answer } = this.props;
        var { classA, classB, classC, classD, time, correct, userAnswers, total, clock, heart, showResult } = this.state;

        if (!match) return (<div className="container text-center" >
            <h2> Are you ready :) </h2>
            <Link className="btn btn-danger" to="/ChoiceQuiz/1">Bắt đầu</Link>
        </div>);
        var questionNumber = match.params.number;
        var Correct = null;
        var Total = total + '/' + questionNumber;
        if (showResult) var result = <Result total={Total} />;
        if (time == 0) {
            if (userAnswers == 0) Correct = (<span className="text-center"><i class="far fa-sad-cry"></i><span id="status">Tại sao bạn không trả lời chứ </span></span>);
            else
                if (correct == true) Correct = (<span className="text-center"><i className="fab fa-angellist"></i> <span id="status"> Đúng rồi, giỏi ghê</span></span>);
                else if (correct == false) Correct = (<span className="text-center"><i className="far fa-flushed"></i> <span id="status"> Sai rồi</span></span>);

        }
        var answers = time ? null : <span> Đáp án đúng: <i className="far fa-hand-point-right"></i> <span id="result-question">{tostring[answer]}</span></span>
        var nextID = parseInt(match.params.number) + 1;
        var nextUrl = '/ChoiceQuiz/' + nextID;

        var next = time ? null : <Link id="next-question" className="btn btn-info" to={nextUrl} onClick={() => this.nextQuestion(nextID)} >Next</Link>
        if (heart == 0) next = null;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3" >
                        <div className="heart"><h4>Số lượt chơi còn lại: {heart}</h4> </div>
                        <div className="timer"><h4>Thời gian: 0 phút {time} giây</h4></div>
                        <div className="nth-question"><h4>Câu thứ {questionNumber}</h4></div>
                        <div className="total"><h4>Số câu đúng {total}/{questionNumber}</h4></div>
                    </div>
                    <div className="col-md-6" >
                        <div className="main">
                            <div className="question">
                                <p>Question {questionNumber}: <span id="question">{question}</span></p>
                            </div>
                            <div className="answers">
                                <div className={classA} id="a" onClick={() => this.sendAnswer(1)}><i className="fab fa-aws"></i> A : <span id="asA"> {answerA}</span></div>
                                <div className={classB} id="b" onClick={() => this.sendAnswer(2)}><i className="fab fa-aws"></i> B : <span id="asB"> {answerB}</span></div>
                                <div className={classC} id="c" onClick={() => this.sendAnswer(3)}><i className="fab fa-aws"></i> C : <span id="asC"> {answerC}</span></div>
                                <div className={classD} id="d" onClick={() => this.sendAnswer(4)}><i className="fab fa-aws"></i> D : <span id="asD"> {answerD}</span></div>
                            </div>

                            <div className="result-question">
                                {Correct}
                                <br/>
                                {answers}
                                {next}
                                {result}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                    <h4>Vì đây là câu hỏi đố mẹo mang tính chất giải trí nên đừng sệt google :)) mất vui.
                            Là người Việt nam nên câu trả lời có dấu, đúng chính tả mới được xem là đáp án đúng </h4>
                </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        question: state.questions.question,
        id: state.questions.id,
        answer: state.questions.answer,
        answerA: state.questions.answerA,
        answerB: state.questions.answerB,
        answerC: state.questions.answerC,
        answerD: state.questions.answerD
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getNextQuestion: (number) => {
            dispatch(getChoiceQuestion(number));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceQuiz);