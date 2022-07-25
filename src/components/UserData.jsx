import React from "react";
import UserPosts from "./UserPosts";
import UserTodos from "./UserTodos";

const UserData = (props) => {

    // const newChild = props.children[props.index];

    return (
        <div className="userData">
            <div className="userTodos">
                <UserTodos index={props.index} id={props.id} checkTodosStatus={props.checkTodosStatus} getNewTodo={props.getNewTodo}>{props.todos}</UserTodos>
            </div>
            <div className="userPosts">
                <UserPosts index={props.index} id={props.id} getNewPost={props.getNewPost} >{props.posts}</UserPosts>
            </div>
        </div>
    );
};

export default UserData;
