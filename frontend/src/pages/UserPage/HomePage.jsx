import React from "react";
import { useSelector } from "react-redux";

import Hero from "../../components/Hero";
import HotelList from "../../components/HotelList";
import Facility from "../../components/Facility";
import Gallery from "../../components/Gallery";
import Feedback from "../UserPage/Feedback";
import Listing from "../UserPage/ListingPage";

const HomePage = () => {
  const { user, loading } = useSelector((state) => state.auth);

  /* 🔄 Session check ke waqt kuch bhi render na ho */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <section id="home">
        <Hero />
      </section>

      <section id="facilities">
        <Facility />
      </section>

      <section id="rooms">
        <Listing />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      {/* 🔐 FEEDBACK ONLY WHEN USER LOGGED IN */}
      {user && (
        <section id="contact">
          <Feedback />
        </section>
      )}
    </div>
  );
};

export default HomePage;
