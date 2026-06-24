import { createBrowserRouter } from "react-router";
import Layout from "./Layout/layout";
import Home from "./components/Home";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Reports from "./features/interview/pages/Reports";
import CreateReport from "./features/interview/pages/CreateReport";
import InterviewReport from "./features/interview/pages/InterviewReport";
import Protected from "./components/Protected";
import MockInterviewPage from "./features/mock_Interview/pages/mock_interview_page"
import MockInterviewHistory from "./features/mock_Interview/pages/mock_interview_history"
import MockInterviewReport from "./features/mock_Interview/pages/mock_interview_report"
import Pricing from "./features/mock_Interview/components/Pricing"

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
      {
        path: "/mock-interview",
        element: (
          <Protected>
            <MockInterviewPage />
          </Protected>
        )
      },
      {
        path: "/mock-interview-history",
        element: (
          <Protected>
            <MockInterviewHistory />
          </Protected>
        )
      },
      {
        path: "/mock-interview-report/:id",
        element: (
          <Protected> 
            <MockInterviewReport />
          </Protected>
        )
      },
      {
        path: "/pricing",
        element: (
          <Protected>
            <Pricing />
          </Protected>
        )
      }
    ],
  },
]);
