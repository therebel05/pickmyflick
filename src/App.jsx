import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import Browse from "./components/Browse";
import Profile from "./components/Profile";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Browse />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
