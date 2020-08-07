import React, { Component } from "react";

export class UserStats extends Component {
  successRate = (quizzDone) => {
    var result;
if (quizzDone.length === 0) { result = 0}
else {
    var numberQuizz = quizzDone.length;
    var globalScore = quizzDone.reduce((acc, currentValue) => {
      return acc + currentValue.score;
    }, 0);
    result = Math.round((globalScore / numberQuizz) * 10);
  }
    return result;
  };

  render() {
    return (
      <React.Fragment>
        <h2>MY STATS</h2>
        <section className="row center">
          <div
            className="column center score-box"
            style={{ width: "20%", height: "25vh", margin: "25px" }}
          >
            <h3>QUIZZ DONE</h3>
            <img
              alt="r"
              style={{ width: "40px", marginTop: "10px" }}
              src="https://img.icons8.com/cotton/64/000000/cupid-target.png"
            />

            <h4 style={{ fontSize: "30px", color: "var(--red)" }}>
              {this.props.user.quizzDone && this.props.user.quizzDone.length}
            </h4>
          </div>

          <div
            className="column center score-box"
            style={{
              width: "25%",
              height: "30vh",
              margin: "25px",
              backgroundColor: "var(--red)",
            }}
          >
            <h3
              style={{ textAlign: "center", color: "white", fontSize: "30px" }}
            >
              SUCCESS
            </h3>
            <img
              alt="r"
              style={{ width: "40px", marginTop: "10px" }}
              src="https://img.icons8.com/color/96/000000/easy.png"
            />
            <h4 style={{ fontSize: "30px", color: "white" }}>
              {this.props.user.quizzDone &&
                this.successRate(this.props.user.quizzDone)}
              %
            </h4>
          </div>

          <div
            className="column center score-box"
            style={{ width: "20%", height: "25vh", margin: "25px" }}
          >
            <h3>QUIZZ CREATED</h3>
            <img
              alt="r"
              style={{ width: "40px", marginTop: "10px" }}
              src="https://img.icons8.com/fluent/96/000000/idea.png"
            />

            <h4 style={{ fontSize: "30px", color: "var(--red)" }}>
              {this.props.user.quizzCreated &&
                this.props.user.quizzCreated.length}
            </h4>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default UserStats;
