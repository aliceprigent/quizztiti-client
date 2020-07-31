import React from "react";

const QuizzSticker = (props) => {
  console.log(props);
  return (
    <div className="quizz-sticker row center" style={{backgroundImage:`url(${props.quizz.image})`}}>
    
      <h3 className="row ">{props.quizz.title}</h3>
    </div>
  );
};

export default QuizzSticker;
