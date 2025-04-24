import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch("http://localhost:7000/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Email": user?.email || "",
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized or forbidden access");
        }

        const data = await res.json();
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [getAccessTokenSilently, user]);

  if (loading) return <div className="p-4">Loading admin dashboard...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <pre>{JSON.stringify(adminData, null, 2)}</pre>
    </div>
  );
};

export default AdminPage;
