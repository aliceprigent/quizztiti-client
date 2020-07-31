import apiUser from "../../api/apiUser";
import React, { Component } from "react";
import QuizzSticker from "../Quizz/QuizzSticker";

export class UserQuizz extends Component {
  state = {};
  componentDidMount() {
    apiUser
      .getOneUser()
      .then((apiRes) => {
        this.setState({
          name: apiRes.data.name,
          email: apiRes.data.email,
          password: apiRes.data.password,
          image: apiRes.data.image,
          quizzCreated: apiRes.data.quizzCreated,
          quizzDone: apiRes.data.quizzDone,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
    return (
      <React.Fragment>
        <h2>MY QUIZZ</h2>
        <a href="/quizz/new">
          <button style={{ marginTop: "10px", width: "10em" }} className="btn">
            CREATE QUIZZ
          </button>
        </a>
        {this.state.quizzCreated && this.state.quizzCreated.map((quizz) => {
          return <QuizzSticker key={quizz._id} quizz={quizz} />;
        })}
      </React.Fragment>
    );
  }
}

export default UserQuizz;
