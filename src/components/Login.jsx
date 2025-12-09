import React, { useState } from "react";
import Header from "./Header";
import { validateCredentials } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  //this only works if framework supports Server Actions or Data APIs
  // <form action={handleSubmit}>
  // const handleSubmit = (formData) => {
  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   const result = validateCredentials(email, password);
  //   setErrorMessage(result);

  //   console.log(result);
  // };

  //for Plain React App (CRA, Vite, Parcel, Webpack, etc.)
  // <form onSubmit={handleSubmit}>
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const result = validateCredentials(email, password);
    setErrorMessage(result);

    if (result) return;

    if (!showLogin) {
      //sign up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} : ${errorMessage}`);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} : ${errorMessage}`);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/30c8b9f4-3db9-4b3b-a1ee-8fa56531b712/web/IN-en-20251201-TRIFECTA-perspective_c7623e8e-c406-43d2-9d9a-0140ce19ac84_medium.jpg"
          alt=""
        />
      </div>
      <form
        className="absolute w-1/2 max-w-md mx-auto my-48 p-14 right-0 left-0 bg-black text-white opacity-85 rounded-lg shadow-lg shadow-red-500"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6 text-red-600">
          {showLogin ? "Sign In" : "Sign Up"}
        </h1>
        {!showLogin && (
          <input
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
        )}

        <input
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          type="text"
          name="email"
          placeholder="Email Address"
        />
        <input
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          type="password"
          name="password"
          placeholder="Password"
        />
        <p className="text-red-700 text-md">{errorMessage}</p>
        <button className="text-white text-xl bg-red-600 my-4 p-3 w-full rounded-lg cursor-pointer">
          {showLogin ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-4">
          {showLogin ? "New to Netflix?" : "Already a member?"}

          <span
            className="font-bold hover:underline cursor-pointer"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? "Sign up now!" : "Sign In now!"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
