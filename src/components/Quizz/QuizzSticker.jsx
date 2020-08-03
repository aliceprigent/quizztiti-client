import React from "react";

const QuizzSticker = (props) => {
  // console.log(props);
  return (
    <div className="quizz-sticker row center" style={{backgroundImage:`url(${props.quiz.image})`}}>
    
      <h3 className="row ">{props.quiz.title}</h3>
    </div>
  );
};

export default QuizzSticker;
