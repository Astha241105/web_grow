// src/redux/accountSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (accountDetails, { rejectWithValue }) => {
    try {
      const response = await fetch("https://webgrowproject.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountDetails),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    status: null,
    error: null,
  },
  reducers: {
    setPersonalDetails: (state, action) => {
      const { firstName, lastName, email, phone } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone = phone;
    },
    setPasswordDetails: (state, action) => {
      const { password, confirmPassword } = action.payload;
      state.password = password;
      state.confirmPassword = confirmPassword;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPersonalDetails, setPasswordDetails } = accountSlice.actions;
export default accountSlice.reducer;
