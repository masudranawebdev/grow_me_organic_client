import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import HomePage from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
