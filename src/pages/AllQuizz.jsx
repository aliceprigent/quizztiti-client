import React, { Component } from "react";

import quizzHandler from "../api/quizzHandler.js";
import QuizzSticker from "../components/Quizz/QuizzSticker.jsx";
import { Link } from "react-router-dom";
import SearchBar from "../components/Quizz/SearchBar"

export class AllQuizz extends Component {
  state = {
    quizz:[],
    
    filteredQuizz:[],
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


handleFilter=()=>{
           
    }
  


  handleSearch=(event)=>{    
    this.setState({ searchValue: event.target.value },
     )
      
  };
    

  render() {
    if (this.state.quizz === null) return <div>Loading...</div>;

    const filteredArray=this.state.quizz
    .filter((quiz)=>{
      if(this.state.searchValue){
      return (
        quiz.title.toLowerCase().includes(this.state.searchValue)||
        quiz.thema.toLowerCase().includes(this.state.searchValue)
        )
      }else{
        return quiz
      }
    })
    console.log(filteredArray)

    return (
      <React.Fragment>
      <div>
<SearchBar search={this.handleSearch}/>
      </div>
      <div className="all-quizz row center global-view">
        {filteredArray
          .map((quiz)=>{
            return(
                        <Link to={`/quizz/${quiz._id}`}>
              <QuizzSticker key={quiz._id} quiz={quiz}/>
            </Link>)
          })
        }
        
      </div>
      </React.Fragment>
    );
  }

}
export default AllQuizz;
