"use client";

import type { SearchAgent } from "@/app/types/filial";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import FilterSavedSettings from "./FilterSavedSetting";

type Props = {
  agent: SearchAgent;
  onDelete: (id: number) => void;
  onUpdate: (agent: SearchAgent) => void;
};

const AgentItem = ({ agent, onDelete, onUpdate }: Props) => {
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState(agent.filters);

  function handleUpdate() {
    const updated: SearchAgent = {
      ...agent,
      filters,
    };

    onUpdate(updated);
    alert("Agent opdateret");
  }

  return (
    <div
      className={`transition-all duration-200 ease-in max-w-[500]
      flex flex-col gap-4 overflow-hidden ${
        open ? "max-h-[700]" : "max-h-[45.5]"
      }`}
    >
      <div
        onClick={() => setOpen(!open)}
        className={`group
        cursor-pointer transition-all duration-200 ease-in
        border-b border-(--black)/20 px-2 py-2
        flex items-center justify-between
        hover:border-blue-100 hover:bg-blue-100`}
      >
        <p className="text-[20px]! text-(--black)/80!">{agent.name}</p>

        <IoCloseOutline
          className="text-[24px] cursor-pointer hover:text-red-500 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();

            if (confirm("Vil du slette denne agent?")) {
              onDelete(agent.id);
            }
          }}
        />
      </div>

      <div className="span-2 flex flex-col gap-4">
        <FilterSavedSettings agent={agent} onChange={setFilters} />

        <button
          onClick={handleUpdate}
          className="px-4 py-2 rounded-md bg-(--contrast) text-white"
        >
          Opdater agent
        </button>
      </div>
    </div>
  );
};

export default AgentItem;
