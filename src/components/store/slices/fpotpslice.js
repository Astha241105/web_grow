import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const verifyOtp = createAsyncThunk(
  "fpotp/verifyOtp",
  async ({ email, otp }) => {
    console.log({ email, otp })
    const response = await fetch(
      "https://webgrowproject.onrender.com/api/v1/auth/verify-otp",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "OTP verification failed");
    }

    const data = await response.json();
    return data;
  }
);

const fpotp = createSlice({
  name: "fpotp",
  initialState: {
    email: null,
    verifiedOtp: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verifiedOtp = true;
        state.email = action.payload.email;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default fpotp.reducer;
