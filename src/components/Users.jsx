import React, { useState } from "react";
import UserDataComp from "./UserDataComp";
import { v4 as uuidv4 } from "uuid";
import UserData from "./UserData";

const Users = (props) => {
    const [showUserTodosAndPosts, setShowUserTodosAndPosts] = useState(false);
    const [whichUser, setWhichUser] = useState(-1);
    const [whichUserID, setWhichUserID] = useState(0);

    const [isClicked, setIsClicked] = useState({0: false})

    const handleShowUserTodosAndPosts = (index,id) => {
        if (index === whichUser && showUserTodosAndPosts) {
            setShowUserTodosAndPosts(false);
            setIsClicked(false)
        } else if (index === whichUser && !showUserTodosAndPosts) {
            setShowUserTodosAndPosts(true);
            setIsClicked(true)
        } else if (index !== whichUser && !showUserTodosAndPosts) {
            setShowUserTodosAndPosts(true);
            setIsClicked(true)
            setWhichUser(index);
            setWhichUserID(id);
        } else if (index !== whichUser && showUserTodosAndPosts) {
            setWhichUser(index);
            setWhichUserID(id);
        }
    };

    const getPosts = (id) => {
        const postsArray = [];
        props.posts.map(post => {
            if (id === post.userId) {
                return postsArray.push(post);
            }
        });
        ;
    };

    const getTodos = (id) => {
        const todosArray = [];
        props.todos.map((todo) => {
            if (id === todo.userId) {
                return todosArray.push(todo);
            }
        });
        return todosArray;
    };

    return (
        <div style={{ display: "flex", justifyContent:'center' }}>
            <div className="usersList">
                {props.usersList.length > 0 ? (
                    props.usersList
                        .filter(
                            (user) =>
                                user.name.startsWith(props.textSearch) ||
                                user.name.includes(props.textSearch) ||
                                user.email.startsWith(props.textSearch) ||
                                user.email.includes(props.textSearch)
                        )
                        .map((user, index) => {
                            return (
                                <UserDataComp
                                    key={uuidv4()}
                                    index={index}
                                    user={user}
                                    id={user.id}
                                    posts={getPosts(user.id)}
                                    todos={getTodos(user.id)}
                                    handleUserChanges={props.handleUserChanges}
                                    handleUserDelete={props.handleUserDelete}
                                    handleShowUserTodosAndPosts={
                                        handleShowUserTodosAndPosts
                                    }
                                    isClicked={isClicked}
                                    whichUserID={whichUserID}
                                />
                            );
                        })
                ) : (
                    <h4 style={{ textAlign: "center" }}>
                        No Users In The List
                    </h4>
                )}
            </div>
            {showUserTodosAndPosts && (
                <UserData index={whichUser} id={whichUserID} posts={props.posts} todos={props.todos} checkTodosStatus={props.checkTodosStatus} getNewTodo={props.getNewTodo} getNewPost={props.getNewPost} />
            )}
        </div>
    );
};

export default Users;
