import React, { Component } from 'react';
import teamQuizzes from "./teamDashboard/teamQuizzes";
import teamMembers from "./teamDashboard/teamMembers";
import teamHandler from "../../api/teamHandler";

export class teamDashboard extends Component {


componentDidMount(){
    var teamId = this.props.match.params.id;
    teamHandler
    .getOneTeam(teamId)
    .then((teamJSON) => console.log(teamJSON.data))
    .catch((err) => console.error(err))

}


    render() {

if (!this.state) { return <div> Loading ... </div>}

        return (
            <div>
<teamQuizzes />
<teamMembers />


                
            </div>
        )
    }
}

export default teamDashboard
