import React from "react";
import StickerDashboard from "../../Dasboard/StickerDashboard";
import { Link } from "react-router-dom";


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
    <div className="row space_between team_block">
      <h3>Quizz</h3>
      <div>
      <button className="btn"> Create </button>
      <button className="btn"> Add </button>
      </div>
</div>
      <div id="team_quizz" className="row wrap">
        {props.quizzes.map((quizz) => (
          <StickerDashboard key={quizz._id} quizz={quizz} />
        ))}
        
      </div>
    </div>
  );
};

export default teamQuizzes;
