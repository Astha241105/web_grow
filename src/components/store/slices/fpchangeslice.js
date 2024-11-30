import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const changePassword = createAsyncThunk(
  "fpchange/changePassword",
  async ({ email, newPassword }) => {
    const response = await fetch(
      "http://webgrowproject-1.onrender.com/api/v1/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      }
    );

    if (!response.ok) {
      throw new Error("Password change failed");
    }

    const data = await response.json();
    return data;
  }
);

const fpchange = createSlice({
  name: "fpchange",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default fpchange.reducer;
