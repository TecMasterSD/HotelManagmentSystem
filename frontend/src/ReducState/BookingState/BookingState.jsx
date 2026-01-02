import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/booking";

/* ================= CREATE BOOKING ================= */
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/create`, bookingData);
      return res.data.booking;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Booking Failed"
      );
    }
  }
);

/* ================= FETCH ALL BOOKINGS ================= */
export const fetchBooking = createAsyncThunk(
  "booking/fetchBooking",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/view`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch Failed"
      );
    }
  }
);

/* ================= FETCH ROOM BOOKINGS (CALENDAR) ================= */
export const getRoomBookings = createAsyncThunk(
  "booking/getRoomBookings",
  async (roomId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/room/${roomId}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Room bookings fetch failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    roomBookings: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE BOOKING */
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH ALL BOOKINGS */
      .addCase(fetchBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH ROOM BOOKINGS */
      .addCase(getRoomBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.roomBookings = action.payload;
      })
      .addCase(getRoomBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
