import React, { useState } from "react";

const Task8 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [allData, setallData] = useState([])
  const [id, setId] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setId(id)
  };

  const handleSubmit = (e) => {
    setallData([
      ...allData, formData
    ])
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div>
      <h3>User Form</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />
        <br /><br />

        <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
        <br /><br />

        <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <table border={"2"}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((i, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.password}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Task8;