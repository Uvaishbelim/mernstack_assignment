import React, { useState } from 'react'

const Task5 = () => {
    const[text, setText] = useState("Not Clicked")
    const handleClick = () => {
        setText("Clicked!");
      };
    
  return (
    <div>
        <p>{text}</p>
        <button onClick={handleClick}>Click Me</button>
    </div>
  )
}

export default Task5