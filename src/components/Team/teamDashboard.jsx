import React, { Component } from "react";
import TeamQuizzes from "./Dashboard/TeamQuizzes";
import TeamMembers from "./Dashboard/TeamMembers";
import teamHandler from "../../api/teamHandler";

export class teamDashboard extends Component {
  componentDidMount() {
    var teamId = this.props.match.params.id;
    teamHandler
      .getOneTeam(teamId)
      .then((team) => {
        console.log(team);
        this.setState(
          {
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

  render() {
    if (!this.state) {
      return <div> Loading ... </div>;
    }

    return (
      <div>
      <img src={this.state.image} alt="team pic" width="50px"/>
        <h2>{this.state.name} </h2>
        <aside> owner : {this.state.owner.name}</aside>
        <p>{this.state.description}</p>

        <TeamQuizzes quizzes={this.state.teamQuizz} />
        <TeamMembers members={this.state.members} />
      </div>
    );
  }
}

export default teamDashboard;
