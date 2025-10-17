const API_BASE_URL = "http://localhost:2525/ride";

export const bookingService = {
  // Create a new booking
  async createBooking(bookingData) {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  // Get all bookings
  async getAllBookings() {
    try {
      const response = await fetch(`${API_BASE_URL}/find`);

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  // Get booking by ID
  async getBookingById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/find/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch booking");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  },

  // Get bookings by user ID
  async getBookingsByUserId(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/find/user/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user bookings");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      throw error;
    }
  },
};
