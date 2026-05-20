import React from "react";
import AISearch from "./AISearch";
import AIResults from "./AIResults";
import { useSelector } from "react-redux";
import { options } from "../utils/constants";

const AIBrowse = () => {
  return (
    <div className="relative z-30 overflow-hidden bg-black bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.18),transparent_30%),linear-gradient(180deg,_#000_0%,_#050505_100%)] pt-28 md:pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">
              AI Movie Search
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Discover your next watch with smart AI recommendations
            </h1>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-300">
              Tell Gemini what kind of movie mood you’re in and get curated film
              suggestions instantly.
            </p>
          </div>
          <div className="mt-8">
            <AISearch />
          </div>
        </div>
        <AIResults />
      </div>
    </div>
  );
};

export default AIBrowse;
