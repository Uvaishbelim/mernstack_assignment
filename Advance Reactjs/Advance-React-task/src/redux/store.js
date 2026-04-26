import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import empReducer from "../Components/RTK/RtkReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    Emp: empReducer,
  },
});