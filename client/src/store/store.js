// store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/usersSlice";
import departmentsSlice from "./departments/departmentsSlice";
import authSlice from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
  departments: departmentsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
