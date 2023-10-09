import { createSlice } from "@reduxjs/toolkit";
const toolsbarSlice = createSlice({
  name: "toolsbar",
  initialState: {
    add: false,
    update: false,
    delete: false,
    print: false,
  },
  reducers: {
    reset: (state) => {
      state.add = false;
      state.update = false;
      state.delete = false;
      state.print = false;
    },
    setAdd: (state,{payload}) => {
      state.add = payload;
    },
    setUpdate: (state,{payload}) => {
      state.update = payload;
    },
    setDelete: (state,{payload}) => {
      state.delete = payload;
    },
    setPrint: (state,{payload}) => {
      state.print = payload;
    },
  },
});

export const { reset, setAdd, setUpdate, setDelete, setPrint } =
  toolsbarSlice.actions;

export default toolsbarSlice.reducer;
