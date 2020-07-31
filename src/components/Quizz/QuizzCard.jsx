import React from "react";

const QuizzCard = (props) => {
  console.log(props);
  return (
    <div className="quizz-sticker flex" style={{backgroundImage:`url(${props.quizz.image})`}}>
      {/* <img src={props.quizz.image} alt="quizzimg" /> */}
      <h3>{props.quizz.title}</h3>
    </div>
  );
};

export default QuizzCard;
