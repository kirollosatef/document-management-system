// store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/usersSlice";
import departmentsSlice from "./departments/departmentsSlice";
import authSlice from "./auth/authSlice";
import toolsbarSlice from "./toolsbar/toolsbarSlice";
import foldersSlice from "./folders/foldersSlice";
import statsSlice from "./stats/statsSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  stats: statsSlice,
  users: usersSlice,
  departments: departmentsSlice,
  folders: foldersSlice,
  toolsbar: toolsbarSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
