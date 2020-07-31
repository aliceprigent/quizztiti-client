import React, { Component } from "react";

import quizzHandler from "../api/quizzHandler.js";
import QuizzSticker from "../components/Quizz/QuizzSticker.jsx";

export class AllQuizz extends Component {
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
      <div className="all-quizz row center">
      {this.state.quizz.map((quiz)=>{
          return(
              
        <QuizzSticker key={quiz._id} 
            quizz={quiz}
        />

              
          )
      })}
      </div>
    );
  }
}

export default AllQuizz;
