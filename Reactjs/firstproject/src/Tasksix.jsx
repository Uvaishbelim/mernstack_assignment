import React from 'react'

const Tasksix = ({age}) => {
  return (
    <div>
         {age >= 18
        ? <p>You are eligible to vote</p>
        : <p>You are not eligible to vote</p>}
    </div>
  )
}

export default Tasksix