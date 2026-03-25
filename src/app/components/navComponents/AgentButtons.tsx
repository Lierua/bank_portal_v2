"use client";

import { IoIosArrowDown } from "react-icons/io";
import type { SearchAgent } from "@/app/types/filial";

type Props = {
  agent: SearchAgent;

  activeAgent: SearchAgent | null;
  setActiveAgent: React.Dispatch<React.SetStateAction<SearchAgent | null>>;

  showExtraFilters: string;
  setShowExtraFilters: React.Dispatch<React.SetStateAction<string>>;
};

const AgentButtons = ({
  agent,
  activeAgent,
  setActiveAgent,
  showExtraFilters,
  setShowExtraFilters,
}: Props) => {
  const isActive = activeAgent?.id === agent.id;

  return (
    <div
      className={`cursor-pointer flex items-center border-2 border-(--contrast) pr-4 rounded-full
        transition-all duration-100 ease-in ${isActive && "bg-(--contrast)"}`}
    >
      {/* MAIN CLICK */}
      <div
        onClick={() =>
          activeAgent == agent ? setActiveAgent(null) : setActiveAgent(agent)
        }
        className={`py-1 w-full text-(--contrast)
          transition-all duration-100 ease-in ${isActive && "text-white"}
          text-center pl-6 pr-3 font-semibold`}
      >
        {agent.name}
      </div>

      <p
        className={`pb-1 font-semibold! text-(--contrast)! ${
          isActive && "text-white!"
        }`}
      >
        |
      </p>

      {/* FILTER TOGGLE */}
      <div
        onClick={() =>
          setShowExtraFilters(
            showExtraFilters === agent.id.toString()
              ? "closed"
              : agent.id.toString(),
          )
        }
        className="grid"
      >
        <IoIosArrowDown
          className={`
            w-[18] h-[18] ml-3
            cursor-pointer 
            transition-all duration-200
            hover:scale-110
            ${isActive ? "text-white" : "text-(--contrast)"}
            ${
              showExtraFilters === agent.id.toString()
                ? "translate-y-[-1] rotate-180"
                : ""
            }
          `}
        />
      </div>
    </div>
  );
};

export default AgentButtons;
