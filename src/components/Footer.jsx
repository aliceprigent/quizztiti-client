import React from 'react'

function Footer() {
    return (
        <div className="center row">
        <section className="footer row">
        <div className="column">
            <h4>Quizztiti</h4>
            <p>About</p>
            <p>Join us</p>
        </div>
        <div>
        <h4> Catégories</h4>
        <section className="row">
        <div className="column">
            <p>Health</p>
            <p>Celebrities</p>
            <p>Miscellaneous</p>
            </div>
            <div style={{marginLeft: "50px"}} className="column">
            <p>Nature</p>
            <p>General</p>
            <p>Beauty</p>
            </div>
            </section>
        </div>
        <div></div>

        </section>

            
        </div>
    )
}

export default Footer
