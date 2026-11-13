import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../services/userService.ts";
import type { User } from "../types/user";

function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const allPermissions = user?.roles.flatMap((role) => role.permissions??[]) ?? [];

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await getUser(id);
        setUser(response);
        console.log(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>single user information</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">User Details</h2>
      <div className="mt-4 space-y-2">
        <p>Username: {user.username}</p>
        <p>Full Name: {user.fullName}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Assigned Roles</h3>
        <ul>
          {user.roles.map((role) => (
            <li key={role.id}>{role.name}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="font-semibold">Permissions</h3>
        <ul>
          {allPermissions.map((permission, index) => (
            <li key={`${permission.name}-${index}`}>{permission.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDetails;
