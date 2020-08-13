import React, { Component } from "react";

import quizzHandler from "../api/quizzHandler.js";
import QuizzSticker from "../components/Quizz/QuizzSticker.jsx";
import { Link } from "react-router-dom";
import SearchBar from "../components/Quizz/SearchBar";
import { withUser } from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";
import StickerDashboard from "../components/Dasboard/StickerDashboard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class AllQuizz extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    // this.handleClick=this.fileInput.bind(this)
  }

  state = {
    quizz: [],

    filteredQuizz: [],
  };

  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then((data) => {
        console.log(this.props);
        this.setState({ quizz: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleFilter = () => {};

  handleSearch = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    if (this.state.quizz === null) return <div>Loading...</div>;

    const filteredArray = this.state.quizz.filter((quiz) => {
      if (this.state.searchValue) {
        return (
          quiz.isPublished === true &&
          quiz.status === "Public" &&
          (quiz.title.toLowerCase().includes(this.state.searchValue) ||
            quiz.thema.toLowerCase().includes(this.state.searchValue))
        );
      } else {
        return quiz.isPublished === true && quiz.status === "Public";
      }
    });
    console.log(filteredArray);

    return (
      <React.Fragment>
        <div className="search-container">
          <SearchBar search={this.handleSearch} />
        </div>
        <div className="all-quizz row center global-view">
          {this.props.context.user &&
            !this.props.context.user.isAdmin &&
            filteredArray.map((quiz) => {
              return (
                <Link to={`/quizz/${quiz._id}`}>
                  <QuizzSticker key={quiz._id} quiz={quiz} />
                </Link>
              );
            })}
          {this.props.context.user && this.props.context.user.isAdmin && (
            <div className="app-quizz">
              <h2>Public Quizzes</h2>
              <div className="all-quizz row center global-view">
                {this.state.quizz
                  .filter((quiz) => quiz.status === "Public")
                  .map((quiz) => {
                    return (
                      <div className="admin-mode column flex-start ">
                        <StickerDashboard key={quiz._id} quizz={quiz} />
                        <div
                          className="admin-btn row center"
                          
                        >
                          <Link to={`/quizz/${quiz._id}`}>
                            <FontAwesomeIcon
                              icon="play"
                              size="1x"
                              className="icon"
                              color="darkgrey"
                            />
                          </Link>

                          <Link
                            to={{
                              pathname: "/quizz/edit/yourQuizz",
                              quizzProps: { quiz },
                              state: quiz._id,
                            }}
                          >
                            <FontAwesomeIcon
                              icon="edit"
                              size="1x"
                              className="icon"
                              color="darkgrey"
                            />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <h2>Private Quizzes</h2>
              <div className="all-quizz row center global-view">
                {this.state.quizz
                  .filter((quiz) => quiz.status === "Private")
                  .map((quiz) => {
                    return (
                      <div className="admin-mode column flex-start ">
                        <StickerDashboard key={quiz._id} quizz={quiz} />
                        <div
                          className="admin-btn row center"
                          
                        >
                          <Link to={`/quizz/${quiz._id}`}>
                            <FontAwesomeIcon
                              icon="play"
                              size="1x"
                              className="icon"
                              color="darkgrey"
                            />
                          </Link>

                          <Link
                            to={{
                              pathname: "/quizz/edit/yourQuizz",
                              quizzProps: { quiz },
                              state: quiz._id,
                            }}
                          >
                            <FontAwesomeIcon
                              icon="edit"
                              size="1x"
                              className="icon"
                              color="darkgrey"
                            />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default withUser(AllQuizz);
