import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for adding a host as a collaborator
export const addHostAsCollaborator = createAsyncThunk(
  "collaborators/addHostAsCollaborator",
  async ({ eventId, hostId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      // Ensure hostId is a string and matches exactly
      const safeHostId = String(hostId);

      const apiUrl = `https://arthkambhoj.me/api/events/${eventId}/add-admin/${safeHostId}`;

      console.log("Full API URL:", apiUrl);
      console.log("EventId:", eventId);
      console.log("HostId (original):", hostId);
      console.log("HostId (safe string):", safeHostId);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response:", errorData);
        throw new Error(errorData || "Failed to add host as collaborator");
      }

      const responseData = await response.json();
      console.log("Success response:", responseData);

      return { hostId: safeHostId };
    } catch (error) {
      console.error("Caught error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Collaborators slice
const addCollaboratorSlice = createSlice({
  name: "addCollaborator",
  initialState: {
    collaborators: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHostAsCollaborator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHostAsCollaborator.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addHostAsCollaborator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addCollaboratorSlice.reducer;
