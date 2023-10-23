import { createSlice } from "@reduxjs/toolkit";
const toolsbarSlice = createSlice({
  name: "toolsbar",
  initialState: {
    open: false,
    add: false,
    addSubfolder: false,
    update: false,
    remove: false,
    print: false,
    components: {
      selectedItem: { type: "", item: {} },
      toolbarPosition: "bottom",
      pageName: "",
    },
  },
  reducers: {
    resetToolbar: (state) => {
      state.add = false;
      state.update = false;
      state.remove = false;
      state.print = false;
      state.printFile = false;
      state.open = false;
    },
    setPageName: (state, { payload }) => {
      state.components.pageName = payload;
    },
    setOpen: (state, { payload }) => {
      state.open = payload;
    },
    setAdd: (state, { payload }) => {
      state.add = payload;
    },
    setAddSubfolder: (state, { payload }) => {
      state.addSubfolder = payload;
    },
    setUpdate: (state, { payload }) => {
      state.update = payload;
    },
    setRemove: (state, { payload }) => {
      state.remove = payload;
    },
    setPrint: (state, { payload }) => {
      state.print = payload;
    },
    setPrintFile: (state, { payload }) => {
      state.printFile = payload;
    },
    setSelectedItem: (state, action) => {
      state.components.selectedItem = action.payload;
    },
    setPosition: (state, action) => {
      state.components.toolbarPosition = action.payload;
    },
    resetSelectedItem: (state, action) => {
      state.components.selectedItem = { type: "", item: {} };
    },
    resetToolbarPosition: (state, action) => {
      state.components.toolbarPosition = "bottom";
    },
  },
});

export const {
  resetToolbar,
  resetSelectedItem,
  setPageName,
  setOpen,
  setAdd,
  setUpdate,
  setRemove,
  setPrint,
  setPrintFile,
  setPosition,
  setSelectedItem,
  setAddSubfolder,
} = toolsbarSlice.actions;

export default toolsbarSlice.reducer;
