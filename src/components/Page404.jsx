import QuizzSticker from "../components/Quizz/QuizzSticker";
import quizzHandler from "../api/quizzHandler";

import React, { Component } from "react";

export class Page404 extends Component {
  state = {
    quizz: [],
    randomQuizz: {},
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

  randomQ = () => {
      let random = this.state.quizz[
        Math.floor(Math.random() * this.state.quizz.length)
      ];
      this.setState({ randomQuizz: this.state.quizz[random] }, () =>
        console.log(this.state.randomQuizz)
      );
  };

  render() {
    if (!this.state.randomQuizz) {
      return <div>Oooops..</div>;
    }

    if (this.state.quizz) {
        this.randomQ()
    }

    
    return (
      <div>
        404 go back home to find your way :( Or answer a random quizz !
        <div
          className="quizz-sticker row center"
          style={{ backgroundImage: `url(${this.state.randomQuizz.image})` }}
        >
          <h3 className="row ">{this.state.randomQuizz.title}</h3>
        </div>
      </div>
    );
  }
}

export default Page404;
