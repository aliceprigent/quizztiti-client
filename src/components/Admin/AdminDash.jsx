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
    inputSearchMembers: "",
    optionsMembers: [],
    members: [],
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then((allQuizz) => {
        console.log(allQuizz);
        this.setState({ quizzToValidate: allQuizz });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUser
      .getUsers()
      .then((users) => {
        console.log(users);
        this.setState({ members: users.data }, () =>
          console.log("this.state", this.state)
        );
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
      if (this.state.inputSearchMembers !== null) {
        return member.name
          .toLowerCase()
          .includes(this.state.inputSearchMembers);
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
            {this.state.members.length>0&&(
              filteredMembers.map((member) => (
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
              )))}

              {this.state.members.length===0&&(
                <p>No Members in database</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(AdminDash);
