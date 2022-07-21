import React from 'react'

const UserDataComp = (props) => {
  return (
    <div>
        <p>ID:{props.id}</p>
        <p>Name:{props.name}</p>
        <p>Email:{props.email}</p>

        {console.log(props)}
    </div>
  )
}

export default UserDataComp