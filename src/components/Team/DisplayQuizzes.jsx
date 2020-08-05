import React from 'react'

const DisplayQuizzes = (props) => {

    console.log(props)
    if (!props.quizzes) {
        return (
          <div>
            {" "}
            <h3>Quizzes </h3>Loading...
          </div>
        );
      }
      if (props.quizzes===[]) {
        return (
          <div>
            {" "}
            <h3>Quizzes </h3> Add your quizzes
          </div>
        );
      }
      return (
          <React.Fragment>
        <div id="team_quizzes" >
          <div className="row space_between margin_bottom">
          <div>
          <h3>Current quizzes ({props.quizzes.length})</h3>
          </div>
          <div className="column">
          </div>
    </div>
          <ul>
            {props.quizzes && props.quizzes.map((quizz) => (
                <div className="row" key={quizz._id}>
                <button className="btn delete" onClick={()=>props.updateQuizzes(quizz._id)}> x</button> 
                [{quizz.thema}] -  {quizz.title}  
              </div>
            ))}
          </ul>
        </div>
        </React.Fragment>
      );
    };
export default DisplayQuizzes
