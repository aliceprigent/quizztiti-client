import React from "react";

const UserTeam = (props) => {
    return (
        <React.Fragment>
        <h2>MY TEAM</h2>
        <a href="/team/create">
          <button style={{ marginTop: "10px", width: "10em" }} className="btn">
            CREATE TEAM
          </button>
        </a>
       
      </React.Fragment>
    );
  };

export default UserTeam
