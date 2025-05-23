import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import userConversation from "../../Zustans/useConversation";
import API from "../axiosConfig";

export default function Sidebar({ onSelectUser }) {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [getSearchUser, setGetSearchUser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const { messages, selectedConversation, setSelectedConversation } =
    userConversation();

  // show user with whom you chatted
  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatters = await API.get("/api/user/currentusers", {
          withCredentials: true,
        });
        const data = chatters.data;
        if (data.success === false) {
          console.log(data.message);
        } else {
          setChatUser(data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    chatUserHandler();
  }, []);

  // show users from the search result
  const handleUserSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const search = await API.get(`/api/user/search?search=${searchInput}`, {
        withCredentials: true,
      });
      const data = search.data;
      if (data.success === false) {
        console.log(data.message);
      } else if (data.length === 0) {
        toast.info("User Not Found");
      } else {
        setGetSearchUser(data);
        setSelectedConversation(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  // show which user is selected
  const handleUserClick = (user) => {
    setSelectedUserId(user._id);
    setSelectedConversation(user); // for desktop view
    onSelectUser(user); // for responsiveness
  };
  // back from search result
  const handSearchback = () => {
    setGetSearchUser([]);
    setSearchInput("");
  };

  // logout
  const handelLogOut = async () => {
    const confirmLogout = window.prompt("Type 'UserName' To Logout");
    if (confirmLogout === authUser.username) {
      try {
        const logout = await API.post("/api/auth/logout");
        const data = logout.data;
        if (data.success === false) {
          console.log(data.message);
        }
        toast.info(data.message, { autoClose: 1000 });
        localStorage.removeItem("chatapp");
        setAuthUser(null);
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.info("Logout Cancel");
    }
  };
  return (
    <div className=" w-auto px-1">
      <div className="flex justify-between gap-2">
        <form
          onSubmit={handleUserSearch}
          className="w-full flex items-center justify-between bg-white rounded-full"
        >
          <input
            type="text"
            className="px-4 w-full bg-transparent outline-none rounded-full"
            placeholder="Search user"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className=" rounded-full bg-sky-700 hover:bg-gray-950 text-white p-2">
            <FaSearch />
          </button>
        </form>
        <img
          onClick={() => navigate(`/profile/${authUser?.id}`)}
          src={authUser?.profilepic}
          alt="profile"
          className="self-center h-12 w-12 hover:scale-110 cursor-pointer rounded-full object-cover"
        />
      </div>

      <div className="divider px-3"></div>

      {getSearchUser?.length > 0 ? (
        <>
          {getSearchUser.map((user) => (
            <div key={user._id}>
              <div
                onClick={() => handleUserClick(user)}
                className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${
                  selectedUserId === user?._id ? "bg-sky-500" : ""
                }`}
              >
                <img
                  src={user.profilepic}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-medium">{user.username}</span>
              </div>
              <hr className="border-gray-300" />
            </div>
          ))}
          <div className="mt-auto px-1 py-1 flex">
            <button
              onClick={handSearchback}
              className="bg-amber-600 rounded-full px-2 py-1 self-center"
            >
              <IoArrowBackSharp />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-[70%] max-h-[80%] overflow-y-auto scrollbar">
            <div className="w-auto">
              {chatUser.length === 0 ? (
                <div className="font-bold flex flex-col items-center text-xl text-yellow-500">
                  <h1>Search user to chat</h1>
                </div>
              ) : (
                <div>
                  {chatUser.map((user) => (
                    <div key={user._id}>
                      <div
                        onClick={() => handleUserClick(user)}
                        className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${
                          selectedUserId === user?._id ? "bg-sky-500" : ""
                        }`}
                      >
                        <img
                          src={
                            user.profilepic || "https://via.placeholder.com/40"
                          }
                          alt="profile"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-white">
                          {user.username}
                        </span>
                      </div>
                      <hr className="border-gray-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <div className="absolute bottom-4 left-1 flex flex-col items-center space-y-3 z-50">
        {/* Video Call Button */}
        <Link
          to="/video"
          className="rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out flex items-center justify-center"
          style={{
            backgroundColor: "rgb(224, 143, 134)",
            width: "64px",
            height: "64px",
          }}
          title="Start a Video Call"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
            />
          </svg>
        </Link>

        {/* Video Call Text */}
        <p className="text-xs text-center text-[#e08f86] font-semibold max-w-[150px] leading-tight">
          Get connected with our best advisor directly on video call
        </p>

        {/* Logout Button */}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={handelLogOut}
            className="hover:bg-red-600 p-2 rounded-full hover:text-white transition-colors"
          >
            <BiLogOut size={24} style={{ color: "rgb(245, 101, 101)" }} />
          </button>
          <p
            className="text-sm font-medium"
            style={{ color: "rgb(245, 101, 101)" }}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}
