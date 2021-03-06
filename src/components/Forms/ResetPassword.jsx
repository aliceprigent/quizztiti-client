import React, { Component } from "react";
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
.catch((err) => {console.log('ERR in front', err);
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


handleReset = (event) => {
  event.preventDefault();
  const data = {email : this.state.email, password : this.state.password};
  const name = this.state.name;
// console.log('params before sending in back,', data)
  apiUser.resetPassword(name, data)
  .then((res) => {
    // console.log('yay back in front with updated password, ', res.data)
this.props.reset(data.email, data.password)
})
  .catch((err) => console.log('error in front', err))
}


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
            <div className="warning"> this user doesn't exist </div>
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
            <div className="warning"> wrong email </div>
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
            <div className="warning"> passwords don't match </div>
          )}
          <button
            className="btn"
            style={{ marginTop: "30px" }}
            // onSubmit={this.props.reset}
            onClick={this.handleReset}
          >
            Reset
          </button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
