import { createAsyncThunk } from "@reduxjs/toolkit";


export const allUsers = createAsyncThunk(
  "users/all",
  async (actionData, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/v0/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: "An unknown error occurred. Please try again later.",
      });
    }
  }
);
