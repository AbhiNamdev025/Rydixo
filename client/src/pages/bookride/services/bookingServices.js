import { BASE_URL_RIDE } from "../../../const/const";

const API_BASE_URL = `${BASE_URL_RIDE}`;

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

  // Update booking status
  async updateBookingStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/update-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  },

  // Update booking
  async updateBooking(id, updateData) {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  },
};
