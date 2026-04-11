import React, { useState } from 'react'

const TaskFour = () => {
    const[count , setcount]=useState(0)
  return (
    <div>
        <h3>Count: {count}</h3>
        <button onClick={()=>setcount(count+1)}>
            Increment
        </button>
    </div>
  )
}

export default TaskFour