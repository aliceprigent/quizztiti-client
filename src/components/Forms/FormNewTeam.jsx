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

class FormNewTeam extends Component {
  static contextType = UserContext;

  state = {
    owner: null,
    name: "",
    image: "",
    tmpImage: "",
    members: [],
    teamQuizzes: [],
    optionsMembers: [],
    userQuizzes: [],
    inputSearchMembers: null,
  };

  removeImages = (event) => {
    // didn't manage to make it work
    console.log("in Remove Images");
    this.setState({ image: null, tmpImage: null }, () =>
      console.log("removed images")
    );
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value }, console.log(this.state));
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
    this.setState({ members: members }, () =>
      console.log("team members:", this.state.members)
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
    this.setState({ teamQuizzes: quizzes }, () =>
      console.log("team quizzes:", this.state.teamQuizzes)
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
    console.log("option is in team quizzes?", state);
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
          console.log(newTeam);
          this.setState({ teamId: newTeam._id });
          if  (this.state.submitted)  this.props.history.push(`/teams/${this.state.teamId}`)
        })
        .catch((error) => {
          console.log(error);
          this.setState({submitted : false})
        });
    } else {
      teamHandler
        .updateOneTeam(this.state.teamId, objectFormData)
        .then((updatedTeam) => {
          console.log(updatedTeam);
          if  (this.state.submitted)  this.props.history.push(`/teams/${this.state.teamId}`)
        })
        .catch((error) => {
          console.log(error);
          this.setState({submitted : false});
        });
    }
  };

  finalSubmit = (event) => {
    this.setState({submitted : true})
    this.handleSubmit(event);
  }

  handleDelete = (event) => {
    const mode = this.props.match.params.mode;
    if (mode === "edit") {
      teamHandler
        .deleteTeam(this.props.match.params.id)
        .then((DBres) => console.log("deletion complete"))
        .catch((err) => console.error("error in deletion", err));
    }
  };

  componentDidMount() {
    const mode = this.props.match.params.mode;

    apiUser
      .getUsers()
      .then((usersJSON) => {
        console.log(usersJSON);
        this.setState({ optionsMembers: usersJSON.data });
      })
      .catch((error) => {
        console.log(error);
      });

    apiUser
      .getOneUser()
      .then((userPopulatedJSON) => {
        console.log(userPopulatedJSON);
        this.setState({ owner: userPopulatedJSON.data._id , userQuizzes: userPopulatedJSON.data.quizzCreated });
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
            },
            () => console.log(this.state)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const mode = this.props.match.params.mode;

    return (
      <React.Fragment>
        {mode === "create" ? (
          <h2 className="column center"> Create a new team !" </h2>
        ) : (
          <h2 className="row space_between">
            {" "}
            <span>Edit your team </span>{" "}
            <span className="red click" onClick={this.handleDelete}>
              {" "}
              Delete your team{" "}
            </span>{" "}
          </h2>
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column">
              <input
                type="file"
                id="image"
                name="image"
                onChange={this.handleImage}
              />
              <img
                src={
                  this.state.tmpImage ? this.state.tmpImage : this.state.image
                }
                alt="your team image"
                className="team_image"
              />
            </div>

            <div className="column">
              <label htmlFor="name">Team Name</label>
              <input
                type="text"
                id="name"
                name="name"
                maxLength="25"
                onChange={this.handleChange}
                defaultValue={
                  mode === "edit" ? this.state.name : ""
                }
                placeholder={
                  mode === "edit" ? this.state.name : "a cool team name"
                }
              />
            </div>
            <div className="column">
              <label htmlFor="description">Team Description</label>
              <textarea
                id="description"
                name="description"
                maxLength="125"
                rows="3"
                cols="20"
                onChange={this.handleChange}
                defaultValue={
                  mode === "edit"
                    ? this.state.description
                    : ""
                }
                placeholder={
                  mode === "edit"
                    ? this.state.description
                    : "a team of crazy brains"
                }
              />
            </div>
          </div>
          <div className="row space_evenly ">
            <div className="column">
              <h3>Add members</h3>
              <input
                type="text"
                name="inputSearchMembers"
                placeholder="Search members"
                onChange={this.handleChange}
              />
              {this.state.inputSearchMembers &&
                this.state.optionsMembers
                  .filter((optionMember) =>
                    optionMember.name
                      .toLowerCase()
                      .includes(this.state.inputSearchMembers.toLowerCase())
                  )
                  .map((optionMember) => (
                    <label
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
                this.state.optionsMembers.map((optionMember) => (
                  <label
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
          
              <DisplayMembers
                owner={this.state.owner}
                updateMembers={this.updateMembers}
                members={this.state.members}
              />
       
          </div>

          <div className="row space_evenly ">
            <div className="column">
              <h3>Add quizzes</h3>
              <input
                type="text"
                name="inputSearchQuizz"
                placeholder="Search quizz"
                onChange={this.handleQuizzes}
              />
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
                    <label htmlFor={`${userQuizz.title}`} key={userQuizz._id}>
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
                  <label htmlFor={`${userQuizz.title}`} key={userQuizz._id}>
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

              <DisplayQuizzes
                updateQuizzes={this.updateQuizz}
                quizzes={this.state.teamQuizzes}
              />
  
          </div>

          <div className="column center">
          </div>
        </form>
        <button className="btn" onClick={this.finalSubmit}>
              {mode === "create" ? "Create" : "Edit"}
            </button>
      </React.Fragment>
    );
  }
}

export default withRouter(FormNewTeam);
