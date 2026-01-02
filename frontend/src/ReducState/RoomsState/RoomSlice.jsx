// src/ReducState/RoomState/RoomSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/room";

// ==================== FETCH ALL ROOMS ====================
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/view`);
      return response.data.data || response.data.rooms;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error fetching rooms");
    }
  }
);

// ==================== CREATE ROOM ====================
export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/create`, roomData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.room;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error creating room");
    }
  }
);

// ==================== UPDATE ROOM ====================
export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async ({ roomId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/update/${roomId}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.room;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error updating room");
    }
  }
);

// ==================== DELETE ROOM ====================
export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (roomId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/delete/${roomId}`);
      return roomId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error deleting room");
    }
  }
);

// ==================== SLICE ====================
const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ROOMS
      .addCase(fetchRooms.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRooms.fulfilled, (state, action) => { state.loading = false; state.rooms = action.payload; })
      .addCase(fetchRooms.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // CREATE ROOM
      .addCase(createRoom.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createRoom.fulfilled, (state, action) => { state.loading = false; state.rooms.push(action.payload); })
      .addCase(createRoom.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // UPDATE ROOM
      .addCase(updateRoom.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rooms.findIndex(r => r._id === action.payload._id);
        if (index !== -1) state.rooms[index] = action.payload;
      })
      .addCase(updateRoom.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // DELETE ROOM
      .addCase(deleteRoom.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter(r => r._id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export default roomSlice.reducer;
