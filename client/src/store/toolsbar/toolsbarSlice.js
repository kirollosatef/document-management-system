import { createSlice } from "@reduxjs/toolkit";
const toolsbarSlice = createSlice({
  name: "toolsbar",
  initialState: {
    add: false,
    update: false,
    delete: false,
    print: false,
    components: { selectedItem: { type: "", item: {} } },
  },
  reducers: {
    resetToolbar: (state) => {
      state.add = false;
      state.update = false;
      state.delete = false;
      state.print = false;
    },
    setAdd: (state, { payload }) => {
      state.add = payload;
    },
    setUpdate: (state, { payload }) => {
      state.update = payload;
    },
    setDelete: (state, { payload }) => {
      state.delete = payload;
    },
    setPrint: (state, { payload }) => {
      state.print = payload;
    },
    setSelectedItem: (state, action) => {
      state.components.selectedItem = action.payload;
    },
    resetSelectedItem: (state, action) => {
      state.components.selectedItem = { type: "", item: {} };
    },
  },
});

export const {
  resetToolbar,
  resetSelectedItem,
  setAdd,
  setUpdate,
  setDelete,
  setPrint,
  setSelectedItem,
} = toolsbarSlice.actions;

export default toolsbarSlice.reducer;
