import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import OtpWithMail from "./otpWithMail.jsx";
import OtpWithPhone from "./otpWithphone.jsx";
import Changepass from "./changepass.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
