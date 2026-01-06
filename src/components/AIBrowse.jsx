import React from "react";
import AISearch from "./AISearch";
import AIResults from "./AIResults";
import { useSelector } from "react-redux";
import { options } from "../utils/constants";

const AIBrowse = () => {
  return (
    <div className="bg-black pt-[30%] md:pt-[15%]">
      <AISearch />
      <AIResults />
    </div>
  );
};

export default AIBrowse;
