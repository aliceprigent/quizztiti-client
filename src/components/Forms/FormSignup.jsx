import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import apiUser from "../../api/apiUser";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    email: "",
    password: "",
    image: "",
    validUsername : true,
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "radio"
        ? event.target.value
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value }, ()=> this.handleUsername(event));
  };

  componentDidMount() {
    // this.firstInputRef.current.focus();
    // console.log(this.firstInputRef);

    const mode = this.props.match.params.mode;
    const userId = this.props.match.params.id;

    // if (mode === "edit" && !plantId) {
    //   this.props.history.push("/");
    //   return;
    // }

    if (mode === "profile/edit") {
      apiUser
        .getOneUser()
        .then((apiRes) => {
          this.setState(
            {
              name: apiRes.data.name,
              email: apiRes.data.email,
              password: apiRes.data.password,
              image: apiRes.data.image,
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

handleUsername = (event) => {
  if (this.state.name) {
    apiUser.checkUsername({name : this.state.name})
    .then((res) => {
      console.log("checking unique username :", res)
    if (res > 0) this.setState({validUsername : false})
  else this.setState({validUsername : true})})
    .catch((err)=> console.error(err))
  }
}


  handleSubmit = (event) => {
    const mode = this.props.match.params.mode;
    event.preventDefault();

    if (mode === "signup") {
if (this.state.validUsername) {
      let newUser = {...this.state}
      delete newUser.validUsername

      apiHandler
        .signup(newUser)
        .then((data) => {
          this.context.setUser(data);
          this.props.history.push("/");
        })
        .catch((error) => {
          console.log(error);
        }); }

    } else {
      apiUser
        .updateUser(this.state)
        .then((data) => {
          console.log(data)
          const updatedUser = {...this.context.user, name:data.data.name, email:data.data.email, image:data.data.image};
          this.context.setUser(updatedUser);
          this.props.history.push("/dashboard");
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const mode = this.props.match.params.mode;
    return (
      <div className="signup-div center column">
        <h2>{mode === "profile/edit" ? "Edit Profile" : "Join us !"}</h2>
        <br />

        <form
          className="column center"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <label className="sign-label" htmlFor="name">
            User Name
          </label>
          <input
            className="sign-input"
            type="text"
            id="name"
            name="name"
            defaultValue={mode === "profile/edit" ? this.state.name : "Name"}
          />
          {!this.state.validUsername && mode === "signup" && (
            <div className="red"> unavailable username</div>
          )}
          <label className="sign-label" htmlFor="email">
            Email
          </label>
          <input className="sign-input" type="email" id="email" name="email"  defaultValue={mode === "profile/edit" ? this.state.email : "example@email.com"}/>
          <label className="sign-label" htmlFor="password">
            Password
          </label>
          <input
            className="sign-input"
            type="password"
            id="password"
            name="password"
            defaultValue={mode === "profile/edit" ? this.state.password : "Password"}
          />

          <p className="sign-label" style={{ marginTop: "30px" }}>
            {" "}
            Choose your avatar :
          </p>

          <div className="center column avatar-div">
            <div className="row center">
              <div>
                <label htmlFor="obama" class="obama">
                  <input
                    type="radio"
                    id="obama"
                    name="image"
                    value="https://img.icons8.com/color/48/000000/barack-obama.png"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/barack-obama.png"
                    alt="obama"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="frida" class="frida">
                  <input
                    type="radio"
                    id="frida"
                    name="image"
                    value="https://img.icons8.com/color/48/000000/frida-kahlo.png"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/frida-kahlo.png"
                    alt="frida"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="einstein" class="einstein">
                  <input
                    type="radio"
                    id="einstein"
                    name="image"
                    value="https://img.icons8.com/color/48/000000/einstein.png"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/einstein.png"
                    alt="einstein"
                  />
                </label>
              </div>
            </div>

            <div className="row center">
              <div>
                <label htmlFor="beyonce" class="beyonce">
                  <input
                    type="radio"
                    id="beyonce"
                    name="image"
                    value="https://img.icons8.com/color/48/000000/beyonce.png"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/beyonce.png"
                    alt="beyonce"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="hermione" class="hermione">
                  <input
                    type="radio"
                    id="hermione"
                    name="image"
                    value="https://img.icons8.com/color/48/000000/hermione-granger-doll.png"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/hermione-granger-doll.png"
                    alt="hermione"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="karl" class="karl">
                  <input
                    type="radio"
                    id="karl"
                    name="image"
                    value="https://img.icons8.com/color/48/000000/karl-lagerfeld.png"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/karl-lagerfeld.png"
                    alt="karl"
                  />
                </label>
              </div>
            </div>
          </div>

          <button className="btn">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FormSignup);
