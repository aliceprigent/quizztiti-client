import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import teamHandler from "../../api/teamHandler";
import apiUser from "../../api/apiUser";
import "../../styles/global.css";
import DisplayMembers from "../Team/DisplayMembers";
import DisplayQuizzes from "../Team/DisplayQuizzes";
import "../../styles/teams/teamDashboard.css";
import { Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FormNewTeam extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }
  static contextType = UserContext;

  state = {
    owner: null,
    name: "",
    image: "",
    tmpImage: "/media/teams/flame-793.png",
    members: [],
    teamQuizzes: [],
    optionsMembers: [],
    userQuizzes: [],
    inputSearchMembers: null,
  };

  // removeImages = (event) => {
  //   // didn't manage to make it work
  //   console.log("in Remove Images");
  //   this.setState({ image: null, tmpImage: null }, () =>
  //     console.log("removed images")
  //   );
  // };

  handleClick = () => {
    this.fileInput.current.click();
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleImage = (event) => {
    this.setState({
      image: event.target.files[0],
      tmpImage: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleMembers = (event) => {
    var members = [...this.state.members];
    const id = event.target.value;
    if (event.target.checked) {
      const userObj = this.state.optionsMembers.find((user) => user._id === id);
      members.push(userObj);
    } else if (!event.target.checked && members.includes(event.target.value)) {
      members = members.filter((x) => x !== event.target.value);
    }
    this.setState({ members: members }
    );
  };

  handleQuizzes = (event) => {
    var quizzes = [...this.state.teamQuizzes];
    const id = event.target.value;
    if (event.target.checked) {
      const quizzObj = this.state.userQuizzes.find((quizz) => quizz._id === id);
      quizzes.push(quizzObj);
    } else if (!event.target.checked && quizzes.includes(event.target.value)) {
      quizzes = quizzes.filter((x) => x !== event.target.value);
    }
    this.setState({ teamQuizzes: quizzes }
    );
  };

  updateMembers = (memberId) => {
    const mode = this.props.match.params.mode;
    if (mode === "edit") {
      var deletion = { userId: memberId, teamId: this.state.teamId };
      apiUser
        .deleteTeamInUser(deletion)
        .then((DBres) => {
          console.log("team deleted from user");
          this.setState(
            {
              members: this.state.members.filter(
                (member) => member._id !== memberId
              ),
            },
            () => console.log("new state members!")
          );
        })
        .catch((err) => console.error(err));
    } else {
      this.setState(
        {
          members: this.state.members.filter(
            (member) => member._id !== memberId
          ),
        },
        () => console.log("new state members!")
      );
    }
  };

  updateQuizz = (quizzId) => {
    const mode = this.props.match.params.mode;
    this.setState(
      {
        teamQuizzes: this.state.teamQuizzes.filter(
          (quizz) => quizz._id !== quizzId
        ),
      },
      () => console.log("new state members!")
    );
  };

  checkOptionQuizzes = (userQuizz) => {
    let state;
    let teamQuizzesCopy = [...this.state.teamQuizzes];
    state = !!teamQuizzesCopy.find(
      (teamQuizz) => teamQuizz._id === userQuizz._id
    );
    // console.log("option is in team quizzes?", state);
    if (state) return true;
    else return false;
  };

  checkOptionMember = (optionMember) => {
    let state;
    let membersCopy = [...this.state.members];
    state = !!membersCopy.find((member) => member._id === optionMember._id);
    //console.log("option is in members ?", state);
    if (state) return true;
    else return false;
  };

  handleSubmit = (event) => {
    const mode = this.props.match.params.mode;
    event.preventDefault();
    var newTeamData = {
      owner: this.state.owner,
      name: this.state.name,
      image: this.state.image,
      description: this.state.description,
      members: this.state.members,
      teamQuizz: this.state.teamQuizzes,
    };

    function buildFormData(formData, data, parentKey) {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        Object.keys(data).forEach((key) => {
          buildFormData(
            formData,
            data[key],
            parentKey ? `${parentKey}[${key}]` : key
          );
        });
      } else {
        const value = data == null ? "" : data;

        formData.append(parentKey, value);
      }
    }

    function jsonToFormData(data) {
      const formData = new FormData();

      buildFormData(formData, data);

      return formData;
    }

    var objectFormData = jsonToFormData(newTeamData);

    if (mode === "create") {
      teamHandler
        .create(objectFormData)
        .then((newTeam) => {
          // console.log(newTeam);
          const updatedUser = {...this.context.user};
          updatedUser.teams = [...updatedUser.teams, newTeam._id];
          this.context.setUser(updatedUser);
          this.setState({ teamId: newTeam._id });
          if (this.state.submitted)
            this.props.history.push(`/teams/${this.state.teamId}`);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ submitted: false });
        });
    } else {
      teamHandler
        .updateOneTeam(this.state.teamId, objectFormData)
        .then((updatedTeam) => {
          // console.log(updatedTeam);
          if (this.state.submitted)
            this.props.history.push(`/teams/${this.state.teamId}`);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ submitted: false });
        });
    }
  };

  finalSubmit = (event) => {
    this.setState({ submitted: true });
    this.handleSubmit(event);
  };

  handleDelete = (event) => {
    const mode = this.props.match.params.mode;
    if (mode === "edit") {
      teamHandler
        .deleteTeam(this.props.match.params.id)
        .then((DBres) => {
          console.log("deletion complete");
          this.setState({ submitted: true });
          if (this.state.submitted) this.props.history.push(`/dashboard`);
        })
        .catch((err) => {
          console.error("error in deletion", err);
          this.setState({ submitted: false });
        });
    }
  };

  componentDidMount() {
    const mode = this.props.match.params.mode;

    apiUser
      .getUsers()
      .then((usersJSON) => {
        // console.log(usersJSON);
        this.setState({ optionsMembers: usersJSON.data });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUser
      .getOneUser()
      .then((userPopulatedJSON) => {
        // console.log(userPopulatedJSON);
        this.setState({
          owner: userPopulatedJSON.data,
          userQuizzes: userPopulatedJSON.data.quizzCreated,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    if (mode === "edit") {
      teamHandler
        .getOneTeam(this.props.match.params.id)
        .then((DBres) => {
          // const newoptionsMembers = this.state.optionsMembers.filter(optionMember => !DBres.members.find(teamMember => optionMember._id === teamMember._id))
          this.setState(
            {
              teamId: DBres._id,
              owner: DBres.owner,
              name: DBres.name,
              description: DBres.description,
              image: DBres.image,
              tmpImage: DBres.image,
              members: DBres.members,
              teamQuizzes: DBres.teamQuizz,
              // optionsMembers : newoptionsMembers
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const mode = this.props.match.params.mode;
    // console.log("context", this.context);
    if (this.props.context.user === null) return null;
    // console.log("context user", this.props.context.user);
    // console.log("owner", this.state.owner);

    if (!this.state.owner) {
      return <div> Please wait ...</div>;
    }

    if (
      mode === "edit" &&
      this.props.context.user._id !== this.state.owner._id
    ) {
      this.props.history.push("/dashboard");
    }

    return (
      <div className="center column">
        {mode === "create" ? (
          <div className="row space-around">
          <img
              src={this.state.tmpImage ? this.state.tmpImage : this.state.image}
              alt="your team image"
              className="team_image"
            />
            <h2 id="form_mode" className="column center">
              Create a new team !
            </h2>
            
          </div>
        ) : (
          <div id="form_mode" className="row space-around">
          <img
              src={this.state.tmpImage ? this.state.tmpImage : this.state.image}
              alt="your team image"
              className="team_image"
            />
            <h2>Edit team </h2>
            
            <h2 className="red click" onClick={this.handleDelete}>
              Delete team
            </h2>
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column">
            <FontAwesomeIcon icon="images" size="2x" color="rgba(243, 236, 236, 0.808)"  className="icon" onClick={this.handleClick} />
              <input
                className="sign-input"
                type="file"
                id="image"
                name="image"
                onChange={this.handleImage}
                ref={this.fileInput}
              style={{ display: "none" }}
              />
            </div>

            <div className="column">
              <input
                className="sign-input"
                type="text"
                id="name"
                name="name"
                maxLength="25"
                onChange={this.handleChange}
                defaultValue={mode === "edit" ? this.state.name : ""}
                placeholder={
                  mode === "edit" ? this.state.name : "a cool team name"
                }
              />
            </div>
            <div className="column">
              <textarea
                className="sign-input"
                id="description"
                name="description"
                maxLength="125"
                rows="3"
                cols="20"
                onChange={this.handleChange}
                defaultValue={mode === "edit" ? this.state.description : ""}
                placeholder={
                  mode === "edit"
                    ? this.state.description
                    : "team description : a gathering of crazy brains"
                }
              />
            </div>
          </div>
          <div className="row space_evenly ">
            <DisplayMembers
              owner={this.state.owner}
              updateMembers={this.updateMembers}
              members={this.state.members}
              mode={ mode === "create" ? "create" : "edit"}
            />
            <div className="column">
              <h3>Add members</h3>
              <input
                className="sign-input"
                type="text"
                name="inputSearchMembers"
                placeholder="Search members"
                onChange={this.handleChange}
              />
              <div id="add_members">
                {this.state.inputSearchMembers &&
                  this.state.optionsMembers
                    .filter((optionMember) =>
                      optionMember.name
                        .toLowerCase()
                        .includes(this.state.inputSearchMembers.toLowerCase())
                    )
                    .map((optionMember) => ( optionMember._id !== this.state.owner._id &&
                      <label
                        className="sign-label"
                        htmlFor={`${optionMember.name}`}
                        key={optionMember._id}
                      >
                        <div className="row">
                          <input
                            type="checkbox"
                            id={`${optionMember.name}`}
                            name={`${optionMember.name}`}
                            value={optionMember._id}
                            onChange={this.handleMembers}
                            disabled={this.checkOptionMember(optionMember)}
                          />

                          <img
                            src={`${optionMember.image}`}
                            alt={optionMember.name}
                          />
                          {`${optionMember.name}`}
                        </div>
                      </label>
                    ))}

                {(!this.state.inputSearchMembers ||
                  this.state.inputSearchMembers === "") &&
                  this.state.optionsMembers.map((optionMember) => ( optionMember._id !== this.state.owner._id &&
                    <label
                      className="sign-label"
                      htmlFor={`${optionMember.name}`}
                      key={optionMember._id}
                    >
                      <div className="row">
                        <input
                          type="checkbox"
                          id={`${optionMember.name}`}
                          name={`${optionMember.name}`}
                          value={optionMember._id}
                          onChange={this.handleMembers}
                          disabled={this.checkOptionMember(optionMember)}
                        />
                        <img
                          src={`${optionMember.image}`}
                          alt={optionMember.name}
                        />
                        {`${optionMember.name}`}
                      </div>
                    </label>
                  ))}
              </div>
            </div>
          </div>

          <div className="row space-around ">
            <DisplayQuizzes
              updateQuizzes={this.updateQuizz}
              quizzes={this.state.teamQuizzes}
            />
            <div className="column">
              <h3>Add quizzes</h3>
              <input
                className="sign-input"
                type="text"
                name="inputSearchQuizz"
                placeholder="Search quizz"
                onChange={this.handleQuizzes}
              />
              <div id="add_quizzes" >
              {this.state.inputSearchQuizz &&
                this.state.userQuizzes
                  .filter(
                    (userQuizz) =>
                      userQuizz.title
                        .toLowerCase()
                        .includes(this.state.inputSearchQuizz.toLowerCase()) ||
                      userQuizz.thema
                        .toLowerCase()
                        .includes(this.state.inputSearchQuizz.toLowerCase())
                  )
                  .map((userQuizz) => (
                    <label
                      className="sign-label"
                      htmlFor={`${userQuizz.title}`}
                      key={userQuizz._id}
                    >
                      <div className="row">
                        <input
                          type="checkbox"
                          id={`${userQuizz.title}`}
                          name={`${userQuizz.title}`}
                          value={userQuizz._id}
                          onChange={this.handleQuizzes}
                          disabled={this.checkOptionQuizzes(userQuizz)}
                        />
                        [{userQuizz.thema}] {userQuizz.title}
                      </div>
                    </label>
                  ))}

              {(!this.state.inputSearchQuizzes ||
                this.state.inputSearchQuizzes === "") &&
                this.state.userQuizzes.map((userQuizz) => (
                  <label
                    className="sign-label"
                    htmlFor={`${userQuizz.title}`}
                    key={userQuizz._id}
                  >
                    <div className="row">
                      <input
                        type="checkbox"
                        id={`${userQuizz.title}`}
                        name={`${userQuizz.title}`}
                        value={userQuizz._id}
                        onChange={this.handleQuizzes}
                        disabled={this.checkOptionQuizzes(userQuizz)}
                      />
                      [{userQuizz.thema}] {userQuizz.title}
                    </div>
                  </label>
                ))}
                </div>
            </div>
          </div>

          <div className="column center"></div>
        </form>
        <button className="btn" onClick={this.finalSubmit}>
          {mode === "create" ? "Create" : "Edit"}
        </button>
      </div>
    );
  }
}

export default withUser(FormNewTeam);
