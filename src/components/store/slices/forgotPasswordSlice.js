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
            newPassword: "temporary",
            confirmPassword: "temporary",
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

      return data;
    } catch (error) {
      console.error("OTP Verification Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "recovery/updatePassword",
  async ({ email, otp, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      console.log("Sending password update request:", {
        email,
        otp,
        newPassword: "***",
        confirmPassword: "***",
      });

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
    email: "",
    verifiedOtp: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    resetState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(verifyOtpCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtpCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.verifiedOtp = action.meta.arg.otp;
        state.error = null;
      })
      .addCase(verifyOtpCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmail, resetState } = recoverySlice.actions;
export default recoverySlice.reducer;
