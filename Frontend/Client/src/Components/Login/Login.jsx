import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import API from "../axiosConfig";

export default function Login() {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const login = await API.post("/auth/login", loginData);
      const data = login.data;
      if (data.success === false) {
        setLoading(false);
      }
      toast.success(data.message, { autoClose: 1000 });
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);

      console.log(data);

      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, { autoClose: 1000 });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-100"
      style={{
        background:
          "linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)",
      }}
    >
      <div className="flex flex-col max-w-[350px] w-[100%] mx-auto  bg-white p-6 rounded-md shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-6">Sign In</h1>
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-gray-600 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              required
              autoComplete="new-password"
              className="border border-gray-300 w-full p-2 rounded mt-1"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-600 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              autoComplete="new-password"
              className="border border-gray-300 w-full p-2 rounded mt-1"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="text-[rgba(246,179,172,0.74)]  py-2 rounded hover:bg-blue-600"
            style={{
              background:
                "linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)",
            }}
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center mt-4 gap-1">
          <p className="text-gray-400">Don't have an account?</p>
          <Link to={"/register"} className="text-[rgba(246,179,172,0.74)]">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
