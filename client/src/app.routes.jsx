import { createBrowserRouter } from "react-router";
import Layout from "./layout/Layout";
import Home from "./components/Home";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Reports from "./features/interview/pages/Reports";
import CreateReport from "./features/interview/pages/CreateReport";
import InterviewReport from "./features/interview/pages/InterviewReport";
import Protected from "./components/Protected";


export const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/reports",
        element: (
          <Protected>
            <Reports />
          </Protected>
        ),
      },

      {
        path: "/create-report",
        element: (
          <Protected>
            <CreateReport />
          </Protected>
        ),
      },

      {
        path: "/interview/:interviewId",
        element: (
          <Protected>
            <InterviewReport />
          </Protected>
        ),
      },
    ],
  },
]);
