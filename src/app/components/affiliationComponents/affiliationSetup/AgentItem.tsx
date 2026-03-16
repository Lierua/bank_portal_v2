"use client";

import type { SearchAgent } from "@/app/types/filial";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import FilterSavedSettings from "./FilterSavedSetting";

type Props = {
  agent: SearchAgent;
};

const AgentItem = ({ agent }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`transition-all duration-200 ease-in
        flex flex-col gap-4 overflow-hidden ${open ? "max-h-[700]" : "max-h-[45.5]"}`}
    >
      <div
        onClick={() => setOpen(!open)}
        className={`group
        cursor-pointer transition-all duration-200 ease-in
        border-b border-(--black)/20 max-w-[500px] px-2 py-2
        flex items-center justify-between
        hover:border-blue-100 hover:bg-blue-100
        `}
      >
        <p className="text-[20px]! text-(--black)/80!">{agent.name}</p>

        <div
          className=" cursor-pointer hover:text-red-500 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <IoCloseOutline className="text-[24px]" />
        </div>
      </div>
      <div className="span-2">
        <FilterSavedSettings agent={agent} />
      </div>
    </div>
  );
};

export default AgentItem;
