import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./AuthState/AuthState";
import roomSlice from '../ReducState/RoomsState/RoomSlice';
import bookingSlice  from './BookingState/BookingState';
import billingSlice from './Bills/BillingState';
import feedbackReducer from './FeedbackState/feedbackSlice'
import staffReducer from "./staffState/staffSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomSlice,
    booking: bookingSlice,
    billing: billingSlice, 
     feedback: feedbackReducer,
     staff: staffReducer
  },
});

export default store;
