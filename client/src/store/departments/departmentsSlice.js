import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createDepartment, getDepartments } from "./departmentActions";

//slices
const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    allDepartments: null,
    departmentDetails: null,
    loading: false,
    error: false,
    created: false,
    message: "",
    components: {
      selectedDepartment: null,
    },
  },
  reducers: {
    reset: (state) => {
      state.error = false;
      state.created = false;
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
    // create
    builder.addCase(createDepartment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.allDepartments.push(action.payload?.department);
      state.created = true;
    });
    builder.addCase(createDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset, setSelectedDepartment } = departmentsSlice.actions;

export default departmentsSlice.reducer;
