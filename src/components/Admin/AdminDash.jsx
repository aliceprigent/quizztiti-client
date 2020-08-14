import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import { withUser } from "../Auth/withUser";
import StickerDashboard from "../Dasboard/StickerDashboard";
import apiUser from "../../api/apiUser";
import quizzHandler from "../../api/quizzHandler";

export class AdminDash extends Component {
  static contextType = UserContext;
  state = {
    quizzToValidate: [],
    // inputSearchMembers:"null",
    optionsMembers: [],
    members: [],
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  updateMembers = (memberId) => {
    this.setState(
      {
        members: this.state.members.filter((member) => member._id !== memberId),
      },
      () => console.log("new state members!")
    );
  };

  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then(
        (allQuizz) => {
          console.log(allQuizz);
          this.setState({ quizzToValidate: allQuizz });
        },
        () => console.log(this.state.quizzToValidate)
      )
      .catch((error) => {
        console.log(error);
      });

    apiUser
      .getUsers()
      .then((usersJSON) => {
        console.log(usersJSON);
        this.setState({ members: usersJSON.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var quizzList = this.state.quizzToValidate.filter((OneQuizz) => {
      return OneQuizz.isPublished === false;
    });

    var filteredMembers = this.state.members.filter((member) => {
      if (this.state.inputSearchMembers) {
        return member.name.toLowerCase().includes(this.state.filteredMembers);
      } else {
        return member;
      }
    });
    return (
      <div className="center column">
        <section className="column center section-dashboard">
          <div className="row center dashboard-row wrap">
            <div className="dashboard-box shadow-box row">
              {quizzList.length === 0 && (
                <p style={{ color: "black", fontSize: "25px" }}>
                  No quizz to validate
                </p>
              )}
              {quizzList.length > 0 &&
                quizzList.map((quizz) => {
                  return (
                    <Link
                      to={{
                        pathname: "/quizz/edit/yourQuizz",
                        quizzProps: { quizz },
                        state: quizz._id,
                      }}
                    >
                      <StickerDashboard key={quizz._id} quizz={quizz} />
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
        <div className="dashboard-box shadow-box row">
          <Link to="/quizz">See All Quizzes</Link>
        </div>
        <div className="members-administration dashboard-box shadow-box row">
          <div className="column">
            <h3>Search Members</h3>
            <input
              className="sign-input"
              type="text"
              name="inputSearchMembers"
              placeholder="Search members"
              onChange={this.handleChange}
            />
            <div id="add_members">
              {filteredMembers.map((member) => (
                <Link
                  to={{
                    pathname: "/manage-member",
                    state: member._id,
                  }}
                >
                  <label
                    className="sign-label"
                    htmlFor={`${member.name}`}
                    key={member._id}
                  >
                    <div className="row">
                      <img src={`${member.image}`} alt={member.name} />
                      {`${member.name}`}
                    </div>
                  </label>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(AdminDash);
