import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import HomePage from "../pages/Home";
import ProtectRoute from "./ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <HomePage />
      </ProtectRoute>
    ),
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
