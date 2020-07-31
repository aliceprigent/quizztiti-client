import React, { Component } from 'react'
import apiUser from "../api/apiUser";

export class Profile extends Component {
  state= {}; 

  componentDidMount() {
    apiUser
    .getOneUser()
    .then((apiRes) => {
      this.setState(
        {
          name: apiRes.data.name,
          email: apiRes.data.email,
          password: apiRes.data.password,
          image: apiRes.data.image,
        },
      );
    })
    .catch((error) => {
      console.log(error);
    });
}
  render() {
    return (
      <div className="div-profile column center">
      <h2 style={{marginTop:"20px", marginBottom:"20px"}}>Your profile</h2>

      <div style={{marginTop: "20px", width:"20em", borderRadius: "10px", boxShadow: "1px 3px 17px 0px rgba(0,0,0,0.30)", padding: "20px" }} className="flex-start">
     
      <h3>Name : <span style={{fontWeight:"400", fontSize:"17px"}}>{this.state.name}</span></h3>
      <h3>Email : <span style={{fontWeight:"400", fontSize:"17px"}}>{this.state.email}</span></h3>
      <h3>Password : <span style={{fontWeight:"400", fontSize:"17px"}}>********</span></h3>
      <div className="row ">
      <h3 style={{marginTop: "10px", marginRight: "10px"}}>Avatar :</h3> <img src={this.state.image} alt="avatar"/>
      </div>
      <a href="/profile/edit"><button className="btn" style={{marginLeft:"35%", marginTop:"25px"}}>EDIT </button></a>
      </div>
        
      </div>
    )
  }
}

export default Profile
