import React, { Component } from "react";
import TeamQuizzes from "./Dashboard/TeamQuizzes";
import TeamMembers from "./Dashboard/TeamMembers";
import teamHandler from "../../api/teamHandler";
import "../../styles/teams/teamDashboard.css";
import { Redirect } from "react-router-dom";

export class TeamDashboard extends Component {
  componentDidMount() {
    var teamId = this.props.match.params.id;
    teamHandler
      .getOneTeam(teamId)
      .then((team) => {
        console.log(team);
        this.setState(
          { teamId : team._id,
            name: team.name,
            image: team.image,
            owner: team.owner,
            description: team.description,
            members: team.members,
            teamQuizz: team.teamQuizz,
          },
          () => console.log(this.state)
        );
      })
      .catch((err) => console.error(err));
  }

handleEdit = (event) => {
  if (this.state.teamId) {
  this.props.history.push(`/team/edit/${this.state.teamId}`)}
}

handleCreateQuizz = (event) => {
  this.props.history.push(`/quizz/new`)
}

  render() {
    if (!this.state) {
      return <div> Loading ... </div>;
    }

    return (
      <div className="row">
      <div className="container_left" >
      
      <div id="team_info" className="row wrap"> 
      <img src={this.state.image} alt="team pic" className="team_image"/>
      <div className="column">
      <div  className="row space_between" id="team_head"> <h2>{this.state.name} </h2> <button onClick={this.handleEdit} className="btn half_width"> Edit </button></div>
    <div id="team_desc"> {this.state.description} </div>
        </div>
        
        </div>

        <TeamQuizzes  quizzes={this.state.teamQuizz} edit={this.handleEdit} create={this.handleCreateQuizz}/>
        </div>
        <TeamMembers  owner={this.state.owner} members={this.state.members} edit={this.handleEdit} />
      </div>
    );
  }
}

export default TeamDashboard;
