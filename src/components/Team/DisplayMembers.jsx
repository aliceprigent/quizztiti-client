import React from 'react'

const displayMembers = (props) => {

    console.log("in display members", props.members)
    if (!props.members) {
        return (
          <div>
            {" "}
            <h3>Members </h3>Loading...
          </div>
        );
      }
      if (props.members===[]) {
        return (
          <div>
            {" "}
            <h3>Members </h3> Add members
          </div>
        );
      }
      return (
          <React.Fragment>
        <div id="team_members" >
          <div className="row space_between margin_bottom">
          <div>
          <h3>Members</h3>
          </div>
          <div className="column">
          </div>
    </div>
          <ul>
            {props.members.map((member) => (
                <div className="row" key={member._id}>
                <img src={member.image} alt={member.name}/>
               {member._id} {member.name} 
              </div>
            ))}
          </ul>
        </div>
        </React.Fragment>
      );
    };

export default displayMembers


