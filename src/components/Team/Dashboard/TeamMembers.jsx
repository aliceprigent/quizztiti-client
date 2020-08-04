import React from "react";

const teamMembers = (props) => {
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
    <div id="team_members" >
      <div className="row space_between margin_bottom">
      <div>
      <h3>Members</h3>
      <aside id="owner"> owner : {(props.owner.name) ? props.owner.name : "you" }</aside>
      </div>
      <div className="column">
      <button className="btn"> Invite </button>

      </div>
</div>
      <ul>
        {props.members.map((member) => (
            <div className="row" key={member._id}>
            <img src={member.image} alt={member.name}/>
           {member.name} 
          </div>
        ))}
      </ul>
    </div>
    </React.Fragment>
  );
};

export default teamMembers;
