import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleShowAISearch } from "../utils/aiSlice";
import { Brain, ChevronDown } from "lucide-react";
import logo from "../assets/logocine2.png";

const Header = () => {
  const [dropdown, showDropdown] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showAISearch = useSelector((store) => store.ai.showAISearch);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/");
      } else {
        // User is signed out
        dispatch(removeUser());
        // navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const handleAIClick = () => {
    dispatch(toggleShowAISearch());
  };

  return (
    <div className="absolute z-20 bg-black w-full shadow-2xl drop-shadow-amber-300 flex justify-between items-center cursor-pointer">
      <img
        className="w-48 h-auto p-3"
        src={logo}
        alt="pickmyflick logo"
        onClick={() => navigate("/")}
      />
      <div className="flex text-white p-2 items-center">
        <button
          className=" flex items-center gap-2 underline md:no-underline md:hover:bg-red-400 cursor-pointer mr-8 md:bg-red-700 md:py-2 md:px-4 rounded-lg"
          onClick={handleAIClick}
        >
          <Brain size={16} />
          {showAISearch ? "Home" : "AI Search"}
        </button>
        <div className="relative">
          {" "}
          {/* Parent container to anchor the dropdown */}
          {/* The Trigger */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => showDropdown(!dropdown)}
          >
            <img
              className="w-8 h-8 rounded-md"
              src="https://occ-0-2610-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
              alt="user icon"
            />
            <span className="text-white ml-1 text-xs">▼</span>{" "}
            {/* Optional indicator */}
          </div>
          {/* The Dropdown Menu */}
          {dropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded-lg shadow-lg py-2 z-50">
              {user ? (
                <div
                  className="px-4 py-2 text-sm text-white hover:underline cursor-pointer"
                  onClick={handleSignOut}
                >
                  Logout
                </div>
              ) : (
                <div
                  className="px-4 py-2 text-sm text-white hover:underline cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </div>
              )}
              {user && (
                <div
                  className="px-4 py-2 text-sm text-white hover:underline cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
