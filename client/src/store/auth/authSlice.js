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

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
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
    message: "",
    components: {
      selectedUser: null,
    },
  },
  reducers: {
    reset: (state) => {
      state.error = false;
      state.message = "";
    },
    setSelectedUser: (state, action) => {
      state.components.selectedUser = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload?.user));
      localStorage.setItem("token", JSON.stringify(action.payload?.token));
      state.loading = false;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
