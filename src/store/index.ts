import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo-reducer";
import scramReducer from "./scram-reducer";

const store = configureStore({
  reducer: {
    todoPage: todoReducer,
    scramApp: scramReducer
  }
})

export default store


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
