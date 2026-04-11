import React from 'react'

const Task4 = ({name,age,location}) => {
  return (
    <div>
      <p><b>{name}</b></p>
      <p><b>Age:</b> {age}</p>
      <p><b>Location:</b> {location}</p>
    </div>
  )
}

export default Task4