import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useRazorpay } from "../Hooks/UseRazorpay"; // Import the hook here
import { Order } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get orders");
    }
    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrderRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[]; 
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const isRazorpayLoaded = useRazorpay();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );
  
    if (!response.ok) {
      // Try to parse the response as JSON if possible, otherwise handle HTML error
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);  // Attempt to parse as JSON
        console.error("Error from server:", errorData);
        throw new Error(errorData.message || "Unable to create checkout session");
      } catch (jsonParseError) {
        // If response is not JSON (likely an HTML page), log the HTML response
        console.error("Non-JSON response from server:", errorText);
        throw new Error("Server returned an unexpected error page.");
      }
    }
  
    const data = await response.json();  // Only parse as JSON if response is OK
    return data;  // Return data containing id, restaurantName, and other required info
  };
  

  // In your mutation:
  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest, {
    onSuccess: (data) => {
      if (!isRazorpayLoaded) {
        toast.error("Razorpay SDK failed to load. Please try again.");
        return;
      }

      const restaurantName = data.restaurantName || "Your Restaurant Name"; // Use restaurant name from response

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use Razorpay Key here
        amount: data.totalAmount * 100, // Amount in paise (from the server response)
        currency: "INR",
        name: restaurantName,
        description: "Order Payment",
        order_id: data.id, // Order ID from server response

        handler: async (_response: any) => {
          try {
            const accessToken = await getAccessTokenSilently();

            // Use the MongoDB orderId returned by the backend
            await fetch(`${API_BASE_URL}/api/order/update-status`, {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ orderId: data.orderId, status: "paid" }),
            });

            toast.success("Payment successful and order status updated!");
          } catch (error) {
            console.error("Error updating order status:", error);
            toast.error(
              "Payment successful, but failed to update order status."
            );
          }
        },

        prefill: {
          name: data.deliveryDetails?.name || "Guest",
          email: data.deliveryDetails?.email || "",
          contact: "8401138333", // Test contact number
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    },

    onError: (err) => {
      console.error("Checkout session error:", err);
      toast.error(`Error: ${err instanceof Error ? err.message : "An unknown error occurred"}`);
    },

    onSettled: () => {
      reset(); // Reset the mutation after it's done
    },
  });

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
