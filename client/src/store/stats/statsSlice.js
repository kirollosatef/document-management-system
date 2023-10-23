import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStats = createAsyncThunk(
  "home/stats/get",
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
export const archiveSearch = createAsyncThunk(
  "home/archive/search",
  async (keyword, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ searchData: keyword }),
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
  name: "home",
  initialState: {
    allStats: null,
    searchResult: null,
    loading: false,
    searchLoading: false,
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
    // Search
    builder.addCase(archiveSearch.pending, (state, action) => {
      state.searchLoading = true;
    });
    builder.addCase(archiveSearch.fulfilled, (state, action) => {
      state.searchLoading = false;
      state.searchResult = action.payload.archive;
      state.deleted = true;
    });
    builder.addCase(archiveSearch.rejected, (state, action) => {
      state.searchLoading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = statsSlice.actions;

export default statsSlice.reducer;
