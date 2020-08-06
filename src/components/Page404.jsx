import QuizzSticker from "../components/Quizz/QuizzSticker";
import quizzHandler from "../api/quizzHandler";
import { Link } from "react-router-dom"

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
      <div className="column center" style={{textAlign:"center"}}>
        <h1 className="title" style={{color:"black"}}>404</h1> 
        <br/>
        <p style={{fontSize:"19px"}}>Go back <button className="btn">Home</button> to find your way... 
        <br/> 
        <br/> 

        Or answer a random quizz !</p>
        <br/>

        <h2 className="title">Your lost soul quizz :</h2>
        <Link to={`/quizz/${random._id}`}>
        <div
          className="quizz-sticker row center"
          style={{ backgroundImage: `url(${random.image})` }}
        >
          <h3 className="row ">{random.title}</h3>
        </div>
        </Link>
       
      </div>
    );
  }
}

export default Page404;
