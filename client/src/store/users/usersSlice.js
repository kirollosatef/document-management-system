import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "./usersActions";

//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")),
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
    //register
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = state.payload;
    });
  },
});

export const { reset, setSelectedUser } = usersSlices.actions;

export default usersSlices.reducer;
