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
import Down from "./component-2/down/down.jsx";
import Areu from "./components/areu/Are.jsx";
import Nav from "./component-2/navhome/nav.jsx"
import Des from "./component-2/description/description.jsx"
import Browsebycategory from "./component-2/browsebycategory/browsebycategory.jsx";
import Backgroundhome from "./component-2/background/backgroundhome.jsx";
import HostOtpVerification from './components/CreateAccountH/otpforhost.jsx';
import BackgroundEvent from "./events-page/background-event.jsx";
import Eventname from "./events-page/event-name/eventname.jsx";
import Details from "./events-page/details/details.jsx";
import ParticipantDetails from "./events-page/participant-details/participantDetails.jsx";
import NavEvent from "./events-page/nav-event/navEvent.jsx";
import Regi from "./registration-event-part/regi.jsx";
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
    path: "/event",
    element: (<BackgroundEvent>
              <Eventname />
              <ParticipantDetails />
              <NavEvent />
              <Details />
              </BackgroundEvent>),
  },
  {
    path: "/regifore",
    element: <Regi />,
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