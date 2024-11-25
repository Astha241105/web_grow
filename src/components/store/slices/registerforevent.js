import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const registerInEvent = createAsyncThunk(
  'eventRegistration/registerInEvent',
  async ({ eventId, participantData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://35.154.224.49:8080/api/v1/participant/events/${eventId}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(participantData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const eventRegistrationSlice = createSlice({
  name: 'eventRegistration',
  initialState: {
    status: 'idle', 
    error: null,
    message: null, 
  },
  reducers: {
    clearRegistrationState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerInEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(registerInEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message || 'Registration successful';
      })
      .addCase(registerInEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearRegistrationState } = eventRegistrationSlice.actions;
export default eventRegistrationSlice.reducer;
