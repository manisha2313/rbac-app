import { useState, useEffect } from "react";
import type { CreateUserPayload } from "../../types/user.ts";
import { createUser } from "../../services/userService.ts";
import axios from "axios";

interface RoleOption {
  id: number;
  name: string;
}
interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const roleOptions: RoleOption[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Manager" },
  { id: 3, name: "HR" },
  { id: 4, name: "Employee" },
];

function Modal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
  const [formData, setFormData] = useState<CreateUserPayload>({
    username: "",
    email: "",
    fullName: "",
    password: "",
    roleIds: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      roleIds: selectedRoleId ? [Number(selectedRoleId)] : [],
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await api.post("api/users", formData);
  //     onClose();
  //   } catch (error) {
  //     console.error("Failed to add user", error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await createUser(formData);

      if (response.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.message || "Failed to create user");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        const backendMessage = error.response?.data?.message;
        setError(backendMessage || "Unable to connect to the server");
      } else {
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        username: "",
        email: "",
        fullName: "",
        password: "",
        roleIds: [],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-user-title"
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="add-user-title" className="text-lg font-bold">
            Add User
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm">
              Full name
            </label>
            <input
              id="fullName"
              className="w-full rounded-lg border px-3 py-2"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="mb-1 block text-sm">
              Username
            </label>
            <input
              id="username"
              className="w-full rounded-lg border px-3 py-2"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border px-3 py-2"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-lg border px-3 py-2"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm">
              Assign Role
            </label>

            <select
              id="role"
              value={formData.roleIds[0] ?? ""}
              onChange={handleRoleChange}
              required
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Select a role</option>

              {roleOptions.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Add User"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
export default Modal;
