import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooking } from "./bookingSlice";

const BookingList = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBooking());
  }, [dispatch]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Bookings List</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b._id}>{b.customerName} - {b.roomNumber} - {b.status}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
