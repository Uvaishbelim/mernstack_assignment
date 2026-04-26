import React, { useRef, useState } from 'react'

const HooksTask4 = () => {
    const countRef = useRef(0);
    const [render, setRender] = useState(0);

    const increase = () => {
        countRef.current += 1; // updates value
        console.log(countRef.current);
    };
    return (
        <div>
            <h2>Hooks Task 4</h2>

            <h2>Count (no re-render) : {countRef.current}</h2>

            <button onClick={increase}>Increase</button>

            <button onClick={() => setRender(render + 1)}>
                Force Re-render
            </button>
        </div>
    )
}

export default HooksTask4