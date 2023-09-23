import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Messenger from "../components/Messenger";
import Register from "../components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Messenger />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
