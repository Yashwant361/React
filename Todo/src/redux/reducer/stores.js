import { createStore } from "redux";
import todoReducer from "./todoReducers";  // ✅ exact path

export const store = createStore(todoReducer);
