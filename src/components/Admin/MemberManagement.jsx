import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import { withUser } from "../Auth/withUser";
import apiUser from "../../api/apiUser";
import StickerTeam from "../Dasboard/StickerTeam";
import StickerDashboard from "../Dasboard/StickerDashboard";

export class MemberManagement extends Component {
  state = {};
  handleChange = (event) => {
    this.setState({ isAdmin: !this.state.isAdmin }, () => {
      console.log("check verif", this.state);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiUser
      .updateOneUser(this.props.location.state, this.state)
      .then((data) => {
        console.log(data);
        this.setState(
          {
            isAdmin: data.data.isAdmin,
          },
          this.props.history.push("/admin")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (event) => {
    apiUser
      .deleteUser({_id:this.props.location.state})
      .then((response) => {
        this.props.history.push("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const managedMemberId = this.props.location.state;
    console.log(managedMemberId);
    apiUser
      .manageUser({ _id: managedMemberId })
      .then((user) => {
        console.log(user);
        var memberSearched = user;
        var userteams = [...memberSearched.teams];
        this.setState({
          name: memberSearched.name,
          email: memberSearched.email,
          image: memberSearched.image,
          teams: memberSearched.teams,
          quizzCreated: memberSearched.quizzCreated,
          isAdmin: memberSearched.isAdmin,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="signup-div center column">
        <h2>{this.state.name}'s Profile</h2>
        <br />
        <h3>
          Email :{" "}
          <span style={{ fontWeight: "400", fontSize: "17px" }}>
            {this.state.email}
          </span>
        </h3>
        <h3 style={{ marginTop: "10px", marginRight: "10px" }}>Avatar :</h3>{" "}
        <img src={this.state.image} alt="avatar" />
        {this.state.teams && this.state.teams.length > 0 && (
          <div>
            <h3 style={{ marginTop: "10px", marginRight: "10px" }}>Teams :</h3>
            <div className="row wrap" style={{ width: "100%" }}>
              {this.state.teams.map((team) => {
                return <StickerTeam key={team._id} team={team} />;
              })}
            </div>
          </div>
        )}
        {this.state.quizzCreated && this.state.quizzCreated.length > 0 && (
          <div>
            <h3 style={{ marginTop: "10px", marginRight: "10px" }}>
              Quizzes Created :
            </h3>
            <div className="row wrap" style={{ width: "100%" }}>
              {this.state.quizzCreated.map((quizz) => {
                return <StickerDashboard key={quizz._id} quizz={quizz} />;
              })}
            </div>
          </div>
        )}
        <form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          className="column center"
        >
          <h3 style={{ marginTop: "10px", marginRight: "10px" }}>
            Give Admin Rights :
          </h3>
          <label htmlFor="isAdmin">
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              checked={this.state.isAdmin}
            />
          </label>
          <button className="btn">SUBMIT</button>
        </form>
        <button className="btn" onClick={this.handleDelete}>
          DELETE
        </button>
      </div>
    );
  }
}

export default withUser(MemberManagement);
