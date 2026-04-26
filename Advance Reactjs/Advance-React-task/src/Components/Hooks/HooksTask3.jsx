import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/counterSlice";


const HooksTask3 = () => {
  const count = useSelector((state) => state.counter.value); // state read
  const dispatch = useDispatch(); // action bhejne ke liye

  return (
    <div>
      <h2>Hooks Task 3 Redux Counter</h2>
      <h3>Count: {count}</h3>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default HooksTask3;