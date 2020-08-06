import QuizzSticker from "../components/Quizz/QuizzSticker";
import quizzHandler from "../api/quizzHandler";

import React, { Component } from "react";

export class Page404 extends Component {
  state = {
    quizz: [],
  };

  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then((allQuizz) => {
        this.setState({ quizz: allQuizz }, () => console.log(this.state.quizz));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    if (this.state.quizz.length === 0) {
      return <div>Oooops..</div>;
    }

    let random = this.state.quizz[
        Math.floor(Math.random() * this.state.quizz.length)
      ];  
    
    return (
      <div>
        404 go back home to find your way :( Or answer a random quizz !
        <div
          className="quizz-sticker row center"
          style={{ backgroundImage: `url(${random.image})` }}
        >
          <h3 className="row ">{random.title}</h3>
        </div>
      </div>
    );
  }
}

export default Page404;
