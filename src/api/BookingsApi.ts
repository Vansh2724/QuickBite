// src/api/BookingsApi.ts

import { Booking } from "../types";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetMyRestaurantBookings = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchBookings = async (): Promise<Booking[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/bookings/check-bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();
    return data.bookings;
  };

  const { data: bookings, isLoading, error } = useQuery<Booking[]>(
    "fetchMyRestaurantBookings",
    fetchBookings
  );

  return {
    bookings,
    isLoading,
    error,
  };
};
