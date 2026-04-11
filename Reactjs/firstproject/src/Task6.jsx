import React, { useState } from 'react'

const Task6 = () => {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
  return (
    <div>
        {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  )
}

export default Task6