import React from "react";
import StickerTeam from "../Dasboard/StickerTeam"
import {Link} from "react-router-dom";

const UserTeam = (props) => {
  if(!props.user){
    return (
    <div>Loading..</div>)
  }
    return (
        <React.Fragment>
        
       <h2>MY TEAMS</h2>
       <a href="/team/create">
          <button style={{ marginTop: "10px", width: "10em" }} className="btn">
            CREATE TEAM
          </button>
        </a>
        <div className="row wrap" style={{width:"100%"}}>
        {props.user.teams &&
          props.user.teams.map((team) =>
              <Link to={`/teams/${team._id}`} >
                <StickerTeam key={team._id} team={team} />
              </Link>
          )}
          </div>
       
      </React.Fragment>
    );
  };

export default UserTeam
