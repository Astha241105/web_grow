import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchParticipants = createAsyncThunk(
  "participants/fetchParticipants",
  async (eventId, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("authToken");

      console.log("Fetching participants for Event ID:", eventId);
      console.log(
        "Authentication Token:",
        token ? "Token present" : "No token found"
      );

      if (!token) {
        console.error("No authentication token found");
        throw new Error("No authentication token found");
      }

      console.log(
        "Sending request to:",
        `http://www.arthkambhoj.me:8080/api/events/${eventId}/participants`
      );

      const response = await fetch(
        `http://www.arthkambhoj.me:8080/api/events/${eventId}/participants`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error(errorData.message || "Failed to fetch participants");
      }

      const data = await response.json();
      console.log("Raw response data:", data);
      const participants = data.data.map((participant) => {
        const [namePart, emailPart] = participant.split(", ");
        return {
          name: namePart.replace("Name: ", ""),
          email: emailPart.replace("Email: ", ""),
        };
      });

      console.log("Transformed participants:", participants);

      return participants;
    } catch (error) {
      console.error("Error in fetchParticipants:", error);
      return rejectWithValue(error.message);
    }
  }
);

const participantsSlice = createSlice({
  name: "participants",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        console.log("Participants fetch - Pending state");
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        console.log("Participants fetch - Fulfilled state");
        console.log("Fetched participants:", action.payload);
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        console.log("Participants fetch - Rejected state");
        console.error("Participants fetch error:", action.payload);
        state.status = "failed";
        state.error = action.payload;
        state.list = [];
      });
  },
});

export default participantsSlice.reducer;
