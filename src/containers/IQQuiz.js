import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Result from "./../components/Result";
import { getIQQuestion } from './../actions/index';
import Axios from "./../utils/function";
import NotFound from '../components/NotFound';
var timeforaquestion = 12;
var timer = null;
var beginState = {

    userAnswer: null,
    time: timeforaquestion,
    correct: null
};
class IQQuiz extends Component {
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
        timer = setInterval(() => {
            var { time } = this.state;
            this.setState({ time: time - 1 });
            if (this.state.time == 0) {
                clearInterval(timer);
                var userAnswer = this.refs.userAnswer.value;
                this.checkAnswer(userAnswer);

                if (userAnswer == '') userAnswer = null;
                this.setState({ userAnswer: userAnswer });

            }
        }, 1000);
    }

    onClick = (e) => {
        if (this.state.correct == null) {
            clearInterval(timer);
            var userAnswer = this.refs.userAnswer.value;
            if (userAnswer == '') userAnswer = null;
            this.setState({ userAnswer: userAnswer });
            this.checkAnswer(userAnswer);
            console.log(userAnswer);
        }

    }

    checkAnswer = (uA) => {
        var { answer } = this.props;
        var { total, heart } = this.state;


        if (uA && answer.toLowerCase() == uA.toLowerCase())
            this.setState({ correct: true, total: total + 1 });
        else {
            this.setState({ correct: false, heart: heart - 1 });
        }
        console.log(heart);
        if (heart == 1) this.showResult(this.state.total);
    }
    showResult = (total) => {
        this.setState({ showResult: true });
        var username = localStorage.getItem('username');
        total += '/' + this.props.match.params.number;
        var result = { username, total: total, type: 1 };
        console.log(result);

        Axios('/save-result', 'POST', result).then((res) => {
            console.log('Save result Done');
        });
    }
    nextQuestion = (nextID) => {
        (this.props.getNextQuestion(nextID));

    }
    render() {
        var isLogin = localStorage.getItem('username');
        if (isLogin == null) return (<NotFound />);
        else <Redirect to="/" />;
        var { match, id, question, answer } = this.props;
        var { time, correct, userAnswer, statusClass, total, clock, heart, showResult } = this.state;

        if (!match) return (<div className="container text-center" >
            <h2> Are you ready :) </h2>
            <Link className="btn btn-danger" to="/IQQuiz/1">Bắt đầu</Link>
        </div>);
        var questionNumber = match.params.number;
        var Correct = null;
        var Total = total + '/' + questionNumber;
        if (showResult) var result = <Result total={Total} />;
        if (time == 0 || correct != null) {
            if (userAnswer == null) Correct = (<span className="text-center"><i class="far fa-sad-cry"></i><span id="status">Tại sao bạn không trả lời chứ </span></span>);
            else
                if (correct == true) Correct = (<span className="text-center"><i className="fab fa-angellist"></i> <span id="status"> Đúng rồi, giỏi vler</span></span>);
                else if (correct == false) Correct = (<span className="text-center"><i className="far fa-flushed"></i> <span id="status"> Sai rồi.</span></span>);

        }
        var answers = time ? null : <span> Đáp án đúng: <i className="far fa-hand-point-right"></i> <span id="result-question">{answer}</span></span>
        var nextID = parseInt(match.params.number) + 1;
        var nextUrl = '/IQQuiz/' + nextID;

        var next = (correct == null) ? null : <Link  id="next-question" className="btn btn-info" to={nextUrl} onClick={() => this.nextQuestion(nextID)} >Next</Link>
        if (heart == 0) next = null;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3" >
                        <div className="heart"><h4>Số lượt chơi còn lại: {heart}</h4> </div>
                        <div className="timer"><h4>Thời gian: {time} giây</h4></div>
                        <div className="nth-question"><h4>Câu thứ {questionNumber}</h4></div>
                        <div className="total"><h4>Số câu đúng {total}/{questionNumber}</h4></div>
                    </div>
                    <div className="col-md-6" >
                        <div className="main">
                            <div className="question">
                                <p>Question {questionNumber}: <span id="question">{question}</span></p>
                            </div>
                            <div className="answers">
                                <div className="F row">
                                    <textarea className="form-control" ref="userAnswer" placeholder="Nhập đáp án của bạn" name="userAnswer" ></textarea>
                                    <button className="btn btn-success" onClick={this.onClick} >Gửi đáp án</button>
                                </div>
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
                        <h4>Just for Jun</h4>
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
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getNextQuestion: (number) => {
            dispatch(getIQQuestion(number));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IQQuiz);