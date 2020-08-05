import React, { Component } from "react";
import TeamQuizzes from "./Dashboard/TeamQuizzes";
import TeamMembers from "./Dashboard/TeamMembers";
import teamHandler from "../../api/teamHandler";
import "../../styles/teams/teamDashboard.css";
import { Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";

export class TeamDashboard extends Component {
  componentDidMount() {
    var teamId = this.props.match.params.id;
    teamHandler
      .getOneTeam(teamId)
      .then((team) => {
        console.log(team);
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
          () => console.log(this.state)
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
        console.log(newTeam);
        this.setState({ teamQuizz: newTeam.teamQuizz });
      })
      .catch((err) => console.error('could not update state -', err));
  };

  render() {
    if (this.props.context.user === null) return null;
    console.log(this.props.context.user);

    if (!this.state) {
      return <div> Loading ... </div>;
    }

    return (
      <div className="row">
        <div className="container_left">
          <div id="team_info" className="row wrap">
            <img src={this.state.image} alt="team pic" className="team_image" />
            <div className="column">
              <div className="row space_between" id="team_head">
                {" "}
                <h2>{this.state.name} </h2>{" "}
                <button onClick={this.handleEdit} className="btn half_width">
                  {" "}
                  Edit{" "}
                </button>
              </div>
              <div id="team_desc"> {this.state.description} </div>
            </div>
          </div>

          <TeamQuizzes
          teamId={this.state.teamId}
            userQuizzes={this.props.context.user.quizzCreated}
            quizzes={this.state.teamQuizz}
            edit={this.handleEdit}
            create={this.handleCreateQuizz}
            add={this.handleAddQuizz}
          />
        </div>
        <TeamMembers
          owner={this.state.owner}
          members={this.state.members}
          edit={this.handleEdit}
        />
      </div>
    );
  }
}

export default withUser(TeamDashboard);
