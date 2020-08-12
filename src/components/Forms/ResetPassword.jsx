import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

export class ResetPassword extends Component {
  state = {
    email: null,
    message: { username: null, email: null, passwordMatch: null },
  };

  componentDidMount() {
    if (this.props.email) {
      let message = { ...this.state.message };
      message.email = true;
      this.setState({ email: this.props.email, message: message });
    }
  }

  handleChange = (event) => {
    const key = event.target.name;
    let value = event.target.value;
    this.setState({ [key]: value }, this.handleConfirm(event), () =>
      console.log(this.state)
    );
  };

  handleConfirm = (event) => {
    let id = event.target.id;
    let message = { ...this.state.message };
    // console.log("in confirm function", id);
    if (id === "username") {
      if (!this.state.name) {
        message.username = false;
      } else message.username = true;
    } else if (id === "email") {
      if (!this.state.email) {
        message.email = false;
      } else message.email = true;
    } else if (id === "passwordConfirm") {
      // console.log("in password matching zone")
      if (this.state.passwordConfirm == this.state.password) {
        message.passwordMatch = true;
        console.log("in password matching zone __ TRUE");
      } else {
        console.log(
          "password :",
          this.state.password,
          "confirm password :",
          this.state.passwordConfirm
        );
        message.passwordMatch = false;
        console.log("in password matching zone __ FALSE");

        // doesn't work - maybe try in an independant function for passwordConfirm
      }
    }
    this.setState({ message });
  };

  render() {
    return (
      <div>
        <form
          className="center column"
          style={{ marginTop: "30px" }}
          onChange={this.handleChange}
        >
          <label className="sign-label" htmlFor="username">
            Username
          </label>
          <input className="sign-input" type="text" id="username" name="name" />
          {!this.state.message.username && (
            <div className="red"> this user doesn't exist </div>
          )}
          <label className="sign-label" htmlFor="email">
            Email
          </label>
          <input
            className="sign-input"
            type="email"
            id="email"
            name="email"
            defaultValue={this.props.email}
          />
          {!this.state.message.email && (
            <div className="red"> this is not this users's email </div>
          )}
          <label className="sign-label" htmlFor="password">
            {" "}
            New Password
          </label>
          <input
            className="sign-input"
            type="password"
            id="password"
            name="password"
          />
          <label className="sign-label" htmlFor="passwordConfirm">
            {" "}
            Confirm new password
          </label>
          <input
            className="sign-input"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
          />
          {!this.state.message.passwordMatch && (
            <div className="red"> the passwords don't match </div>
          )}
          <button
            className="btn"
            style={{ marginTop: "30px" }}
            onSubmit={this.props.reset}
          >
            Reset
          </button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
