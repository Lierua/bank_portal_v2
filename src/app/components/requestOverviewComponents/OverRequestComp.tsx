"use client";

import { useState } from "react";
import NavComponent from "../navComponents/NavComponent";
import RequestContent from "../RequestContent";

const OverRequestComponent = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="pt-[15] gap-[15] flex flex-col min-h-screen">
      <NavComponent search={search} setSearch={setSearch} />
      <RequestContent search={search} />
    </div>
  );
};

export default OverRequestComponent;
