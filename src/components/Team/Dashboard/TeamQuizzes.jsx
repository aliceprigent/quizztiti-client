import React, { Component } from "react";
import StickerDashboard from "../../Dasboard/StickerDashboard";
import { Link } from "react-router-dom";
import AddQuizz from './AddQuizz';
import { withUser } from "../../Auth/withUser";
import UserContext from '../../Auth/UserContext';


export class TeamQuizzes extends Component {
  static contextType = UserContext;

  state = {
    addQuizz : null
  }



handleAddQuizz = (event) => {
  this.setState({addQuizz : true})
}

handleBack = (event) => {
 this.setState({addQuizz : !this.state.addQuizz});

}

  render () {
    console.log("in team quizzes, context:", this.props.context);
    if (this.props.context.user === null) return null;
    console.log("in team quizzes, props:",this.props);

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
      <button className="btn" onClick={this.handleAddQuizz}> Add </button>
      { (this.context.user._id === this.props.owner._id) &&
        <button className="btn" onClick={this.props.edit}> Manage </button>}
      </div>
</div>
{ !this.state.addQuizz &&
      <div id="team_quizz" className="row wrap">
        {this.props.quizzes.map((quizz) => (
          <Link to={`/quizz/${quizz._id}`} >
          <StickerDashboard key={quizz._id} quizz={quizz} />
          </Link>
        ))}
        
      </div>}

      {this.state.addQuizz &&
        <div id="team_quizz" className="row wrap">
        
          <AddQuizz  userQuizzes={this.props.userQuizzes} quizzes={this.props.quizzes} addQuizz={this.props.add} toggleAddQuizz={this.handleBack}/>
      
        
      </div>
       }
    </div>
  );
        }
};

export default withUser(TeamQuizzes);
