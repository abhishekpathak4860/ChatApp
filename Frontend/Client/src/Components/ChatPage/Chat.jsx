import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import MessageContainer from "../MessageContainer/MessageContainer";
import { Link } from "react-router-dom";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };

  const handleShowSidebar = () => {
    setIsSidebarVisible(true);
    setSelectedUser(null);
  };

  return (
    <>
      <div
        className="flex justify-between min-w-full md:min-w-[550px] md:max-w-[65%]
      px-2 h-full md:h-full rounded-xl shadow-lg  bg-clip-padding
      backdrop-filter backdrop-blur-lg bg-opacity-0"
        style={{
          background:
            "linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)",
        }}
      >
        <div
          className={`w-full py-2 ${
            isSidebarVisible ? "block" : "hidden"
          } md:flex`}
        >
          <Sidebar onSelectUser={handleUserSelect} />
        </div>

        {isSidebarVisible && selectedUser && (
          <div className="divider divider-horizontal px-3 hidden md:flex" />
        )}

        <div
          className={`flex-auto ${
            selectedUser ? "block" : "hidden md:flex"
          } bg-gray-200`}
        >
          <MessageContainer onBackUser={handleShowSidebar} />
        </div>
      </div>
      {/* <Link to={"/video"}>Video</Link> */}
    </>
  );
}
