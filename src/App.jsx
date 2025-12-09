import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import Browse from "./components/Browse";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
