import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, CreateAccount, ForgotPassword } from "./components";
import OtpWithMail from "./otpWithMail";
import OtpWithPhone from "./otpWithPhone";
import Changepass from "./changepass";
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
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
