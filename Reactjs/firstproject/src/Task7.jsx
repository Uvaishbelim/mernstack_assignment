import React from 'react'

const Task7 = () => {
    const fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
  return (
    <div>
      <h3>Fruit List</h3>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  )
}

export default Task7