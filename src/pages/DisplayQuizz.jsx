import React, { Component } from "react";
import QuestionQuizz from "../components/Quizz/QuestionQuizz";
import AnswerQuizz from "../components/Quizz/AnswerQuizz";
import quizzHandler from "../api/quizzHandler";
import apiUser from "../api/apiUser";

export class DisplayQuizz extends Component {
  state = {
    quizz: null,
    questionIndex: 0,
    answered: false,
    userAnswer: "",
    userScore: 0,
  };

  handleAnswer = (answer) => {
    console.log(answer);
    this.setState({ answered: true, userAnswer: answer });
  };

  handleScore = (score) => {
    this.setState({ userScore: score });
  };

  handleNextQuestion = () => {
    this.setState({
      questionIndex: this.state.questionIndex + 1,
      answered: false,
    });
  };

  handleUserScore = () => {
    apiUser.updateUser({
      $push: {
        quizzDone: {
          quizzId: this.state.quizz._id,
          score: this.state.userScore,
        },
      },
    });
  };

  componentDidMount() {
    const quizzId = this.props.match.params.id;

    quizzHandler
      .getOneQuizz(quizzId)
      .then((apiRes) => {
        this.setState({
          quizz: apiRes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state);
    if (!this.state.quizz) {
      return <div>Loading...</div>;
    }
    return (
      <div className="column center">
        <h2>{this.state.quizz.title}</h2>
        <section>
          <QuestionQuizz
            quizz={this.state.quizz.quizzTotal[this.state.questionIndex]}
            handleAnswer={this.handleAnswer}
            handleScore={this.handleScore}
            answered={this.state.answered}
          />
          <div className="answer">
            {this.state.answered && (
              <AnswerQuizz
                quizz={this.state.quizz.quizzTotal[this.state.questionIndex]}
                userAnswer={this.state.userAnswer}
              />
            )}
          </div>
        </section>
        <button
          onClick={this.handleNextQuestion}
          style={{ width: "150px" }}
          className="btn"
        >
          Next question
        </button>
      </div>
    );
  }
}

export default DisplayQuizz;
