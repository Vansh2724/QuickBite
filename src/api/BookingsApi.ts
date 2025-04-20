import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurantBookings = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchBookings = async () => {
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

    return response.json();
  };

  const { data, isLoading, error } = useQuery("fetchMyRestaurantBookings", fetchBookings);

  return {
    bookings: data?.bookings,
    isLoading,
    error,
  };
};
