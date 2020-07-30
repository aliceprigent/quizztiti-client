import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../Auth/UserContext";
import teamHandler from "../../../api/teamHandler";
import apiUser from "../../../api/apiUser";

class FormNewTeam extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    image: "",
    tmpImage: "",
    members: [],
    teamQuizzes: [],
    optionsMembers: [],
    userQuizzes: []
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
    var members = this.state.members;
    if (event.target.checked) {
      members.push(event.target.value);
    }  else if (!event.target.checked && members.includes(event.target.value)) {
         members = members.filter(x => x !== event.target.value)
    }
 
    this.setState({
      members: members,
    }, ()=> console.log("team members:", this.state.members));
  };

  handleQuizzes = (event) => {
    var teamQuizzes = [];
    if (event.target.checked) {
      teamQuizzes.push(event.target.value);
    }
    this.setState({
      teamQuizzes: teamQuizzes,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var newTeamData = {
      name: this.setState.name,
      image: this.setState.image,
      members: this.setState.members,
      teamQuizz: [],
    };

    teamHandler
      .create(newTeamData)
      .then((newTeam) => {
        console.log(newTeam);
        //this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
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
        this.setState({ userQuizzes: userPopulatedJSON.data.quizzCreated });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Team Name</label>
        <input type="text" id="name" name="name" onChange={this.handleChange} />

        <label htmlFor="image">image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={this.handleImage}
        />

        <label htmlFor="members"> Add Members</label>
        {this.state.optionsMembers.map((optionMember) => (
          <label htmlFor={`${optionMember.name}`} key={optionMember._id} >
            <img src={`${optionMember.image}`} alt={optionMember.name} />
            {`${optionMember.name}`}

            <input
              type="checkbox"
              id={`${optionMember.name}`}
              name={`${optionMember.name}`}
              value={optionMember._id}
              onChange={this.handleMembers}
            />
          </label>
        ))}

        <label htmlFor="quizzes"> Add some of your quizzes to your team </label>
        {this.state.userQuizzes === [] && "no quizz to assign, create some"}
        {this.state.userQuizzes && this.state.userQuizzes.map((optionQuizz) => (
          <label key={optionQuizz._id} htmlFor={optionQuizz.title}>
            {optionQuizz.theme} - {optionQuizz.title}
            <input
              type="checkbox"
              id={optionQuizz.title}
              name={optionQuizz.title}
              value={optionQuizz._id}
              onChange={this.handleQuizzes}
            />
          </label>
        ))}

        <button>Create Team</button>
      </form>
    );
  }
}

export default withRouter(FormNewTeam);
