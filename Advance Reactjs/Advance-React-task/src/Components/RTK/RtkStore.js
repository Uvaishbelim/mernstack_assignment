import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import RtkReducer from "./RtkReducer";

const RtkStore = configureStore({
  reducer: {
    "Emp": RtkReducer,
  },
});

export default RtkStore