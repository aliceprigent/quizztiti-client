import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    name: "",
    email: "",
    password: "",
    image: "",
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "radio"
        ? event.target.value
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value }, () => console.log(this.state));
  };
  

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (

      <div className="signup-div center column">

      <h2>Join us !</h2>
      <br/>

      <form className="column center" onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label className="sign-label" htmlFor="name">User Name</label>
        <input className="sign-input" type="text" id="name" name="name" />
        <label className="sign-label" htmlFor="email">Email</label>
        <input className="sign-input" type="email" id="email" name="email" />
        <label className="sign-label" htmlFor="password">Password</label>
        <input className="sign-input" type="password" id="password" name="password" />

        <p className="sign-label" style={{marginTop:"30px"}}> Choose your avatar :</p>

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
