import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./components/store/store.js";
import {
  Login,
  CreateAccountP,
  ForgotPassword,
  CreateAccountH,
  Org_Des,
  CreatePass,
  CreatePassP,
  Home,
  Otp,
} from "./components";
import OtpWithMail from "./components/otpwithmail/OWM.jsx";
import Changepass from "./components/changepass/CP.jsx";
import Down from "./components/down/down.jsx";
import Areu from "./components/areu/Are.jsx";
import Nav from "./components/navhome/nav.jsx"
import Des from "./components/description/description.jsx"
import Browsebycategory from "./components/browsebycategory/browsebycategory.jsx";
import Backgroundhome from "./components/background/backgroundhome.jsx";
import HostOtpVerification from './components/CreateAccountH/otpforhost.jsx';
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

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
    path: "/home",
    element: (
      // <ProtectedRoute>
        <Backgroundhome>
        <Nav />
        <Des />
        <Down />
        <Browsebycategory />
      </Backgroundhome>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/create-account-host",
    element: <CreateAccountH />,
  },
  {
    path: "/create-pass-host",
    element: <CreatePass />,
  },
  {
    path: "/create-pass-participant",
    element: <CreatePassP />,
  },
  {
    path: "/create-account-host-options",
    element: <Org_Des />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp-forgot-password",
    element: <Otp />,
  },
  {
    path: "/otpWithMail",
    element: <OtpWithMail />,
  },
  {
    path: "/change-password",
    element: <Changepass />,
  },
  {
    path: "/areu",
    element: <Areu />,
  },
  {
    path:"/otp-host",
    element:<HostOtpVerification />
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;