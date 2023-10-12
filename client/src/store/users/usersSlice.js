import { createSlice } from "@reduxjs/toolkit";
import { createUser, getUsers, updateUser } from "./usersActions";

//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    allUsers: null,
    loading: false,
    actionsLoading: false,
    error: false,
    created: false,
    updated: false,
  },
  reducers: {
    reset: (state) => {
      state.error = false;
      state.created = false;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    // create
    builder.addCase(createUser.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.actionsLoading = false;
      state.allUsers.push(action.payload.user);
      state.created = true;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = state.payload.message;
    });
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
      state.error = state.payload.message;
    });
    // Update
    builder.addCase(updateUser.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const userIndex = state.allUsers.findIndex(
        (item) => item._id === action.payload?.user?._id
      );
      state.actionsLoading = false;
      state.allUsers[userIndex] = action.payload.user;
      state.updated = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset, setSelectedUser } = usersSlices.actions;

export default usersSlices.reducer;
