import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaConciergeBell,
  FaSwimmingPool,
  FaTv,
  FaWifi,
  FaUtensils,
  FaCalendarAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  createBooking,
  clearBookingState,
  fetchBooking,
} from "../../ReducState/BookingState/BookingState";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendarRef = useRef();

  const { loading, error, success, bookings = [] } = useSelector(
    (state) => state.booking
  );
  const authUser = useSelector((state) => state.auth.user);

  const [room, setRoom] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const [showCalendar, setShowCalendar] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5); // ✅ Rating state

  /* ================= FETCH ROOM ================= */
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/room/view");
        const data = await res.json();
        const rooms = data.data || data;
        const selectedRoom = rooms.find((r) => r._id === id);
        if (!selectedRoom) throw new Error("Room not found");
        setRoom(selectedRoom);
      } catch (err) {
        setFetchError(err.message);
      }
    };
    fetchRoom();
  }, [id]);

  /* ================= FETCH BOOKINGS ================= */
  useEffect(() => {
    dispatch(fetchBooking());
  }, [dispatch]);

  const roomBookings = bookings.filter(
    (b) => b.room === id || b.room?._id === id
  );

  /* ================= CALENDAR SELECTION ================= */
  const handleCalendarSelect = (date) => {
    if (activeField === "checkIn") {
      setCheckIn(date);
      setCheckOut(null);
    } else if (activeField === "checkOut" && checkIn && date > checkIn) {
      setCheckOut(date);
    }
    setShowCalendar(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= BOOKING ================= */
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!authUser) return alert("Please login first");
    if (!checkIn || !checkOut) return alert("Select dates from calendar");

    dispatch(
      createBooking({
        guest: authUser._id,
        room: room._id,
        name: authUser.username,
        email: authUser.email,
        checkIn,
        checkout: checkOut,
        guests,
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch(clearBookingState());
      alert("Booking Successful!");
      navigate("/my-bookings");
    }
  }, [success, dispatch, navigate]);

  /* ================= FEEDBACK ================= */
  useEffect(() => {
    fetch(`http://localhost:5000/api/feedback/room/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.feedbacks || []));
  }, [id]);

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!authUser) return alert("Login required");

    try {
      const res = await fetch("http://localhost:5000/api/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({
          user: authUser._id,
          room: room._id,
          title: feedbackTitle,
          comment: feedbackText,
          rating, // ✅ rating send
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedbacks([data.feedback, ...feedbacks]);
        setFeedbackTitle("");
        setFeedbackText("");
        setRating(5);
      } else {
        alert(data.message || "Feedback submission failed");
      }
    } catch (err) {
      alert("Feedback submission error");
    }
  };

  if (fetchError)
    return <p className="text-center text-red-500 mt-10">{fetchError}</p>;
  if (!room)
    return <p className="text-center mt-10">Loading room details...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* ROOM INFO */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">{room.title}</h1>
          <p className="text-xl font-semibold">Price: ${room.Price}</p>
          <img
            src={`http://localhost:5000/${room.image}`}
            className="rounded-lg w-full h-[380px] object-cover"
            alt=""
          />
          <div className="grid grid-cols-2 gap-3 bg-gray-100 p-4 rounded-lg">
            <div><FaWifi /> Wi-Fi</div>
            <div><FaTv /> TV</div>
            <div><FaUtensils /> Restaurant</div>
            <div><FaSwimmingPool /> Pool</div>
            <div><FaConciergeBell /> Room Service</div>
          </div>
        </div>

        {/* BOOKING */}
        <div className="bg-white p-5 shadow rounded-lg relative">
          <h2 className="text-xl font-bold mb-4">Book Your Stay</h2>
          <form onSubmit={handleBookingSubmit} className="space-y-3">
            <div className="relative">
              <input
                readOnly
                placeholder="Check-in"
                value={checkIn ? new Date(checkIn).toDateString() : ""}
                className="w-full border p-2 rounded cursor-pointer"
                onClick={() => {
                  setActiveField("checkIn");
                  setShowCalendar(true);
                }}
              />
              <FaCalendarAlt
                className="absolute right-3 top-3 text-gray-600 cursor-pointer z-50"
                onClick={() => {
                  setActiveField("checkIn");
                  setShowCalendar(true);
                }}
              />
            </div>
            <div className="relative">
              <input
                readOnly
                placeholder="Check-out"
                value={checkOut ? new Date(checkOut).toDateString() : ""}
                className="w-full border p-2 rounded cursor-pointer mt-2"
                onClick={() => {
                  setActiveField("checkOut");
                  setShowCalendar(true);
                }}
              />
              <FaCalendarAlt
                className="absolute right-3 top-3 text-gray-600 cursor-pointer z-50"
                onClick={() => {
                  setActiveField("checkOut");
                  setShowCalendar(true);
                }}
              />
            </div>

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute z-50 mt-2 bg-white shadow-lg p-2 rounded"
              >
                <Calendar
                  onClickDay={handleCalendarSelect}
                  tileDisabled={({ date }) =>
                    roomBookings.some((b) => {
                      const start = new Date(b.checkIn);
                      const end = new Date(b.checkout);
                      return date >= start && date <= end;
                    })
                  }
                  tileContent={({ date, view }) => {
                    if (view === "month") {
                      const isBooked = roomBookings.some((b) => {
                        const start = new Date(b.checkIn);
                        const end = new Date(b.checkout);
                        return date >= start && date <= end;
                      });
                      return (
                        <div className="text-center font-bold">
                          {isBooked ? (
                            <span className="text-red-600">❌</span>
                          ) : (
                            <span className="text-green-600">✔</span>
                          )}
                        </div>
                      );
                    }
                  }}
                />
              </div>
            )}

            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
            <button className="w-full bg-black text-white py-2 rounded">
              {loading ? "Booking..." : "Book Now"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>

      {/* FEEDBACK */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>

        {authUser && (
          <form onSubmit={submitFeedback} className="space-y-3 mb-6">
            <input
              className="border p-2 w-full"
              placeholder="Title"
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
              required
            />
            <textarea
              className="border p-2 w-full"
              placeholder="Comment"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
            />
            {/* RATING */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="bg-black text-white px-4 py-2 rounded mt-2">
              Submit
            </button>
          </form>
        )}

        {feedbacks.map((fb) => (
          <div key={fb._id} className="border-t pt-4 mt-4">
            <div className="flex items-center gap-2">
              <h4 className="font-bold">{fb.title}</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={s <= fb.rating ? "text-yellow-400" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p>{fb.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
