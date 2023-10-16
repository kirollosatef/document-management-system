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
export const createArchive = createAsyncThunk(
  "folders/archive/create",
  async (actionData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`/api/v0/archives/${actionData.params.folderId}`, {
        method: "POST",
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
export const getFolders = createAsyncThunk(
  "folders/all",
  async (actionData, { rejectWithValue, getState }) => {
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
  async (actionData, { rejectWithValue, getState }) => {
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
export const deleteFolder = createAsyncThunk(
  "folders/delete",
  async (id, { rejectWithValue, getState }) => {
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
export const folderDetails = createAsyncThunk(
  "folders/details",
  async (id, { rejectWithValue, getState }) => {
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
