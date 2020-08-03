import React from "react";

const teamQuizzes = (props) => {
  if (!props.quizzes) {
    return (
      <div>
        <h3>Quizz </h3> Loading...
      </div>
    );
  }
  return (
    <div>
      <h3>Quizz</h3>
      <ul>
        {props.quizzes.map((quizz) => (
          <li key={quizz._id}> {quizz.title} </li>
        ))}
      </ul>
    </div>
  );
};

export default teamQuizzes;
