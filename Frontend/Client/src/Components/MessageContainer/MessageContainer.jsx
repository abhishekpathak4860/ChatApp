import userConversation from "../../Zustans/useConversation";
import { useAuth } from "../Context/AuthContext";
import { TiMessages } from "react-icons/ti";
import { IoArrowBackSharp, IoSend } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSocketContext } from "../Context/SocketContext";
import notify from "../../assets/sound/notification.mp3";

export default function MessageContainer({ onBackUser }) {
  const { socket } = useSocketContext();
  const {
    messages,
    setMessage,
    selectedConversation,
    setSelectedConversation,
  } = userConversation();
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState("");
  const lastMessageRef = useRef();

  useEffect(() => {
    socket?.on("newMessage", (newMessages) => {
      const sound = new Audio(notify);
      sound.play();
      setMessage([...messages, newMessages]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessage, messages]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const getmessage = await axios.get(
          `/api/message/${selectedConversation?._id}`
        );
        const data = await getmessage.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setMessage(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessage]);

  const handelMessages = (e) => {
    setSendData(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation?._id}`,
        { message: sendData }
      );
      const data = await res.data;

      if (data.success === false) {
        console.log(data.message);
      } else {
        setMessage([...messages, data]);
        setSendData("");
      }
    } catch (error) {
      console.log(error);
    }
    setSending(false);
  };

  return (
    <div className="md:min-w-[500px] h-full flex flex-col py-2">
      {selectedConversation === null ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center text-2xl text-gray-950 font-semibold flex flex-col items-center gap-2">
            <p className="text-2xl">Welcome!!👋 {authUser.username}😉</p>
            <p className="text-lg">Select a chat to start messaging</p>
            <TiMessages className="text-6xl text-center" />
          </div>
        </div>
      ) : (
        <>
          {/* Chat Header */}
          <div className="flex justify-between gap-1 bg-sky-600 md:px-2 rounded-lg h-10 md:h-12">
            <div className="flex gap-2 md:justify-between items-center w-full">
              <div className="md:hidden ml-1 self-center">
                <button
                  onClick={() => onBackUser(true)}
                  className="bg-amber-500 rounded-full px-2 py-1 self-center"
                >
                  <IoArrowBackSharp size={25} />
                </button>
              </div>
              <div className="flex justify-between mr-2 gap-2">
                <div className="self-center">
                  <img
                    className="rounded-full w-6 h-6 md:w-10 md:h-10 cursor-pointer"
                    src={selectedConversation?.profilepic}
                    alt="profile"
                  />
                </div>
                <span className="text-gray-950 self-center text-sm md:text-xl font-bold">
                  {selectedConversation?.username}
                </span>
              </div>
            </div>
          </div>

          {/* Message Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth">
            {loading && (
              <div className="flex w-full h-full flex-col items-center justify-center gap-4 bg-transparent">
                <div className="loading loading-spinner"></div>
              </div>
            )}
            {!loading && messages?.length === 0 && (
              <p className="text-center text-black items-center">
                Send a message to start Conversation
              </p>
            )}
            {!loading &&
              messages.length > 0 &&
              messages?.map((message, index) => {
                const isSender =
                  String(message.senderId) === String(authUser.id);
                return (
                  <div
                    className="text-white"
                    key={message?._id}
                    ref={lastMessageRef}
                  >
                    <div
                      key={index}
                      className={`w-full flex ${
                        isSender ? "justify-end" : "justify-start"
                      } mb-2`}
                    >
                      <div className="flex flex-col items-start">
                        <div
                          className={`max-w-[100%] px-4 py-2 rounded-lg text-white ${
                            isSender
                              ? "bg-blue-500 self-end"
                              : "bg-gray-300 text-black"
                          }`}
                        >
                          {message?.message}
                        </div>
                        <div
                          className={`text-[10px] opacity-70 mt-1  text-black ${
                            isSender ? "text-right" : "text-left"
                          }`}
                        >
                          {new Date(message?.createdAt).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <form
            onSubmit={handelSubmit}
            action=""
            className="rounded-full text-black"
          >
            <div className="w-full rounded-full flex items-center bg-white">
              <input
                value={sendData}
                onChange={handelMessages}
                required
                id="message"
                type="text"
                className="w-full bg-transparent outline-none px-4 rounded-full"
              />
              <button type="submit">
                {sending ? (
                  <div className=""></div>
                ) : (
                  <IoSend
                    size={25}
                    className="text-sky-700 cursor-pointer rounded-full bg-gray-800 w-10 h-auto p-1"
                  />
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
