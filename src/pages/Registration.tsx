import { useState } from "react";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import AuthContext from "../context/AuthContext.tsx";
import authService from "../services/authService.ts";
function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !formData.username ||
      !formData.password ||
      !formData.email ||
      !formData.fullName
    ) {
      setError("Please fill in all fields");
      return false;
    }
    if (!emailRegex.test(formData.email.trim())) {
      setError("Email format is incorrect");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }
    if (formData.fullName.length < 3) {
      setError("Full Name must be at least 3 characters long");
      return false;
    }
    return true;
  };
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error(
      "AuthContext is undefined. Make sure you are using the AuthProvider.",
    );
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      await authService.register(
        formData.username,
        formData.password,
        formData.email,
        formData.fullName,
      );
      navigate("/login");
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      <main className="min-h-screen grid place-items-center bg-slate-100 p-4">
        <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <h1 className="text-2xl font-bold text-center text-slate-900">
            Registration Form
          </h1>
          <p className="mt-2 text-sm text-center text-slate-600">
            Sign up to your account
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                placeholder="Enter your username"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="relative mt-1">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                placeholder="Enter your Full Name"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="relative mt-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="Enter your Email"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="relative mt-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Enter your Password"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Registration;
