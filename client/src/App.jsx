import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";
const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
         <ToastContainer
          position="top-right"
          autoClose={2500}
          theme="dark"
          closeOnClick
        />
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;
