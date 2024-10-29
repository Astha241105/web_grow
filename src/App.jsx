import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import OtpWithMail from "./otpWithMail.jsx";
import OtpWithPhone from "./otpWithphone.jsx";
import Changepass from "./changepass.jsx";
import Areu from "./areu.jsx";

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
  },{
    path: "/areu",
    element:<Areu/>
  }

]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
