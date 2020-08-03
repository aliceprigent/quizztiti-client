import React from "react";
import { withUser } from "../Auth/withUser";

const UserProfile = (props) => {
  if (props.context.user === null) return null;
  console.log(props.context.user)

  let globalScore = props.context.user.quizzDone.reduce((acc, currentValue) => {
    return acc + currentValue.score
  }, 0) 

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
          <h3>{props.context.user.name}</h3>
          <a href="/profile/edit">
            <button style={{ marginTop: "30px" }} className="btn">
              EDIT
            </button>
          </a>
        </div>
        <div className="column center shadow-box" style={{ width: "40%" }}>
          <h3>SCORE</h3>
          <h4>{globalScore}</h4>
        </div>
      </section>
    </React.Fragment>
  );
};

export default withUser(UserProfile);
