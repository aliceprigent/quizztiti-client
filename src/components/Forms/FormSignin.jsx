import React, { Component } from "react";

import UserContext from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
// console.log('login in frontend', this.state)
    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    return (
      <div className="signup-div center column">
      <h2>Welcome back !</h2>
      <form className="center column" style={{marginTop:"30px"}} onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label className="sign-label" htmlFor="email">Email</label>
        <input className="sign-input" type="email" id="email" name="email" />
        <label className="sign-label" htmlFor="password">Password</label>
        <input className="sign-input"type="password" id="password" name="password" />
        <button className="btn" style={{marginTop:"30px"}}>Submit</button>
      </form>
      </div>
    );
  }
}

export default withRouter(FormSignin);
