import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
  _id: string;
  name: string;
  email: string;
};

type Restaurant = {
  _id: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: any[];
  imageUrl: string;
  user: string;
};

const AdminPage = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [view, setView] = useState<"users" | "restaurants" | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [citySearch, setCitySearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();

      const [userRes, restaurantRes] = await Promise.all([
        fetch("http://localhost:7000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Email": user?.email || "",
          },
        }),
        fetch("http://localhost:7000/api/admin/restaurants", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Email": user?.email || "",
          },
        }),
      ]);

      const usersData = await userRes.json();
      const restaurantData = await restaurantRes.json();

      setUsers(usersData);
      setRestaurants(restaurantData);
    } catch (err) {
      toast.error("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`http://localhost:7000/api/admin/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Email": user?.email || "",
        },
      });

      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
        toast.success("User deleted successfully.");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch {
      toast.error("Error deleting user.");
    }
  };

  const handleDeleteRestaurant = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this restaurant?");
    if (!confirm) return;

    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`http://localhost:7000/api/admin/restaurant/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-Email": user?.email || "",
        },
      });

      if (res.ok) {
        setRestaurants(restaurants.filter((r) => r._id !== id));
        toast.success("Restaurant deleted successfully.");
      } else {
        toast.error("Failed to delete restaurant.");
      }
    } catch {
      toast.error("Error deleting restaurant.");
    }
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setView("users")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Users
        </button>
        <button
          onClick={() => setView("restaurants")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          View Restaurants
        </button>
      </div>

      {loading && <p>Loading data...</p>}

      {view === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          <ul>
            {users.map((u) => (
              <li
                key={u._id}
                className="border p-3 mb-2 rounded flex justify-between items-center"
              >
                <span>
                  {u.name} ({u.email})
                </span>
                <button
                  onClick={() => handleDeleteUser(u._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === "restaurants" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
          <input
            type="text"
            placeholder="Search by city..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />
          {filteredRestaurants.map((r) => {
            const owner = users.find((u) => u._id === r.user);
            return (
              <div key={r._id} className="border p-4 mb-4 rounded">
                <h3 className="text-lg font-bold mb-1">{r.restaurantName}</h3>
                <p>
                  <strong>City:</strong> {r.city}
                </p>
                <p>
                  <strong>Country:</strong> {r.country}
                </p>
                <p>
                  <strong>Delivery Price:</strong> ₹{r.deliveryPrice}
                </p>
                <p>
                  <strong>Owner:</strong> {owner?.name || "Unknown"} ({owner?.email || "N/A"})
                </p>
                <button
                  onClick={() => handleDeleteRestaurant(r._id)}
                  className="bg-red-500 text-white mt-3 px-3 py-1 rounded"
                >
                  Delete Restaurant
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
