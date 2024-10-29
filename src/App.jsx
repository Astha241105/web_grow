import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import OtpWithMail from "./otpWithMail.jsx";
import OtpWithPhone from "./otpWithphone.jsx";
import Changepass from "./changepass.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
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
    element:<Areu/>
  }

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
