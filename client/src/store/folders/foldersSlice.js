import { createSlice } from "@reduxjs/toolkit";
import {
  createArchive,
  createFolder,
  deleteFolder,
  folderDetails,
  getFolders,
  updateFolder,
} from "./foldersActions";

//slices
const foldersSlices = createSlice({
  name: "users",
  initialState: {
    allFolders: null,
    folderDetails: null,
    loading: false,
    actionsLoading: false,
    error: false,
    created: false,
    updated: false,
    deleted: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.error = false;
      state.created = false;
      state.updated = false;
      state.deleted = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // create
    builder.addCase(createFolder.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(createFolder.fulfilled, (state, action) => {
      state.actionsLoading = false;
      state.allFolders.push(action.payload.folder);
      state.created = true;
    });
    builder.addCase(createFolder.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    //getFolders
    builder.addCase(getFolders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFolders.fulfilled, (state, action) => {
      state.loading = false;
      state.allFolders = action.payload.folders;
    });
    builder.addCase(getFolders.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
    // Update
    builder.addCase(updateFolder.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(updateFolder.fulfilled, (state, action) => {
      const userIndex = state.allFolders.findIndex(
        (item) => item._id === action.payload?.folder?._id
      );
      state.actionsLoading = false;
      state.allFolders[userIndex] = action.payload.folder;
      state.updated = true;
    });
    builder.addCase(updateFolder.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // Delete
    builder.addCase(deleteFolder.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(deleteFolder.fulfilled, (state, action) => {
      const newFolders = state.allFolders.filter(
        (item) => item._id !== action.payload?.folder?._id
      );
      state.actionsLoading = false;
      state.allFolders = newFolders;
      state.deleted = true;
    });
    builder.addCase(deleteFolder.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // GET Folder
    builder.addCase(folderDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(folderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.folderDetails = action.payload.folder;
    });
    builder.addCase(folderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
    // ===== Create Archive =====
    builder.addCase(createArchive.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createArchive.fulfilled, (state, action) => {
      state.loading = false;
      state.folderDetails.archives.push(action.payload.archive);
      state.created = true;
    });
    builder.addCase(createArchive.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset, setSelectedUser } = foldersSlices.actions;

export default foldersSlices.reducer;
