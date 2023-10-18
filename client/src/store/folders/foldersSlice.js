import { createSlice } from "@reduxjs/toolkit";
import {
  archiveDetails,
  createArchive,
  createFile,
  createFolder,
  deleteArchive,
  deleteFile,
  deleteFolder,
  folderDetails,
  getFolders,
  updateArchive,
  updateFile,
  updateFolder,
} from "./foldersActions";

//slices
const foldersSlices = createSlice({
  name: "users",
  initialState: {
    allFolders: null,
    folderDetails: null,
    archives: null,
    archiveDetails: {},
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
      state.actionsLoading = true;
    });
    builder.addCase(createArchive.fulfilled, (state, action) => {
      state.actionsLoading = false;
      state.folderDetails.archives.push(action.payload.archive);
      state.created = true;
    });
    builder.addCase(createArchive.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // ===== Update Archive =====
    builder.addCase(updateArchive.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(updateArchive.fulfilled, (state, action) => {
      const archiveIndex = state.folderDetails.archives.findIndex(
        (item) => item._id === action.payload?.archive?._id
      );
      state.actionsLoading = false;
      state.folderDetails.archives[archiveIndex] = action.payload.archive;
      state.updated = true;
    });
    builder.addCase(updateArchive.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // ===== Delete Archive =====
    builder.addCase(deleteArchive.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(deleteArchive.fulfilled, (state, action) => {
      const newArchives = state.folderDetails.archives.filter(
        (item) => item._id !== action.payload?.archive?._id
      );
      state.actionsLoading = false;
      state.folderDetails.archives = newArchives;
      state.deleted = true;
    });
    builder.addCase(deleteArchive.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // ===== Archive Details =====
    builder.addCase(archiveDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(archiveDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.archiveDetails = action.payload.archive;
    });
    builder.addCase(archiveDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
    // ===== File Actions =====
    // ===== File Actions ===== Create
    builder.addCase(createFile.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(createFile.fulfilled, (state, action) => {
      state.actionsLoading = false;
      state.archiveDetails.files.push(action.payload.data);
      state.created = true
    });
    builder.addCase(createFile.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // Update
    builder.addCase(updateFile.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(updateFile.fulfilled, (state, action) => {
      const fileIndex = state.archiveDetails.files.findIndex(
        (item) => item._id === action.payload?.data?._id
      );
      state.actionsLoading = false;
      state.archiveDetails.files[fileIndex] = action.payload.data;
      state.updated = true;
    });
    builder.addCase(updateFile.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
    // Delete
    builder.addCase(deleteFile.pending, (state, action) => {
      state.actionsLoading = true;
    });
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      const newFiles = state.archiveDetails.files.filter(
        (item) => item._id !== action.payload?.data?._id
      );
      state.actionsLoading = false;
      state.archiveDetails.files = newFiles;
      state.deleted = true;
    });
    builder.addCase(deleteFile.rejected, (state, action) => {
      state.actionsLoading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { reset, setSelectedUser } = foldersSlices.actions;

export default foldersSlices.reducer;
