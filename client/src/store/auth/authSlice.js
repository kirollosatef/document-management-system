import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (actionData, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(`/api/v0/users/login`, {
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
      localStorage.setItem("user",data?.user)
      localStorage.setItem("token",data?.token)
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
    user: JSON.parse(localStorage.getItem("user")) || null,
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
    //login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = state.payload;
    });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
