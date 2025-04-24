// import React, { useEffect, useCallback, useState } from "react";
// import ReactPlayer from "react-player";
// import peer from "../service/peer";
// import { useVideoSocket } from "../context/SocketProvider";
// import { Link } from "react-router-dom";
// import { useAuth } from "../Components/Context/AuthContext";

// const RoomPage = () => {
//   const socket = useVideoSocket();
//   const [remoteSocketId, setRemoteSocketId] = useState(null);
//   const [myStream, setMyStream] = useState();
//   const [remoteStream, setRemoteStream] = useState();
//   const { authUser } = useAuth();
//   const [remoteUsername, setRemoteUsername] = useState("");

//   const handleUserJoined = useCallback(({ email, id, username }) => {
//     console.log(`Email ${email} joined room`);
//     setRemoteSocketId(id);
//     setRemoteUsername(username);
//   }, []);

//   const handleCallUser = useCallback(async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     const offer = await peer.getOffer();
//     socket.emit("user:call", {
//       to: remoteSocketId,
//       offer,
//       senderUsername: authUser.username,
//     });
//     setMyStream(stream);
//   }, [remoteSocketId, socket, authUser]);

//   const handleIncommingCall = useCallback(
//     async ({ from, offer, senderUsername }) => {
//       setRemoteSocketId(from);
//       setRemoteUsername(senderUsername);
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });

//       setMyStream(stream);
//       console.log(`Incoming Call`, from, offer);
//       const ans = await peer.getAnswer(offer);
//       socket.emit("call:accepted", {
//         to: from,
//         ans,
//         receiverUsername: authUser.username,
//       });
//     },
//     [socket, authUser]
//   );

//   const sendStreams = useCallback(() => {
//     for (const track of myStream.getTracks()) {
//       peer.peer.addTrack(track, myStream);
//     }
//   }, [myStream]);

//   const handleCallAccepted = useCallback(
//     ({ from, ans, receiverUsername }) => {
//       peer.setLocalDescription(ans);
//       setRemoteUsername(receiverUsername);
//       console.log("Call Accepted!");
//       sendStreams();
//     },
//     [sendStreams]
//   );

//   const handleNegoNeeded = useCallback(async () => {
//     const offer = await peer.getOffer();
//     socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//   }, [remoteSocketId, socket]);

//   useEffect(() => {
//     peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//     return () => {
//       peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//     };
//   }, [handleNegoNeeded]);

//   const handleNegoNeedIncomming = useCallback(
//     async ({ from, offer }) => {
//       const ans = await peer.getAnswer(offer);
//       socket.emit("peer:nego:done", { to: from, ans });
//     },
//     [socket]
//   );

//   const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//     await peer.setLocalDescription(ans);
//   }, []);

//   useEffect(() => {
//     peer.peer.addEventListener("track", async (ev) => {
//       const remoteStream = ev.streams;
//       console.log("GOT TRACKS!!");
//       setRemoteStream(remoteStream[0]);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("user:joined", handleUserJoined);
//     socket.on("incomming:call", handleIncommingCall);
//     socket.on("call:accepted", handleCallAccepted);
//     socket.on("peer:nego:needed", handleNegoNeedIncomming);
//     socket.on("peer:nego:final", handleNegoNeedFinal);

//     return () => {
//       socket.off("user:joined", handleUserJoined);
//       socket.off("incomming:call", handleIncommingCall);
//       socket.off("call:accepted", handleCallAccepted);
//       socket.off("peer:nego:needed", handleNegoNeedIncomming);
//       socket.off("peer:nego:final", handleNegoNeedFinal);
//     };
//   }, [
//     socket,
//     handleUserJoined,
//     handleIncommingCall,
//     handleCallAccepted,
//     handleNegoNeedIncomming,
//     handleNegoNeedFinal,
//   ]);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{
//         background: `linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)`,
//       }}
//     >
//       <div className=" bg-opacity-10 backdrop-blur-md p-8 rounded-lg max-w-xl w-full shadow-md text-white">
//         <h1 className="text-3xl font-bold mb-4 text-center">Room</h1>
//         <h4 className="text-center mb-4 text-lg">
//           {remoteSocketId ? "User Connected" : "Waiting for other user..."}
//         </h4>

