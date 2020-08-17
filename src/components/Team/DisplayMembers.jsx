import React from 'react'

const displayMembers = (props) => {
// console.log(props)
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
          <h3>Current members ({props.members.length})</h3>
          </div>
          <div className="column">
          </div>
    </div>
          <ul>
          
{  props.mode === "create" &&   <div className="row" key={props.owner._id}>
                 <button className="btn owner" >  </button>
                <img src={props.owner.image} alt={props.owner.name}/>
                {props.owner.name}  (owner)
              </div>}

            {props.members &&   props.members.map((member) => (
                <div className="row" key={member._id}>
                { !(props.owner._id === member._id) ? <button className="btn delete" onClick={()=>props.updateMembers(member._id)}> x</button> : <button className="btn owner" >  </button>}
                <img src={member.image} alt={member.name}/>
                {member.name}  { (props.owner._id === member._id) ? "(owner)" :""}
              </div>
            ))}
          </ul>
        </div>
        </React.Fragment>
      );
    };

export default displayMembers


