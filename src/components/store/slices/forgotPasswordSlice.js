import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const verifyOtpCode = createAsyncThunk(
  "recovery/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      console.log("Sending OTP verification request:", { email, otp });

      const response = await fetch(
        "https://webgrowproject.onrender.com/api/v1/auth/verify-otp",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword: "tempPassword123",
            confirmPassword: "tempPassword123",
          }),
        }
      );

      const text = await response.text();
      console.log("Raw API response:", text);

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error("JSON Parse Error:", e);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      localStorage.setItem("verifiedOtp", otp);
      return data;
    } catch (error) {
      console.error("OTP Verification Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "recovery/updatePassword",
  async ({ email, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const verifiedOtp = localStorage.getItem("verifiedOtp");
      if (!verifiedOtp) {
        throw new Error("OTP verification required");
      }

      console.log("Sending password update request");

      const response = await fetch(
        "https://webgrowproject.onrender.com/api/v1/auth/verify-otp",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: verifiedOtp,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const text = await response.text();
      console.log("Raw update response:", text);

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error("JSON Parse Error:", e);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Password update failed");
      }
      localStorage.removeItem("verifiedOtp");
      return data;
    } catch (error) {
      console.error("Password Update Error:", error);
      return rejectWithValue(error.message || "Failed to update password");
    }
  }
);

const recoverySlice = createSlice({
  name: "recovery",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    otpVerified: false,
    email: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.otpVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtpCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.otpVerified = false;
      })
      .addCase(verifyOtpCode.fulfilled, (state) => {
        state.isLoading = false;
        state.otpVerified = true;
        state.error = null;
      })
      .addCase(verifyOtpCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.otpVerified = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.otpVerified = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmail, resetState } = recoverySlice.actions;
export default recoverySlice.reducer;
