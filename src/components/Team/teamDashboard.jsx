import React, { Component } from "react";
import TeamQuizzes from "./Dashboard/TeamQuizzes";
import TeamMembers from "./Dashboard/TeamMembers";
import teamHandler from "../../api/teamHandler";
import "../../styles/teams/teamDashboard.css";
import { Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import UserContext from '../Auth/UserContext';

export class TeamDashboard extends Component {
  static contextType = UserContext;

  componentDidMount() {
    var teamId = this.props.match.params.id;
    teamHandler
      .getOneTeam(teamId)
      .then((team) => {
        // console.log(team);
        this.setState(
          {
            teamId: team._id,
            name: team.name,
            image: team.image,
            owner: team.owner,
            description: team.description,
            members: team.members,
            teamQuizz: team.teamQuizz,
          },
        );
      })
      .catch((err) => console.error(err));
  }

  handleEdit = (event) => {
    if (this.state.teamId) {
      this.props.history.push(`/team/edit/${this.state.teamId}`);
    }
  };

  handleCreateQuizz = (event) => {
    this.props.history.push(`/quizz/new`);
  };

  handleAddQuizz = (newQuizzes) => {
    //console.log('in handle add quizz (dashboard) witn new quizz list', newQuizzes ,'and old list', this.state.teamQuizz )
    let quizzUpdate = { teamQuizz: newQuizzes };
    teamHandler
      .updateTeamQuizzes(this.state.teamId, quizzUpdate)
      .then((newTeam) => {
        // console.log(newTeam);
        this.setState({ teamQuizz: newTeam.teamQuizz });
      })
      .catch((err) => console.error('could not update state -', err));
  };

  render() {
    console.log("context", this.context);
    if (this.props.context.user === null) return null;
    console.log(this.props.context.user);


    if (!this.props.context.user.teams.find(team => team === this.props.match.params.id)) {
      this.props.history.push("/dashboard");
    }


    if (!this.state) {
      return <div> Loading ... </div>;
    }

    return (
      <div id="team_dashboard" className="center column">
        <div className="column center section-dashboard">
          <div id="team_info"  >
            <img src={this.state.image} alt="team pic" className="team_image" />
            <div>
              <div  id="team_head" className="row space-around">
                {" "}
                <h2>{this.state.name} </h2>{" "}

             {   (this.context.user._id === this.state.owner._id) &&
                <button onClick={this.handleEdit} className="btn half_width">
                  {" "}
                  Edit{" "}
                </button>
              }
              </div>
              <div id="team_desc"> {this.state.description} </div>
            </div>
            </div>

          <TeamQuizzes className="shadow-box dashboard-box"
          teamId={this.state.teamId}
          owner={this.state.owner}
            userQuizzes={this.props.context.user.quizzCreated}
            quizzes={this.state.teamQuizz}
            edit={this.handleEdit}
            create={this.handleCreateQuizz}
            add={this.handleAddQuizz}
          />
        
        <TeamMembers className="shadow-box dashboard-box"
          owner={this.state.owner}
          members={this.state.members}
          edit={this.handleEdit}
          owner={this.state.owner}
        />
        </div>
      </div>
    );
  }
}

export default withUser(TeamDashboard);
