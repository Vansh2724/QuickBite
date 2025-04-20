import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "../api/MyRestaurantApi";
import { useGetMyRestaurantBookings } from "../api/BookingsApi";
import Footer from "../components/Footer";
import OrderItemCard from "../components/OrderItemCard";
import BookingItemCard from "../components/BookingItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ManageRestaurantForm from "../forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();
  const { bookings }: { bookings?: Array<{ _id: string; name: string; email: string; phone: string; date: string; time: string; people: number }> } = useGetMyRestaurantBookings(); // ✅ Ensure bookings have required fields

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger> {/* ✅ NEW TAB */}
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>

      <TabsContent value="orders" className="space-y-5 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard key={order._id} order={order} />
        ))}
        <Footer />
      </TabsContent>

      <TabsContent value="bookings" className="space-y-5 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold">{bookings?.length || 0} upcoming bookings</h2>
        {bookings?.map((booking) => (
          <BookingItemCard
            key={booking._id}
            booking={{
              _id: booking._id,
              name: booking.name || "Unknown",
              email: booking.email || "Unknown",
              phone: booking.phone || "Unknown",
              date: booking.date || "Unknown",
              time: booking.time || "Unknown",
              people: booking.people || 0,
            }}
          />
        ))}
        <Footer />
      </TabsContent>

      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
