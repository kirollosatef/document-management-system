import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "./departmentActions";

//slices
const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    allDepartments: null,
    departmentDetails: null,
    loading: false,
    actionsLoading:false,
    error: false,
    created: false,
    updated: false,
    deleted: false,
    message: "",
    components: {
      selectedDepartment: null,
    },
  },
  reducers: {
    reset: (state) => {
      state.error = false;
      state.created = false;
      state.updated = false;
      state.deleted = false;
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
      state.actionsLoading = true;
    });
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      state.actionsLoading = false;
      state.allDepartments.push(action.payload?.department);
      state.created = true;
    });
    builder.addCase(createDepartment.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // Update
    builder.addCase(updateDepartment.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      const departmentIndex = state.allDepartments.findIndex(
        (item) => item._id === action.payload?.department?._id
      );
      state.actionsLoading = false;
      state.allDepartments[departmentIndex] = action.payload.department;
      state.updated = true;
    });
    builder.addCase(updateDepartment.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // Delete
    builder.addCase(deleteDepartment.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      const newDepartments = state.allDepartments.filter(
        (item) => item._id !== action.payload?.department
      );
      state.actionsLoading = false;
      state.allDepartments = newDepartments;
      state.deleted = true;
    });
    builder.addCase(deleteDepartment.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset, setSelectedDepartment } = departmentsSlice.actions;

export default departmentsSlice.reducer;
