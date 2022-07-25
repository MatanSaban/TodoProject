import React from 'react'

const SinglePost = (props) => {
  return (
    <div className='postBox' style={{border:'1px solid black'}}>
        <h3>Title:</h3> {props.title} <br /> <br />
        <h4>Body:</h4> {props.body}
    </div>
  )
}

export default SinglePost