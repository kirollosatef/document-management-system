// store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
