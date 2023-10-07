import { createSlice } from "@reduxjs/toolkit";
import { allUsers } from "./usersActions";

//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    users:null,
    loading: false,
    error: false,
    components: {
      selectedUser: null,
    },
  },
  reducers: {
    reset: (state) => {
      state.error = false;
    },
    setSelectedUser: (state, action) => {
      state.components.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    //allUsers
    builder.addCase(allUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(allUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(allUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = state.payload;
    });
  },
});

export const { reset, setSelectedUser } = usersSlices.actions;

export default usersSlices.reducer;
