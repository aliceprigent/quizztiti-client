import React, { Component } from "react";
import quizzHandler from "../../api/quizzHandler";
import QuizzSticker from "../Quizz/QuizzSticker";
import { Link } from "react-router-dom";

export class QuizzCategories extends Component {
  state = {
    quizz: [],
    category: this.props.match.params.category,
  };
  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then((allQuizz) => {
        this.setState({
          quizz: allQuizz.filter(
            (oneQuizz) => oneQuizz.thema === this.state.category
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    if(!this.state){
        return (<div>Loading</div>)
    }
    return (
        <div className="center column">
        <h2 style={{color:"grey", textTransform:"uppercase", marginBottom: "20px", fontSize: "30px"}}>All {this.state.category} Quizz </h2>
      <div className="quizzCategorie">
      
        {this.state.quizz.map((quiz) => {
          return (<Link to={`/quizz/${quiz._id}`}><QuizzSticker key={quiz._id} quiz={quiz} /></Link>
           );
            
         
        })}
      </div>
      </div>
    );
  }
}

export default QuizzCategories;
