const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const bookTable = async (bookingData: {
  restaurantId: string;
  restaurantName: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  people: number;
}) => {
  const res = await fetch(`${API_BASE_URL}/api/bookings/create-booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Booking failed");
  }

  return res.json();
};
