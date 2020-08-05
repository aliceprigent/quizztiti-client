import React from 'react'
import { Link } from "react-router-dom"

function Categories(props) {
    return (
        <Link
            to={`/quizz/${props.theme}`}>
        <div className="row center">
        
          
        <div className="div-img">
            <img alt="img" className="category-img" src={props.image}/></div>{props.theme}
            
        </div>
        </Link>
    )
}

export default Categories
