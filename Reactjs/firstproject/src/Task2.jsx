import React from 'react'

const Task2 = () => {
    const topic = "JSX";
    const description = "JSX allows us to write HTML inside JavaScript.";
  return (
    <div>
        <h3>Welcome to JSX</h3>
      <p>
        {topic} is a syntax extension for React. {description}
      </p>
    </div>
  )
}

export default Task2