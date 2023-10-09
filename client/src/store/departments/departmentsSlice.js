import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDepartments = createAsyncThunk(
  "departments/all",
  async (actionData, { rejectWithValue, getState }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/departments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    allDepartments: null,
    departmentDetails: null,
    loading: false,
    error: false,
    message: "",
    components: {
      selectedDepartment:null,
    },
  },
  reducers: {
    reset: (state) => {
      state.error = false;
      state.message = "";
    },
    setSelectedDepartment: (state, { payload }) => {
      state.components.selectedDepartment = payload;
    },
  },
  extraReducers: (builder) => {
    //getDepartments
    builder.addCase(getDepartments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.allDepartments = action.payload?.departments;
    });
    builder.addCase(getDepartments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset,setSelectedDepartment } = departmentsSlice.actions;

export default departmentsSlice.reducer;
