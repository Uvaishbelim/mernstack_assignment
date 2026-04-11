import React from 'react'

const Taskseven = () => {
    const users =[
        {id:1, name:"Uvaish"},
        {id:2, name:"Ali"},
        {id:3, name:"Rayan"},
        {id:4, name:"Junaid"}
    ]
  return (
    <div>
        <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Taskseven