import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/userSlice";
import Browse from "./components/Browse";

function App() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
  }, []);

  return <RouterProvider router={appRouter} />;
}

export default App;
