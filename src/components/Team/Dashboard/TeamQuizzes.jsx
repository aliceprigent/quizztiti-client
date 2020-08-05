import React, { Component } from "react";
import StickerDashboard from "../../Dasboard/StickerDashboard";
import { Redirect } from "react-router-dom";


export class TeamQuizzes extends Component {

  render () {
  if (!this.props.quizzes) {
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
      <button className="btn" onClick={this.props.create}> Create </button>
      <button className="btn"> Add </button>
      <button className="btn" onClick={this.props.edit}> Manage </button>
      </div>
</div>
      <div id="team_quizz" className="row wrap">
        {this.props.quizzes.map((quizz) => (
          <StickerDashboard key={quizz._id} quizz={quizz} />
        ))}
        
      </div>
    </div>
  );
        }
};

export default TeamQuizzes;
