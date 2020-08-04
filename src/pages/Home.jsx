import React, { Component } from "react";
import Carousel from "../components/Home/Carousel";
import quizzHandler from "../api/quizzHandler";
import CarouselMobile from "../components/Home/CarouselMobile";
import Categories from "../components/Home/Categories";

export class Home extends Component {
  state = {
    categories: [
      {
        theme: "Nature",
        image: "",
      },
      {
        theme: "General",
        image: "",
      },
      {
        theme: "Health and Beauty",
        image: "",
      },
      {
        theme: "Celebrity",
        image: "",
      },
      {
        theme: "Society",
        image: "",
      },
      {
        theme: "Miscellanous",
        image: "",
      },
    ],
  };
  render() {
    return (
      <div className="column center">
        <div className="column center" style={{ width: "80%" }}>
          <section className="row center" style={{ width: "100%" }}>
            <div
              className="row welcome-div"
              style={{
                height: "50px",
                backgroundColor: "var(--grey)",
              }}
            >
              Discover all our quizzes and categories !{" "}
              <button className="btn" style={{ width: "170px" }}>
                See all quizz !
              </button>
            </div>
          </section>

          <div>
            <h3 className="title">All quizz</h3>
            <br />

            <Carousel />
          </div>
          <br />
          <button className="btn">See more</button>

          {/*  <CarouselMobile /> */}

          <div>
            <h3 className="title">Les catégories</h3>
            <br />

            <Categories />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
