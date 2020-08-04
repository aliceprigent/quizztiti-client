import React, { Component } from "react";
import quizzHandler from "../../api/quizzHandler";
import { Link } from "react-router-dom";

export class Carousel extends Component {
  state = {
    quizz: null,
    currentIndex: 0,
  };

  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then((apiRes) => {
        this.setState({ quizz: apiRes });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  previous = (event) => {
    if (this.state.currentIndex === 0) {
      this.setState({ currentIndex: this.state.quizz.length - 1 });
    } else {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  };

  next = (event) => {
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  render() {
    if (!this.state.quizz) {
      return <div>Loading...</div>;
    }
    return (
      <div>
      <section className="quizz-home row">
        <button onClick={this.previous}>Previous</button>
        <Link to={`/quizz/${this.state.quizz[this.state.currentIndex]._id}`}>
        <div
          className="quizz-sticker row center"
          style={{
            backgroundImage: `url(${
              this.state.quizz[this.state.currentIndex].image
            })`,
          }}
        >
          <h3 className="row ">
            {this.state.quizz[this.state.currentIndex].title}
          </h3>
        </div>
        </Link>
        <button onClick={this.next}>Next</button>
        </section>
      </div>
    );
  }
}

export default Carousel;
