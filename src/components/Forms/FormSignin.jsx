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
    message : "",
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
        let messages = { ...this.state.message}
        messages.credentials = error.response.data.message;
        this.setState({message : messages})
        // Display error message here, if you set the state
      });
  };

toggleReset = (event) => {
  this.setState({reset : !this.state.reset})
}

handleReset = (email, password) => {
// console.log("new password :", password)
let messages = {... this.state.message}
messages.reset = "Password is now reset, you can log in!"
this.setState({reset : !this.state.reset, email: email, password : password, message : messages})
};



  render() {

    if (this.state.reset) return <ResetPassword reset={this.handleReset}  email={this.state.email} />

    return (
      <div className="signup-div center column">
      <h2>Welcome back !</h2>

{
  this.state.message.credentials && <div className="red"> {this.state.message.credentials} </div>
}
{
  this.state.message.reset && <div className="green"> {this.state.message.reset} </div>
}
      <form className="center column" style={{marginTop:"30px"}} onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label className="sign-label" htmlFor="email">Email</label>
        <input className="sign-input" type="email" id="email" name="email" defaultValue={this.state.email? this.state.email : ""}/>
        <label className="sign-label" htmlFor="password">Password</label>
        <input className="sign-input"type="password" id="password" name="password" defaultValue={this.state.password? this.state.password : ""}/>
        <Link onClick={this.toggleReset}> reset my password </Link>
        <button className="btn" style={{marginTop:"30px"}}>Submit</button>
      </form>
      


      </div>
    );
  }
}

export default withRouter(FormSignin);
