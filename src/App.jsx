import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import OtpWithMail from "./components/otpwithmail/OWM.jsx";
import OtpWithPhone from "./components/otpwithphone/OtpWithphone.jsx";
import Changepass from "./components/changepass/Changepass.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
import Areu from "./components/areu/Are.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
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
  },{
    path: "/areu",
    element:<Areu />
  }

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
