import React, { Component } from "react";

import quizzHandler from "../api/quizzHandler.js";
import QuizzSticker from "../components/Quizz/QuizzSticker.jsx";
import { Link } from "react-router-dom";

export class AllQuizz extends Component {
  state = {
    quizz:[],
  };

 
  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then((allQuizz) => {
        this.setState({ quizz: allQuizz });
       })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.quizz === null) return <div>Loading...</div>;
    return (
      <div className="all-quizz row center global-view">
        {this.state.quizz.map((quiz) => {
          return (
            <Link to={`/quizz/${quiz._id}`}>
              <QuizzSticker key={quiz._id} quiz={quiz} />
            </Link>
          );
        })}
      </div>
    );
  }
}

export default AllQuizz;
