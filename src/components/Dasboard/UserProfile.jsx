import React from "react";

const UserProfile = (props) => {
    return (
      <React.Fragment>
      <section className="row space-around">
      <div className="column center" style={{paddingTop: "20px"}}>
      <img src={props.user.image} className="avatar" style={{backgroundColor:"var(--grey)", padding:"15px", margin: "0px"}} alt="r"/>
          <h3>{props.user.name}</h3>
          <a href="/profile/edit"><button style={{marginTop:"30px"}}className="btn">EDIT</button></a>
          </div>
          <div className="column center shadow-box" style={{width:"40%"}}>
              <h3>SCORE</h3>
              <h4 style={{marginTop:"30px"}}>score</h4>
          </div>
          </section>
      </React.Fragment>
    );
  };

export default UserProfile