//         {remoteSocketId && (
//           <button
//             onClick={handleCallUser}
//             className="w-full py-2 text-white font-semibold rounded-md mb-4"
//             style={{
//               backgroundColor: "rgb(224, 143, 134)",
//             }}
//           >
//             Start Call
//           </button>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {myStream && (
//             <div>
//               <h2 className="text-center text-lg font-semibold mb-2">
//                 {authUser.username}
//               </h2>
//               <ReactPlayer
//                 playing
//                 muted={true}
//                 height="200px"
//                 width="100%"
//                 url={myStream}
//               />
//             </div>
//           )}

//           {remoteStream && (
//             <div>
//               <h2 className="text-center text-lg font-semibold mb-2 text-red-400">
//                 {remoteUsername}
//               </h2>
//               <ReactPlayer
//                 playing
//                 muted={false}
//                 height="200px"
//                 width="100%"
//                 url={remoteStream}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       <Link to={"/"}>End Call</Link>
//     </div>
//   );
// };

// export default RoomPage;
import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useVideoSocket } from "../context/SocketProvider";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";

const RoomPage = () => {
  const socket = useVideoSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const { authUser } = useAuth();
  const [remoteUsername, setRemoteUsername] = useState("");

  const handleUserJoined = useCallback(({ email, id, username }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
    setRemoteUsername(username);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", {
      to: remoteSocketId,
      offer,
      senderUsername: authUser.username,
    });
    setMyStream(stream);
  }, [remoteSocketId, socket, authUser]);

  const handleIncommingCall = useCallback(
    async ({ from, offer, senderUsername }) => {
      setRemoteSocketId(from);
      setRemoteUsername(senderUsername);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMyStream(stream);
      console.log(`Incoming Call, from ${from}, offer`, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", {
        to: from,
        ans,
        receiverUsername: authUser.username,
      });
    },
    [socket, authUser]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans, receiverUsername }) => {
      peer.setLocalDescription(ans);
      setRemoteUsername(receiverUsername);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  // End Call Handler
  const handleEndCall = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop()); // Stop camera and mic
    }
    if (remoteStream) {
      remoteStream.getTracks?.().forEach((track) => track.stop());
    }
    peer.peer.close(); // Close the peer connection
    socket.disconnect(); // Optional: disconnect socket (or just clean up listeners if you want to reuse)
    setMyStream(null);
    setRemoteStream(null);
    setRemoteSocketId(null);
    setRemoteUsername("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(45deg, #262140 25%, #2621400d), linear-gradient(to bottom, #2621400d, #262140b3)",
      }}
    >
      <div className="bg-opacity-10 backdrop-blur-md p-8 rounded-lg max-w-xl w-full shadow-md text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Room</h1>
        <h4 className="text-center mb-4 text-lg">
          {remoteSocketId ? "User Connected" : "Waiting for other user..."}
        </h4>

        {remoteSocketId && (
          <button
            onClick={handleCallUser}
            className="w-full py-2 text-white font-semibold rounded-md mb-4"
            style={{
              backgroundColor: "rgb(224, 143, 134)",
            }}
          >
            Start Call
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myStream && (
            <div>
              <h2 className="text-center text-lg font-semibold mb-2">
                {authUser.username}
              </h2>
              <ReactPlayer
                playing
                muted={true}
                height="200px"
                width="100%"
                url={myStream}
              />
            </div>
          )}

          {remoteStream && (
            <div>
              <h2 className="text-center text-lg font-semibold mb-2 text-red-400">
                {remoteUsername}
              </h2>
              <ReactPlayer
                playing
                muted={false}
                height="200px"
                width="100%"
                url={remoteStream}
              />
            </div>
          )}
        </div>

        {/* End Call Button */}
        {(myStream || remoteStream) && (
          <Link
            onClick={handleEndCall}
            className="w-[100%] mt-4 py-2 bg-red-500 text-white font-semibold rounded-md"
            to={"/"}
          >
            End Call
          </Link>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
