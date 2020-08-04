import React from 'react'

function Categories(props) {
    return (
        <div className="row center">
        <div className="div-img">
            <img alt="img" className="category-img" src={props.image}/></div>{props.theme}
        </div>
    )
}

export default Categories
