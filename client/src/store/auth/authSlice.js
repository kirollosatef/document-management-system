import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "users/register",
  async (actionData, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(`/api/v0/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionData),
      });
      const data = await response.json();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: "An unknown error occurred. Please try again later.",
      });
    }
  }
);

//slices
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || {},
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

export const { reset } = authSlice.actions;

export default authSlice.reducer;
