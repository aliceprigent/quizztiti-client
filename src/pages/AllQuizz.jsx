import React, { Component } from "react";

import quizzHandler from "../api/quizzHandler.js";
import QuizzSticker from "../components/Quizz/QuizzSticker.jsx";

export class AllQuizz extends Component {
  state = {
    quizz:"",
    categ:""
  };

  // groupByCateg(quizz, thema){
  //   return quizz.reduce(function (quiz, obj) {
  //     var cle = obj[thema];
  //     if(!quiz[cle]){
  //       quiz[cle] = [];
  //     }
  //     quiz[cle].push(obj);
  //     return quiz;
  //   }, {});
  // }
 
  componentDidMount() {
    
    quizzHandler.displayAllQuizz()
    .then((allQuizz) => {
      this.setState({ quizz: allQuizz })
      var newCateg=[]
      var singleCateg
      this.state.quizz.map((quiz)=>{
        return newCateg.push(quiz.thema)})
        newCateg.filter((thema,index)=>{
         return( newCateg.indexOf(thema)===index);})
        console.log(newCateg)
               
        // this.setState({categ:newCateg})
                  
    })
    
       .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      
      <div className="all-quizz row center global-view">
      {/* {this.state.quizz.map((quiz)=>{
          return(
                 <div>
                
                 <QuizzSticker key={quiz._id} quizz={quiz}/>
             
        
        </div>
              
          )
      })} */}
      </div>
    );
  }
}

export default AllQuizz;
