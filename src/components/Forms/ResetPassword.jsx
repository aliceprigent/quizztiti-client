import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import apiUser from "../../api/apiUser";

export class ResetPassword extends Component {
  state = {
    email: null,
    message: { username: false, email: false, passwordMatch: false },
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
    this.setState({ [key]: value }, () => {
      this.handleConfirm(event);
    });
  };

  handleConfirm = (event) => {
    let message = { ...this.state.message };
    // console.log("in handleConfirm function");
    if (!this.state.name) {
      message.username = false;
    } else {
apiUser.getUsers({name : this.state.name})
.then((res)=> { 
  // console.log('in front',res)
// console.log("nb users : ", res.data.length)
if (res.data.length === 1) {
  message.username = true;
} else {message.username = false}
  
})
.catch((err) => {
// console.log('in front', err);
message.username = false})
      
    }

    if (!this.state.email) {
      message.email = false;
    } else {

      apiUser.getUsers({email : this.state.email, name : this.state.name})
.then((res)=> { 
  // console.log('in front',res)
// console.log("nb users : ", res.data.length)
if (res.data.length === 1) {
  message.username = true;
} else {message.username = false}
  
})
.catch((err) => {console.log('in front', err);
message.username = false})

      message.email = true;
    }

    if (this.state.passwordConfirm === this.state.password) {
      message.passwordMatch = true;
      // console.log("in password matching zone __ TRUE");
    } else {
      // console.log(
      //   "password :",
      //   this.state.password,
      //   "confirm password :",
      //   this.state.passwordConfirm
      // );
      message.passwordMatch = false;
      // console.log("in password matching zone __ FALSE");
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
