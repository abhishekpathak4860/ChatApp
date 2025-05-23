import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import API from "../axiosConfig";

export default function Register() {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullName: "",
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = registerData;
      const res = await API.post("/api/auth/register", dataToSend);
      const data = res.data;

      if (data.success === false) {
        toast.error(data.message);
      }

      toast.success(data.message, { autoClose: 1000 });
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Registration failed.", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        background:
          "linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)",
      }}
    >
      <div className="flex flex-col max-w-[350px] w-full md:max-w-[450px] mx-auto bg-white p-4 rounded-md shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-4">
          Create an Account
        </h1>
        <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-600 font-semibold">Name</label>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="border border-gray-300 w-full p-2 rounded"
              onChange={(e) =>
                setRegisterData({ ...registerData, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-gray-600 font-semibold">Username</label>
            <input
              type="text"
              placeholder="Username"
              required
              autoComplete="new-password"
              className="border border-gray-300 w-full p-2 rounded"
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              className="border border-gray-300 w-full p-2 rounded"
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-gray-600 font-semibold">Gender</label>
            <select
              required
              className="border border-gray-300 w-full p-2 rounded"
              onChange={(e) =>
                setRegisterData({ ...registerData, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-gray-600 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              autoComplete="new-password"
              className="border border-gray-300 w-full p-2 rounded"
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-gray-600 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              autoComplete="new-password"
              className="border border-gray-300 w-full p-2 rounded"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-[rgba(246,179,172,0.74)] py-2 rounded hover:bg-green-600 mt-2"
            style={{
              background:
                "linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="flex items-center justify-center mt-3 gap-1">
          <p className="text-gray-400 text-sm">Already have an account?</p>
          <Link to={"/login"} className="text-[rgba(246,179,172,0.74)] text-sm">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
