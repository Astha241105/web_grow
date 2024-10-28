import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OtpWithMail from './otpWithMail.jsx';
import OtpWithPhone from './otpWithphone.jsx'; // Make sure this name is correct
import Changepass from './changepass.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <OtpWithMail />
  },
  {
    path: "/otpWithPhone",
    element: <OtpWithPhone />
  },
  {
    path: "/changepass",
    element: <Changepass />
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
