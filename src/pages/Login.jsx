import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await api.get(`/users?email=${formData.email}`);

    if (res.data.length === 0) {
      alert("User not found");
      return;
    }

    const user = res.data[0];

    if (user.password !== formData.password) {
      alert("Invalid Password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem("currentUser", JSON.stringify(user));

    navigate("/dashboard");
  } catch (err) {
    console.log(err);
    alert("Login Failed");
  }
};

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 bg-indigo-600 text-white flex-col justify-center items-center px-16">

        <h1 className="text-6xl font-extrabold mb-4">
          Notoria
        </h1>

        <p className="text-2xl font-light mb-6">
          Organize Smarter
        </p>

        <p className="text-center text-lg leading-8 max-w-md text-indigo-100">
          Capture ideas, organize notebooks, manage your daily work,
          and never lose an important note again.
        </p>

      </div>

      {/* Right Section */}

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-slate-100">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px]">

          <h2 className="text-4xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-semibold"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-8">

            Don't have an account?

            <Link
              to="/signup"
              className="text-indigo-600 font-semibold ml-2 hover:underline"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;