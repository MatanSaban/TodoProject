import React from "react";

const AddPost = (props) => {
    return (
        <div className="addPostContent">
            <div>
                <h3>Title:</h3>
                <input
                    type="text"
                    name="postname"
                    id="postname"
                    placeholder="New Post Title"
                    onChange={(e) => props.handleNewPost(e)}
                />
            </div>
            <div>
                <h3>Body:</h3>
                <textarea
                    style={{background:'transparent', borderRadius:'15px',padding:'10px'}}
                    rows='10'
                    type="text"
                    name="postbody"
                    id="postbody"
                    placeholder="New Post Body"
                    onChange={(e) => props.handleNewPost(e)}
                />
            </div>
            <div className="buttons">
                <button onClick={props.sendNewPost}>Add New Post</button>
                <button onClick={() => props.setAddPost(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default AddPost;
