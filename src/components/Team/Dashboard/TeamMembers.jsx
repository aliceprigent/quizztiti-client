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
    <div>
      <h3>Members </h3>
      <ul>
        {props.members.map((member) => (
          <li key={member._id}> {member.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default teamMembers;
