import React, { useState } from 'react'

const Teskfive = () => {
    const[value ,setValue]=useState("");
    const handleChange = (e) => {
        setValue(e.target.value);
      };
  return (
    <div>
        <input
        type="text" placeholder="Type something..." value={value} onChange={handleChange}/>
        <p>You typed: {value}</p>
    </div>
  )
}

export default Teskfive