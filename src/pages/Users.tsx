import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router";
import Modal from "../components/modal/AddUserModal.tsx";
import ConfirmationModal from "../components/modal/ConfirmationModal.tsx";
interface RoleOption {
  id: number;
  name: string;
}

const roleOptions: RoleOption[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Manager" },
  { id: 3, name: "HR" },
  { id: 4, name: "Employee" },
];

interface Role {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  roles: Role[];
}

interface UsersResponse {
  success: boolean;
  count: number;
  users: User[];
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get<UsersResponse>("api/users");
      setUsers(response.data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const filteredUsers = users.filter((user) => {
    const query = searchTerm.trim().toLowerCase();

    const matchesSearch = [user.fullName, user.username, user.email].some(
      (value) => value.toLowerCase().includes(query),
    );
    const matchesRole =
      !selectedRoleId ||
      user.roles.some((role) => role.id === Number(selectedRoleId));

    return matchesSearch && matchesRole;
  });
  return (
    <div className="min-h-screen mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage system users and their roles.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <span className="mr-2">+</span>
          Add User
        </button>
      </div>
      <div className="flex flex-row max-w-7xl mx-auto sm:px-6 lg:px-6 gap-4 bg-white shadow rounded-lg  sm:p-6 xl:p-8 mb-4">
        <search className=" w-1/2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </search>

        <div>
          <label htmlFor="role" className="mb-1 block text-sm">
            Filter by Role
          </label>

          <select
            id="role"
            value={selectedRoleId}
            onChange={(event) => setSelectedRoleId(event.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">All roles</option>

            {roleOptions.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            setSearchTerm("");
            setSelectedRoleId("");
          }}
          className="max-w-7xl sm:px-6 py-2 w-auto bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Clear
        </button>
      </div>
      <div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 whitespace-nowrap">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 whitespace-nowrap">
                    Error: {error}
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 whitespace-nowrap">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/user/${user.id}`}
                        className="px-6 py-4 whitespace-nowrap text-blue-500 hover:text-blue-700"
                      >
                        {user.fullName || user.username}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.roles.map((role) => role.name).join(", ") ||
                        "No role"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-500 hover:text-blue-700">
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 ml-2"
                        onClick={() => setConfirmationModalOpen(true)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchUsers}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
      />
    </div>
  );
}
export default Users;
