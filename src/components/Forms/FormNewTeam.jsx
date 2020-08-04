import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import teamHandler from "../../api/teamHandler";
import apiUser from "../../api/apiUser";
import "../../styles/global.css";
import DisplayMembers from "../Team/DisplayMembers";


class FormNewTeam extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    image: "",
    tmpImage: "",
    members: [],
    teamQuizzes: [],
    optionsMembers: [],
    userQuizzes: [],
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
    var members = this.state.members;
    if (event.target.checked) {
      members.push(event.target.value);
    } else if (!event.target.checked && members.includes(event.target.value)) {
      members = members.filter((x) => x !== event.target.value);
    }
    this.setState(
      { members: members },
      () => console.log("team members:", this.state.members)
    );
  };

    handleQuizzes = (event) => {
      var quizzes = this.state.teamQuizzes;
      if (event.target.checked) {
        quizzes.push(event.target.value);
      } else if (!event.target.checked && quizzes.includes(event.target.value)) {
        quizzes = quizzes.filter((x) => x !== event.target.value);
      }
      this.setState(
        { teamQuizzes: quizzes },
        () => console.log("team quizzes:", this.state.teamQuizzes)
      );
    };
  
  handleSubmit = (event) => {
    const mode = this.props.match.params.mode;
    event.preventDefault();
    var newTeamData = {
      name: this.state.name,
      image: this.state.image,
      description : this.state.description,
      members: this.state.members,
      teamQuizz: this.state.teamQuizzes,
    };

    function buildFormData(formData, data, parentKey) {
      if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        const value = data == null ? '' : data;
    
        formData.append(parentKey, value);
      }
    }
    
    function jsonToFormData(data) {
      const formData = new FormData();
    
      buildFormData(formData, data);
    
      return formData;
    }
    
    
   var objectFormData = jsonToFormData(newTeamData)

   if (mode === "create") {

    teamHandler
      .create(objectFormData)
      .then((newTeam) => {
        console.log(newTeam);
        //this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      })
    }
    else {
      teamHandler
      .updateOneTeam(this.props.match.params.id, objectFormData)
      .then((updatedTeam) => {
        console.log(updatedTeam)
        //this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
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
        this.setState({ userQuizzes: userPopulatedJSON.data.quizzCreated });
      })
      .catch((error) => {
        console.log(error);
      });

      if (mode === "edit") {
        teamHandler
          .getOneTeam(this.props.match.params.id)
          .then((DBres) => {
            this.setState(
              {name: DBres.name,
              image: DBres.image,
              tmpImage: DBres.image,
              members: DBres.members,
              teamQuizzes: DBres.teamQuizz,
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
        <h2 className="column center" >{mode === "create" ? "Create a new team !" : "Edit your team"}</h2>

        <form className="column center" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Team Name</label>
          <input
            type="text"
            id="name"
            name="name"
            maxLength="25"
            onChange={this.handleChange}
            defaultValue={mode === "edit" ? this.state.name : "a cool team name"}
          />

<label htmlFor="description">Team Description</label>
          <textarea
            
            id="description"
            name="description"
            maxLength="125"
            rows="3" cols="20"
            onChange={this.handleChange}
            defaultValue={mode === "edit" ? this.state.description : "a team of crazy brains"}
          />

          <label htmlFor="image">image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={this.handleImage}
          />

          <img src={mode === "create" ? this.state.tmpImage : this.state.image} alt="your team image"/>

          <div className="row start">
            <label htmlFor="members"> Add Members</label>
            {this.state.optionsMembers.map((optionMember) => (
              <label htmlFor={`${optionMember.name}`} key={optionMember._id}>
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

          </div>

          <div className="row">
            <label htmlFor="quizzes">
              {" "}
              Add some of your quizzes to your team{" "}
            </label>
            {!this.state.userQuizzes && "no quizz to assign, create some"}
            {this.state.userQuizzes &&
              this.state.userQuizzes.map((optionQuizz) => (
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
          </div>

          <button className="btn">Create Team</button>
        </form>
     
      </React.Fragment>
    );
  }
}

export default withRouter(FormNewTeam);
