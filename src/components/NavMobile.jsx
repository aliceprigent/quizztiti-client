import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";

export class NavMobile extends Component {
  static contextType = UserContext;
  state = {
    active: false,
  };

  toggleNavMobile = () => {
    if (this.state.active === false) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  };

  handleLogout = () => {
    apiHandler
      .logout()
      .then(() => {
        this.context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state);
    console.log(this.context.user);
    return (
      <React.Fragment>
        <section onClick={this.toggleNavMobile} className="nav-mobile">
          <div className="menu-burger"></div>
          <div className="menu-burger"></div>
          <div className="menu-burger"></div>
        </section>
        <section className="column">
          <section className="nav-burger">


          {!this.context.isLoggedIn && this.state.active && (
        <ul className="nav-list">
         
            <li className="li-burger">
              <NavLink to="/signin">LOG IN</NavLink>
            </li>
            <li className="li-burger">
              <NavLink to="/signup">CREATE ACCOUNT</NavLink>
            </li>
          
          </ul>
        )}

            {this.context.isLoggedIn && this.state.active && (
              <ul className="column nav-list">
                <li className="li-burger">
                  <NavLink to="/dashboard">{this.context.user.name}</NavLink>
                </li>
                <li className="li-burger">
                  <NavLink to="/dashboard">DASHBOARD</NavLink>
                </li>
                <li className="li-burger">
                  <NavLink to="/">HOME</NavLink>
                </li>
                <li className="li-burger">
                  <p onClick={this.handleLogout}>LOGOUT</p>
                </li>
              </ul>
            )}
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default withUser(NavMobile);
