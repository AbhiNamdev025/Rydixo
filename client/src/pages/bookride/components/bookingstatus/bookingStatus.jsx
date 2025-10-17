import React from "react";
import { useParams } from "react-router-dom";
import RideBookingFlow from "../ridebooking/rideBooking";

const BookingStatus = () => {
  const { bookingId } = useParams();

  return (
    <div>
      <RideBookingFlow bookingId={bookingId} />
    </div>
  );
};

export default BookingStatus;
