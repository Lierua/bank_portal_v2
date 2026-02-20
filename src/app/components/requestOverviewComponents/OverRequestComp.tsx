"use client";

import { useState } from "react";
import NavComponent from "../utilityComponents/navComponent";
import RequestContent from "../RequestContent";

const OverRequestComponent = () => {
  const [search, setSearch] = useState(""); // ✅ moved inside

  return (
    <div className="pt-[15px] gap-[15px] flex flex-col min-h-screen">
      <NavComponent search={search} setSearch={setSearch} />
      <RequestContent search={search} />
    </div>
  );
};

export default OverRequestComponent;
