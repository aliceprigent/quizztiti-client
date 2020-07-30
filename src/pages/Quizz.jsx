import React, { Component } from "react";
import QuizzCard from "../components/Quizz/QuizzCard.jsx";
import quizzHandler from "../api/quizzHandler.js";

export class Quizz extends Component {
  state = {
    quizz:[],
  };

  componentDidMount() {
    quizzHandler.displayAllQuizz()
    .then((allQuizz) => {
      this.setState({ quizz: allQuizz });
    })
    .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
      {this.state.quizz.map((quiz)=>{
          return(
              <div className="quizzCard">
        <QuizzCard key={quiz._id} 
            quizz={quiz}
        />

              </div>
          )
      })}
      </div>
    );
  }
}

export default Quizz;
