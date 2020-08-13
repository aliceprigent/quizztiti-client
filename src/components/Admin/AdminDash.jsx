import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import { withUser } from "../Auth/withUser";
import StickerDashboard from "../Dasboard/StickerDashboard";

import quizzHandler from "../../api/quizzHandler";

export class AdminDash extends Component {
  static contextType = UserContext;
  state = {
    quizzToValidate: [],
  };

  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then((allQuizz) => {
        console.log(allQuizz);
        this.setState({ quizzToValidate: allQuizz });
      },()=>console.log(this.state.quizzToValidate))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
      var quizzList=this.state.quizzToValidate
      .filter((OneQuizz) => {return(
        OneQuizz.isPublished ===false);
      })
    return (
      <div className="center column">
        <section className="column center section-dashboard">
          <div className="row center dashboard-row wrap">
          <div className="dashboard-box shadow-box row">
          {quizzList.length===0 &&(
              <p style={{color:"black",fontSize:'25px'}}>No quizz to validate</p>
          )

          }
            {quizzList.length>0 &&(
              quizzList
                .map((quizz) => {
                  return (
                    <Link
                      to={{
                        pathname: "/quizz/edit/yourQuizz",
                        quizzProps: { quizz },
                        state: quizz._id,
                      }}
                    >
                      <StickerDashboard key={quizz._id} quizz={quizz} />
                    </Link>
                  );
                })
            )}
            </div>
          </div>
        </section>
        <div>
          <Link to="/quizz">See All Quizzes</Link>
        </div>
        <div className="members-administration">
          
        </div>
      </div>
    );
  }
}

export default withUser(AdminDash);
