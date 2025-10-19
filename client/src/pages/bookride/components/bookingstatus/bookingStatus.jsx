import React from "react";
import { useParams } from "react-router-dom";
import RideBookingFlow from "../ridebooking/rideBooking";
import Header from "../../../../components/global/header/header";
import Footer from "../../../../components/global/footer/footer";
const BookingStatus = () => {
  const { bookingId } = useParams();

  return (
    <div>
      <Header />
      <RideBookingFlow bookingId={bookingId} />
      <Footer />
    </div>
  );
};

export default BookingStatus;
