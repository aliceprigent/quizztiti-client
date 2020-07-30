import React from 'react'

const QuizzCard = (props) => {
    console.log(props)
    return (
        <div>
            {props.quizz.title}
        </div>
    )
}

export default QuizzCard
