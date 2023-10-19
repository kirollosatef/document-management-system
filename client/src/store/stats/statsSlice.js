import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStats = createAsyncThunk(
  "stats/get",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/statistics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
const statsSlice = createSlice({
  name: "stats",
  initialState: {
    allStats:null,
    loading: false,
    error: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //getStats
    builder.addCase(getStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.loading = false;
      state.allStats = action.payload;
    });
    builder.addCase(getStats.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = statsSlice.actions;

export default statsSlice.reducer;
