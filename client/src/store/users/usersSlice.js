import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./usersActions";

//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    allUsers: null,
    loading: false,
    actionsLoading: false,
    error: false,
  },
  reducers: {
    reset: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    //getUsers
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload.users;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = state.payload;
    });
  },
});

export const { reset, setSelectedUser } = usersSlices.actions;

export default usersSlices.reducer;
