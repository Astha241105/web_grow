import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  CreateAccountP,
  ForgotPassword,
  CreateAccountH,
} from "./components";
import OtpWithMail from "./components/otpwithmail/OWM.jsx";
import OtpWithPhone from "./components/otpwithphone/OWP.jsx";
import Changepass from "./components/changepass/CP.jsx";
import Areu from "./components/areu/Are.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/create-account-participant",
    element: <CreateAccountP />,
  },

  {
    path: "/create-account-host",
    element: <CreateAccountH />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otpWithMail",
    element: <OtpWithMail />,
  },
  {
    path: "/otpWithPhone",
    element: <OtpWithPhone />,
  },
  {
    path: "/changepass",
    element: <Changepass />,
  },
  {
    path: "/areu",
    element: <Areu />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
