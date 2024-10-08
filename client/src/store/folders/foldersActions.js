import { createAsyncThunk } from "@reduxjs/toolkit";

export const createFolder = createAsyncThunk(
  "folders/create",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/folders`, {
        method: "POST",
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
export const createSubFolder = createAsyncThunk(
  "folders/subFolder/create",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(
        `/api/v0/folders/${actionData.params.folderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(actionData.data),
        }
      );
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
export const createFile = createAsyncThunk(
  "folders/archive/file/create",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("file", actionData.data.tempPhoto);
      formData.append("name", actionData.data?.name);
      const response = await fetch(
        `/api/v0/files/${actionData.params.archiveId}`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
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
export const createMultipleFiles = createAsyncThunk(
  "folders/archive/file/multiple/create",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      const response = await fetch(
        `/api/v0/files/multiple/${actionData.params.archiveId}`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: actionData.data,
        }
      );
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
export const createArchive = createAsyncThunk(
  "folders/archive/create",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(
        `/api/v0/archives/${actionData.params.folderId}`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: actionData.data,
        }
      );
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
export const getFolders = createAsyncThunk(
  "folders/all",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/folders`, {
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
export const updateFolder = createAsyncThunk(
  "folders/update",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/folders/${actionData.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(actionData.data),
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
export const updateFile = createAsyncThunk(
  "folders/archive/file/update",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/files/${actionData.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(actionData.data),
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

export const uploadMultipleFiles = createAsyncThunk(
  "folders/archive/file/uploadMultiple",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      actionData.data.forEach((file) => {
        formData.append("files", file);
      });
      const response = await fetch(
        `/api/v0/files/multiple/${actionData.params.archiveId}`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const updateArchive = createAsyncThunk(
  "folders/archive/update",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives/${actionData.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(actionData.data),
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
export const deleteFolder = createAsyncThunk(
  "folders/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/folders/${id}`, {
        method: "DELETE",
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
export const deleteFile = createAsyncThunk(
  "folders/archive/file/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/files/${id}`, {
        method: "DELETE",
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
export const deleteArchive = createAsyncThunk(
  "folders/archive/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives/${id}`, {
        method: "DELETE",
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
export const folderDetails = createAsyncThunk(
  "folders/details",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/folders/${id}`, {
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
export const archiveDetails = createAsyncThunk(
  "folders/archive/details",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives/${id}`, {
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
export const searchSubFolders = createAsyncThunk(
  "folders/subFolders/search",
  async (keyword, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/folders/search/sub-folder`, {
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

export const moveArchiveToTrash = createAsyncThunk(
  "archives/moveToTrash",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives/trash/${actionData.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: actionData.reason }),
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

export const restoreArchiveFromTrash = createAsyncThunk(
  "archives/restoreFromTrash",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives/trash/restore/${id}`, {
        method: "POST",
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

export const permanentlyDeleteArchive = createAsyncThunk(
  "archives/permanentlyDelete",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives/trash/${id}`, {
        method: "DELETE",
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

export const getTrashArchives = createAsyncThunk(
  "archives/getTrash",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives/trash/get/all`, {
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

export const downloadAllFiles = createAsyncThunk(
  "files/downloadAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch("/api/v0/files/download/all/files", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all_files.zip");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      return "Download successful";
    } catch (error) {
      console.error("Download error:", error);
      return rejectWithValue(error.message || "An error occurred during download");
    }
  }
);