import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadEventImage = createAsyncThunk(
  "events/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      console.debug("Uploading image started", { file });

      const keyName = `event_image_${Date.now()}_${file.name}`;
      const formData = new FormData();
      formData.append("keyName", keyName);
      formData.append("file", file);

      const token = localStorage.getItem("authToken");
      console.debug("Token retrieved for image upload:", token);

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://www.arthkambhoj.me:8080/s3/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.debug("Image upload response received", {
        status: response.status,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload Error Response:", errorText);
        throw new Error(errorText || "Image upload failed");
      }

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.debug("Image upload response JSON parsed", data);
      } else {
        const responseText = await response.text();
        console.warn(
          "Non-JSON Response received for image upload",
          responseText
        );
        if (responseText) {
          return `https://webgrowbucket.s3.ap-south-1.amazonaws.com/${keyName}`;
        }
        throw new Error("Unexpected response format");
      }

      if (data && data.imageUrl) {
        return data.imageUrl;
      } else if (data && typeof data === "string") {
        return `https://webgrowbucket.s3.ap-south-1.amazonaws.com/${keyName}`;
      }

      throw new Error("Invalid response from image upload");
    } catch (error) {
      console.error("Image Upload Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateEventApi = createAsyncThunk(
  "events/updateEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      console.debug("Starting event update", { eventData });

      const token = localStorage.getItem("authToken");
      console.debug("Token retrieved for event update:", token);

      if (!token) {
        throw new Error("No authentication token found");
      }

      const requiredFields = [
        "eventId",
        "opportunityTitle",
        "aboutOpportunity",
        "organization",
        "registerStart",
        "registerEnd",
        "eventMode",
        "minTeamSize",
        "maxTeamSize",
        "opportunityType",
      ];

      requiredFields.forEach((field) => {
        if (eventData[field] === undefined || eventData[field] === null) {
          console.error(`Missing required field: ${field}`);
          throw new Error(`Missing required field: ${field}`);
        }
      });

      const payload = {
        title: eventData.opportunityTitle,
        description: eventData.aboutOpportunity,
        location: eventData.organization,
        registerStart: eventData.registerStart,
        imageUrl:
          eventData.imageUrl ||
          "https://webgrowbucket.s3.ap-south-1.amazonaws.com/default",
        mode: eventData.eventMode?.toUpperCase() || "ONLINE",
        registerEnd: eventData.registerEnd,
        capacityMin: eventData.minTeamSize || 1,
        capacityMax: eventData.maxTeamSize || 1,
        category: eventData.opportunityType || "OTHER",
        festival: eventData.festival?.trim() || null,
      };

      console.debug("Payload prepared for update API", payload);

      const response = await fetch(
        `http://www.arthkambhoj.me:8080/api/events/update/${eventData.eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      console.debug("Update event API response received", {
        status: response.status,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API Error during event update:", errorData);
        return rejectWithValue(
          errorData || "An error occurred while updating the event"
        );
      }

      const data = await response.json();
      console.debug("Event update response JSON parsed", data);
      return data;
    } catch (error) {
      console.error("Event Update Error:", error.message);
      return rejectWithValue(
        error.response?.data || "An error occurred while updating the event"
      );
    }
  }
);

export const fetchEventDetails = createAsyncThunk(
  "updateEvent/fetchEventDetails",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/events/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateEventSlice = createSlice({
  name: "updateEvent",
  initialState: {
    imageUrl: null,
    eventData: null,
    loading: false,
    success: false,
    error: null,
    eventDetails: null,
  },
  reducers: {
    resetUpdateState: (state) => {
      console.debug("Resetting update state");
      state.imageUrl = null;
      state.eventData = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setUpdateEventData: (state, action) => {
      console.debug("Setting update event data", action.payload);
      state.eventData = { ...state.eventData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadEventImage.pending, (state) => {
        console.debug("Image upload started");
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadEventImage.fulfilled, (state, action) => {
        console.debug("Image upload succeeded", action.payload);
        state.loading = false;
        state.imageUrl = action.payload;
        state.error = null;
      })
      .addCase(uploadEventImage.rejected, (state, action) => {
        console.error("Image upload failed", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.imageUrl = null;
      })
      .addCase(updateEventApi.pending, (state) => {
        console.debug("Event update started");
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateEventApi.fulfilled, (state, action) => {
        console.debug("Event update succeeded", action.payload);
        state.loading = false;
        state.success = true;
        state.eventData = action.payload;
      })
      .addCase(updateEventApi.rejected, (state, action) => {
        console.error("Event update failed", action.payload);
        state.loading = false;
        state.error =
          action.payload || "Update failed: No additional details provided";
        state.success = false;
      })
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.eventDetails = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateState, setUpdateEventData } =
  updateEventSlice.actions;
export default updateEventSlice.reducer;
