import React, { Component } from "react";
import DisplayQuizzes from "../DisplayQuizzes";
import apiUser from "./../../../api/apiUser";

export class AddQuizz extends Component {
  state = {
    userQuizzes: null,
    newTeamQuizzes: null,
  };

  componentDidMount() {
    apiUser
      .getOneUser()
      .then((res) => {
        console.log("current user data", res);
        this.setState({ userQuizzes: [...res.data.quizzCreated] });
      })
      .catch((err) => console.error(err));
  }

  handleQuizzes = (event) => {
    var quizzes = [];
    if (!this.state.newTeamQuizzes) {
      quizzes = [...this.props.quizzes];
    } else {
      quizzes = [...this.state.newTeamQuizzes];
    }
    console.log("quizzes in handlequizzes", quizzes);
    const id = event.target.value;
    if (event.target.checked) {
      const quizzObj = this.state.userQuizzes.find((quizz) => quizz._id === id);
      //console.log('quizzObj to add', quizzObj)
      quizzes.push(quizzObj);
    } else if (!event.target.checked && quizzes.includes(event.target.value)) {
      quizzes = quizzes.filter((x) => x !== event.target.value);
    }
    this.setState({ newTeamQuizzes: quizzes }, () =>
      console.log("new team quizzes:", this.state.newTeamQuizzes)
    );
  };

  checkOptionQuizzes = (userQuizz) => {
    let state;
    let teamQuizzesCopy = [...this.props.quizzes];
    state = !!teamQuizzesCopy.find(
      (teamQuizz) => teamQuizz._id === userQuizz._id
    );
    //console.log("option is in team quizzes?", state);
    if (state) return true;
    else return false;
  };

  handleSubmit = () => {
    this.props.addQuizz(this.state.newTeamQuizzes);
    this.props.toggleAddQuizz();
  };

  render() {
    return (
      <div>
        <div className="row ">
          <div className="row">
            <div id="team_quizzes">
              <div className="row space-between margin_bottom">
                <div>
                  <h3>Current quizzes ({this.props.quizzes.length})</h3>
                </div>
                <div className="column"></div>
              </div>
              <ul>
                {this.props.quizzes.map((quizz) => (
                  <div className="row" key={quizz._id}>
                    [{quizz.thema}] - {quizz.title}
                  </div>
                ))}
              </ul>
            </div>

            <div>
              <h3>Add quizzes of your creation</h3>

              {this.state.userQuizzes &&
                this.state.userQuizzes.map((userQuizz) => (
                  <label htmlFor={`${userQuizz._id}`} key={userQuizz._id}>
                    <div className="row">
                      <input
                        type="checkbox"
                        id={`${userQuizz._id}`}
                        name={`${userQuizz.title}`}
                        value={userQuizz._id}
                        onChange={this.handleQuizzes}
                        disabled={this.checkOptionQuizzes(userQuizz)}
                      />
                      [{userQuizz.thema}] {userQuizz.title}
                    </div>
                  </label>
                ))}
              <button className="btn add" onClick={this.handleSubmit}>
                add to the team quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddQuizz;
