import React from "react";

const AddTodo = (props) => {
    return (
        <div>
            Title:{" "}
            <input
                type="text"
                name="todoname"
                id="todoname"
                placeholder="New Todo Name"
                onChange={(e) => props.handleNewTodo(e.target.value)}
            />
            <br />
            <br />
            <button onClick={props.sendNewTodo}>Add New Todo</button>
            <button onClick={() => props.setAddTodo(false)}>Cancel</button>
        </div>
    );
};

export default AddTodo;
