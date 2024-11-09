// src/redux/accountSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (accountDetails, { rejectWithValue }) => {
    console.log(accountDetails)
    try {
      const response = await fetch(
        "https://webgrowproject-1.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(accountDetails),
        }
      );

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
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    organization:null,
    designation:null,
    role:"user",
    status: null,
    error: null,
  },
  reducers: {
    setPersonalDetails: (state, action) => {
      const { firstName, lastName, email, mobile } = action.payload;
      state.firstname = firstName;
      state.lastname = lastName;
      state.email = email;
      state.mobile= mobile;
    },
    setPasswordDetails: (state, action) => {
      const { password, confirmPassword } = action.payload;
      state.password = password;
      state.confirmPassword = confirmPassword;
    },
    resetAccountDetails: (state) => {
      state.firstname = "";
      state.lastname = "";
      state.email = "";
      state.mobile = "";
      state.password = "";
      state.confirmPassword = "";
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
      .addCase(createAccount.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPersonalDetails, setPasswordDetails, resetAccountDetails } = accountSlice.actions;
export default accountSlice.reducer;
