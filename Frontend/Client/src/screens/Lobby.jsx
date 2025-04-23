import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVideoSocket } from "../context/SocketProvider";
import { useAuth } from "../Components/Context/AuthContext";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const { authUser } = useAuth();

  const socket = useVideoSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (authUser.email != email) {
        return alert("Oops email did not match");
      }
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div
      className="min-h-screen flex items-center justify-center  px-4"
      style={{
        background: `linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)`,
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Join a Video Room
        </h1>
        <form onSubmit={handleSubmitForm} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email ID
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="room"
              className="block text-gray-700 font-medium mb-2"
            >
              Room Number
            </label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. room123"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full  text-white py-2 rounded-md  transition duration-300 font-semibold cursor-pointer"
            style={{ backgroundColor: "rgb(224, 143, 134)" }}
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
