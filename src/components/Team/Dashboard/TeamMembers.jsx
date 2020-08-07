import { withUser } from "../../Auth/withUser";
import React from "react";


var successRate = (quizzDone) => {
  var numberQuizz = quizzDone.length
  var globalScore = quizzDone.reduce((acc, currentValue) => {
      return acc + currentValue.score
    }, 0)

    return Math.round(globalScore / (numberQuizz)*10)

}

var score = (quizzDone) => {

  var globalScore = quizzDone.reduce((acc, currentValue) => {
      return acc + currentValue.score
    }, 0)

    return Math.round(globalScore) 

}


const teamMembers = (props) => {
  console.log("in team members, context:", props.context);
  if (!props.members) {
    return (
      <div>
        {" "}
        <h3>Members </h3>Loading...
      </div>
    );
  }
  return (
      <React.Fragment>
    <div id="dash_team_members" >
      <div className="row space-between">
      
      <h3>Members</h3>
    
      { props.context.user._id === props.owner._id &&
      <div className="column">
      <button className="btn" onClick={props.edit}> Manage </button>

      </div>}
</div>
      <ul>
        {props.members.map((member) => (
            <div className="row" key={member._id}>
            <img src={member.image} alt={member.name}/>
           {member.name} - {score(member.quizzDone)}pts {(props.owner.name === member.name) ? "(owner)" : "" }
          </div>
        ))}
      </ul>
    </div>
    </React.Fragment>
  );
};

export default withUser(teamMembers);
