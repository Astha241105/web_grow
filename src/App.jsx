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
import Nav from "./component-2/navhome/nav.jsx";
import Des from "./component-2/description/description.jsx";
import Browsebycategory from "./component-2/browsebycategory/browsebycategory.jsx";
import Backgroundhome from "./component-2/background/backgroundhome.jsx";
import HostOtpVerification from "./components/CreateAccountH/otpforhost.jsx";
import BackgroundEvent from "./events-page/background-event.jsx";
import Eventname from "./events-page/event-name/eventname.jsx";
import Details from "./events-page/details/details.jsx";
import ParticipantDetails from "./events-page/participant-details/participantDetails.jsx";
import NavEvent from "./events-page/nav-event/navEvent.jsx";
import Regi from "./registration-event-part/regi.jsx";
import Navregister from "./registration-event-part/nav-register/nav-register.jsx";
import Stages from "./events-page/details/stages/stages.jsx";
import Dates from "./events-page/details/Dates/dates.jsx";
import Organizer from "./events-page/details/organizers/organizer.jsx";
import EventDetails from "./events-page/details/event-details/event-details.jsx";
import Upcoming from "./component-2/upcoming-events/upcoming.jsx";
import Eventlist from "./component-2/diff-events/eventlist.jsx";
import Eventcard from "./component-2/eventcard/eventcard.jsx";
import Hostnow from "./component-2/hostAnOpportunity/hostnow.jsx";
import Reviews from "./component-2/reviews/reviews.jsx";
import Footer from "./component-2/footer/footer.jsx";
import Navpart from "./component-2/nav-participant/navpart.jsx";
import Partprofile from "./participant-profile/partprofile.jsx";
import Edit from "./participant-profile/edit-profile/edit.jsx";
import Certificate from "./participant-profile/certificate/certificate.jsx";
import Teampage from "./registration-event-part/teampage/teampage.jsx";
import Creatingteam from "./registration-event-part/creatingteam/creatingteam.jsx";
import "./index.css";
import {
  CreateEvents,
  Create_Events,
  HHomeScreen,
  TeamManagement,
} from "./Pages";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/part-profile",
    element: (
      <>
        <Partprofile />
        <Edit />
        <Certificate />
      </>
    ),
  },
  {
    path: "/create-account-participant",
    element: <CreateAccountP />,
  },
  {
    path: "/team",
    element: <Teampage />,
  },
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <Backgroundhome>
        <Nav />
        <Des />
        <Down />
        <Browsebycategory />
        <Upcoming />
        <Eventlist />
        <Eventcard />
        <Hostnow />
        <Reviews />
        <Footer />
      </Backgroundhome>
      // </ProtectedRoute>
    ),
  },
  {
    path: "/event",
    element: (
      <BackgroundEvent>
        <div id="event-and-part">
          <div id="event-and-nav">
            <Eventname />
            <NavEvent />
          </div>
          <ParticipantDetails />
        </div>
        <Details>
          <Stages />
          <Dates />
          <EventDetails />
          <Organizer />
        </Details>
      </BackgroundEvent>
    ),
  },
  {
    path: "/regifore",
    element: (<> <Navregister />
              <Regi />
             </>
    ),
  },
  {
    path: "/regiteam",
    element: (<> <Navregister />
              <Teampage />
             </>
    ),
  },
  {
    path: "/create-or-join",
    element: (<> <Navregister />
              <Creatingteam />
             </>
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
    path: "/otp-host",
    element: <HostOtpVerification />,
  },

  {
    path: "/Create-Events",
    element: <CreateEvents />,
  },

  {
    path: "/create-event1",
    element: <Create_Events />,
  },
  {
    path: "/home-host",
    element: <HHomeScreen />,
  },

  {
    path: "/host-manage",
    element: <TeamManagement />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
