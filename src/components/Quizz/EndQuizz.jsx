import React, { Component } from 'react'
import { Link } from "react-router-dom";


export class EndQuizz extends Component {
    render() {
        return (
           <div className="center column" style={{width:"100%"}}>
             <section className="banner-question column center" style={{backgroundImage:`url(${this.props.quizz.image})`, width:"60%", height:"200px", backgroundPosition:"center", marginTop:"20px"}}>
        </section>
        <div className="column center">
            <div className="column endquizz">
            <h3 style={{fontSize:"40px"}}>SCORE</h3>
            <div className="score-quizz">
            <p style={{ marginTop: "1em", marginLeft: "1.3em", fontSize:"30px"}}>{this.props.score}</p>
            <img alt="win" src="https://img.icons8.com/fluent/96/000000/trophy.png"/>
            </div>
                
            </div>
            
            <a href="/dashboard"><button style={{width: "150px"}}className="btn">See dashboard</button></a>
            </div>
            </div>
        )
    }
}

export default EndQuizz
