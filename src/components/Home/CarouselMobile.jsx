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
      <div className="row center">
        
          <img
            onClick={this.previous}
            className="bouton-fleche-mobile"
            alt="previous"
            src="../../../media/icons8-double-gauche-100.png"
          />
          <section className="quizz-home row">
          <Link to={`/quizz/${this.state.quizz[this.state.currentIndex]._id}`}>
            <div
              className="quizz-sticker-mobile row center"
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
          </section>
          
          <img
            onClick={this.next}
            className="bouton-fleche-mobile"
            alt="previous"
            src="../../../media/icons8-double-droite-100.png"
          />
        
      </div>
    );
  }
}

export default Carousel;
