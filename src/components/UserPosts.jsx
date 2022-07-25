import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import SinglePost from "./SinglePost";

const UserPosts = (props) => {

    const [addPost, setAddPost] = useState(false);
    const [newPost, setNewPost] = useState({
        body: "",
        title: "",
        id: 0,
        userId: 0,
    });

    useEffect(() => {}, [addPost]);

    const handleNewPost = (e) => {
        const { name, value } = e.target;

        if (name === "postname") {
            setNewPost({
                ...newPost,
                title: value,
                id: props.id,
                userId: props.id,
            });
        } else if (name === "postbody") {
            setNewPost({
                ...newPost,
                body: value,
                id: props.id,
                userId: props.id,
            });
        }
    };

    const sendNewPost = () => {
        props.getNewPost(newPost);
        setAddPost(false);
    };

    return (
        <div className="theUserPostsWrapper">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h3>Posts - User {props.id}</h3>
                <button onClick={() => setAddPost(!addPost)}>New Post</button>
            </div>
            {!addPost ? (
                props.children.map((post, index) => {
                    if (post.userId === props.id) {
                        return (
                            <SinglePost
                                key={index}
                                title={post.title}
                                body={post.body}
                            />
                        );
                    } else {
                        return null;
                    }
                })
            ) : (
                <AddPost
                    handleNewPost={handleNewPost}
                    sendNewPost={sendNewPost}
                    setAddPost={setAddPost}
                />
            )}
        </div>
    );
};

export default UserPosts;
