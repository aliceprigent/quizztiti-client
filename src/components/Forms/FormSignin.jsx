import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import { withRouter, Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import ResetPassword from "./ResetPassword";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    reset : false,
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
var userCredentials = {email : this.state.email, password : this.state.password};
    apiHandler
      .signin(userCredentials)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        // console.log("error message in front", error.response.data);
        // this.setState({message : "Invalid email or password"})
        this.setState({message : error.response.data.message})
        // Display error message here, if you set the state
      });
  };

toggleReset = (event) => {
  this.setState({reset : !this.state.reset})
}

handleReset = (password) => {
console.log("new password :", password)
};



  render() {

    if (this.state.reset) return <ResetPassword reset={this.handleReset}  email={this.state.email} />

    return (
      <div className="signup-div center column">
      <h2>Welcome back !</h2>

{
  this.state.message && <div className="red"> {this.state.message} </div>
}

      <form className="center column" style={{marginTop:"30px"}} onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label className="sign-label" htmlFor="email">Email</label>
        <input className="sign-input" type="email" id="email" name="email" />
        <label className="sign-label" htmlFor="password">Password</label>
        <input className="sign-input"type="password" id="password" name="password" />
        <Link onClick={this.toggleReset}> reset my password </Link>
        <button className="btn" style={{marginTop:"30px"}}>Submit</button>
      </form>
      


      </div>
    );
  }
}

export default withRouter(FormSignin);
