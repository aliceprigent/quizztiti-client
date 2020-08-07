import React from "react";
import { withUser } from "../Auth/withUser";

const UserProfile = (props) => {
  if (props.context.user === null) return null;
  // console.log(props.context.user)

  let globalScore = 0;

  if (props.context.user.quizzDone) {
    globalScore = props.context.user.quizzDone.reduce((acc, currentValue) => {
    return acc + currentValue.score
  }, 0)
}

   

  return (
    <React.Fragment>
      <section className="row space-around">
        <div className="column center" style={{ paddingTop: "20px" }}>
          <img
            src={props.context.user.image}
            className="avatar"
            style={{
              backgroundColor: "var(--grey)",
              padding: "15px",
              margin: "0px",
            }}
            alt="r"
          />
          <h3 style={{marginTop:"10px"}}>{props.context.user.name}</h3>
          <a href="/profile/edit">
            <button style={{ marginTop: "20px" }} className="btn">
              EDIT
            </button>
          </a>
        </div>
        
        <div className="column center score-box" style={{ width: "35%" }}>
        <h3>SCORE</h3>
        <img alt="r" style={{width: "40px", marginTop: "10px"}} src="https://img.icons8.com/officel/80/000000/gold-medal.png"/>
          <h4 style={{fontSize:"30px", color:"var(--red)"}}>{globalScore}</h4>
        </div>
      </section>
    </React.Fragment>
  );
};

export default withUser(UserProfile);
