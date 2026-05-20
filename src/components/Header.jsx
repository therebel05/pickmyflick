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
    <div className="fixed top-0 left-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h2
          className="text-2xl font-bold tracking-tight text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-red-500">CINE</span>Sense
        </h2>
        <div className="flex items-center gap-3">
          {/* <button
            className="hidden items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-4 py-2 text-sm font-medium text-red-100 transition hover:border-red-400 hover:bg-red-600/20 md:flex"
            onClick={handleAIClick}
          >
            <Brain size={16} />
            {showAISearch ? "Home" : "AI Search"}
          </button> */}
          <div className="relative">
            {/* <div
              className="flex cursor-pointer items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10"
              onClick={() => showDropdown(!dropdown)}
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://occ-0-2610-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
                alt="user icon"
              />
              <span className="ml-2 text-sm text-slate-200">Profile</span>
            </div> */}
            {/* {dropdown && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-2xl border border-white/10 bg-black/95 p-2 shadow-xl">
                {user ? (
                  <div
                    className="rounded-xl px-4 py-2 text-sm text-white hover:bg-white/5 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Logout
                  </div>
                ) : (
                  <div
                    className="rounded-xl px-4 py-2 text-sm text-white hover:bg-white/5 cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </div>
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
