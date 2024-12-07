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
  Otp,
} from "./components";
import OtpWithMail from "./components/otpwithmail/OWM.jsx";
import Changepass from "./components/changepass/CP.jsx";
import Areu from "./components/areu/Are.jsx";
import Nav from "./component-2/navhome/nav.jsx";
import Backgroundhome from "./component-2/background/backgroundhome.jsx";
import HostOtpVerification from "./components/CreateAccountH/otpforhost.jsx";
import BackgroundEvent from "./events-page/background-event.jsx";
import Regi from "./registration-event-part/regi.jsx";
import Navregister from "./registration-event-part/nav-register/nav-register.jsx";
import ResponsiveNav2 from "./component-2/condnavpart/contnavpart.jsx";
import Creatingteam from "./registration-event-part/creatingteam/creatingteam.jsx";
import Partprofile from "./participant-profile/partprofile.jsx";
import Teampage from "./registration-event-part/teampage/teampage.jsx";
import Filter from "./browse-by-category/filter/filter.jsx";
import Quiz from "./quiz/quiz.jsx";
import Badges from "./participant-profile/badges/badges.jsx";
import Watchlist from "./participant-profile/watchlist/watchlist.jsx";
import Edit from "./participant-profile/edit-profile/edit.jsx";
import Leaderboard from "./quiz/leaderboard/leaderboard.jsx";
import NavbarSwitcher from "./component-2/navswitch.jsx";
import Pastevents from "./participant-profile/pastevents/past.jsx";
import Registered1 from "./participant-profile/pastevents/register1.jsx";
import "./index.css";
import "./App.css";
import {
  CreateEvents,
  Create_Events,
  HHomeScreen,
  TeamManagement,
  Event_Manage,
  QuizCreator,
  HostProfile,
  EventDetail,
  Update_event,
  Update_Event_1,
  Room_allocate,
  View_participants,
  NotificationsPage,
} from "./Pages";
import Registered from "./participant-profile/registered/registered.jsx";
import Notification2 from "./component-2/notification/notification2.jsx";

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
    path: "/leader",
    element: (
      <div>
        <ResponsiveNav2 />
        <Leaderboard />
      </div>
    ),
  },
  {
    path: "/part-profile",
    element: (
      <div id="part-profile-container">
        <ResponsiveNav2 bgColor="#D4E5E4" />
        <Partprofile />
      </div>
    ),
  },
  {
    path: "/registration2",
    element: (
      <div id="part-profile-container">
        <ResponsiveNav2 bgColor="#D4E5E4" />
        <Registered />
      </div>
    ),
  },
  {
    path: "/watchlist",
    element: (
      <div id="part-profile-container">
        <ResponsiveNav2 bgColor="#D4E5E4" />
        <Watchlist />
      </div>
    ),
  },
  {
    path: "/notification2",
    element: (
      <div id="part-profile-container">
        <ResponsiveNav2 bgColor="#D4E5E4" />
        <Notification2 />
      </div>
    ),
  },
  {
    path: "/coins",
    element: (
      <div id="part-profile-container">
        <ResponsiveNav2 bgColor="#D4E5E4" />
        <Badges />
      </div>
    ),
  },
  {
    path: "/edit",
    element: (
      <div id="part-profile-container">
        <ResponsiveNav2 bgColor="#D4E5E4" />
        <Edit />
      </div>
    ),
  },
  

  {
    path: "/create-account-participant",
    element: <CreateAccountP />,
  },
  {
    path: "/team",
    element: (
              <>
              <Navregister></Navregister>
              <Teampage /></>),
  },
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <Backgroundhome>
      </Backgroundhome>

      // </ProtectedRoute>
    ),
  },
  {
    path: "/event",
    element: (
      <div>
          <NavbarSwitcher bgColor="#D4E5E4"/>
        <BackgroundEvent />
      </div>
    ),
  },
  {
    path: "/regifore",
    element: (
      <>
        {" "}
        <Navregister />
        <Regi />
      </>
    ),
  },
  {
    path: "/regiteam",
    element: (
      <>
        {" "}
        <Navregister />
        <Creatingteam />
      </>
    ),
  },
  {
    path: "/event-type",
    element: (
      <>
        <div className="event-type-page">
        <NavbarSwitcher bgColor="#ffffff"/>
          <Filter />
        </div>
      </>
    ),
  },
  {
    path: "/create-or-join",
    element: (
      <>
        {" "}
        <Navregister />
        <Creatingteam />
      </>
    ),
  },
  {
    path: "/quiz",
    element: (
      <>
        {" "}
        <Navregister />
        <Quiz />
      </>
    ),
  },
  {
    path: "/create-account-host",
    element: <CreateAccountH />,
  },

  {
    path: "/past",
    element: (
      <>
        <ResponsiveNav2 bgColor="white" />
        <Pastevents />
      </>
    ),
  },
  
  {
    path: "/registered-events",
    element: (
      <>
      <ResponsiveNav2 bgColor="white" />
      <Registered1 /></>
    )
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
  {
    path: "/event-manage",
    element: <Event_Manage />,
  },
  {
    path: "/create-quiz",
    element: <QuizCreator />,
  },

  {
    path: "/host-profile",
    element: <HostProfile />,
  },

  {
    path: "/event-detail",
    element: <EventDetail />,
  },

  {
    path: "/update-event",
    element: <Update_event />,
  },
  {
    path: "/update-event_1",
    element: <Update_Event_1 />,
  },
  {
    path: "/room-allocate",
    element: <Room_allocate />,
  },
  {
    path: "/view-participants",
    element: <View_participants />,
  },
  { path: "/notifications", element: <NotificationsPage /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
