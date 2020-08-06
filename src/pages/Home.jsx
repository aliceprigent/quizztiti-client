import React, { Component } from "react";
import Carousel from "../components/Home/Carousel";
import quizzHandler from "../api/quizzHandler";
import CarouselMobile from "../components/Home/CarouselMobile";
import Categories from "../components/Home/Categories";
import Footer from "../components/Footer"

export class Home extends Component {
  state = {
    categories: [
      {
        theme: "Nature",
        image: "https://img.icons8.com/color/48/000000/sakura.png",
      },
      {
        theme: "General",
        image: "https://img.icons8.com/color/48/000000/dali.png",
      },
      {
        theme: "Health",
        image: "https://img.icons8.com/color/48/000000/the-birth-of-venus.png",
      },
      {
        theme: "Celebrity",
        image: "https://img.icons8.com/color/48/000000/tango.png",
      },
      {
        theme: "Society",
        image: "https://img.icons8.com/color/48/000000/us-capitol.png",
      },
      {
        theme: "Miscellaneous",
        image: "https://img.icons8.com/color/48/000000/illuminati-symbol.png",
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
             <img className="logo-quizztiti" src="../../media/imageonline-co-transparentimage.png" alt="logo"/>
              Discover all our quizzes and categories !{" "}
              <a href="/quizz"><button className="btn" style={{ width: "170px" }}>
                Discover !
              </button></a>
            </div>
          </section>
          <div style={{width:"92%"}}>
          <h3 className="title">All quizz</h3>
          </div>

          <div>
            
            <br />

            <Carousel />
          </div>
          <br />
          <a href="/quizz"><button className="btn" style={{marginBottom:"40px"}}>See more</button></a>

       

          <div style={{width:"92%"}}>
            <h3 className="title">Categories</h3>
            <br />

           <section className="row category-wrap">
            {this.state.categories.map((category) => 
              <div className="category-div row flex-start"><Categories theme={category.theme} image={category.image} /></div>
            )}
            </section>

            <div style={{width:"95%", marginTop:"50px"}}>
          <h3 className="title">Community quizz</h3>
          </div>

          <div>
            
            <br />

             <CarouselMobile /> 
          </div>
            
          </div>
        </div>
        <div style={{width:"90%"}}>
        <Footer/>
        </div>
      </div>
    );
  }
}

export default Home;
