import React, { useState } from "react";

const SingleTodo = (props) => {

    const [completed, setCompleted] = useState(props.completed)


    const markCompleted = () => {
        setCompleted(!completed)
        props.checkTodosStatus(!completed, props.realIndex)
    }


    return (
        <div className={completed ? 'todoBox completedTodosUser' : 'todoBox notCompletedTodosUser'}>
            Title: {props.title} <br /> <br />
            Completed: {completed.toString()} <button onClick={markCompleted}>{completed ? 'Mark As Incomplete' : 'Mark As Completed'}</button>
        </div>
    );
};

export default SingleTodo;
