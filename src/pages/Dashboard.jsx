import React, { Component } from "react";
import UserProfile from '../components/Dasboard/UserProfile'
import UserQuizz from '../components/Dasboard/UserQuizz'
import UserTeam from '../components/Dasboard/UserTeam'
import apiUser from '../api/apiUser'

export class Dashboard extends Component {
    state= {};

    componentDidMount(){
        apiUser
        .getOneUser()
        .then((apiRes) => {
          this.setState(
            {
              name: apiRes.data.name,
              email: apiRes.data.email,
              password: apiRes.data.password,
              image: apiRes.data.image,
              quizzCreated: apiRes.data.quizzDone,
              quizzDone: apiRes.data.quizzDone
            },
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

  render() {
    return (

        <div className="center column">

      <section className="column center section-dashboard">
        <div className="row center dashboard-row">
        <div className="shadow-box dashboard-box">
          <UserProfile user={this.state}/>
          </div>
          <div className="shadow-box dashboard-box">
          <UserQuizz user={this.state}/>
          </div>
        </div>
        <div className="row center dashboard-row">
        <div className="shadow-box dashboard-box">
          <UserTeam user={this.state}/>
          </div>
          <div className="shadow-box dashboard-box">
          <UserTeam user={this.state}/>
          </div>
        </div>
      </section>
      </div>
      
    );
  }
}

export default Dashboard;