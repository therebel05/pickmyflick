import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
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
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
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
      {user && (
        <div className="flex text-white p-2 items-center">
          <button
            className=" flex items-center gap-2 underline md:no-underline md:hover:bg-red-400 cursor-pointer mr-8 md:bg-red-700 md:py-2 md:px-4 rounded-lg"
            onClick={handleAIClick}
          >
            <Brain size={16} />
            {showAISearch ? "Home" : "AI Search"}
          </button>
          <div className="flex" onClick={() => showDropdown(!dropdown)}>
            <img
              className="w-8 rounded-md h-auto"
              src="https://occ-0-2610-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
              alt="user icon"
            />
            <ChevronDown />
          </div>

          {dropdown && (
            <button
              className="hover:underline cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
