import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import { AuthContextProvider } from "./Components/Context/AuthContext.jsx";
import { VerifyUser } from "./Components/Utils/VerifyUser.jsx";
import Chat from "./Components/ChatPage/Chat.jsx";
import { SocketContextProvider } from "./Components/Context/SocketContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <VerifyUser />,
    children: [
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <SocketContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </SocketContextProvider>
  </AuthContextProvider>
);
