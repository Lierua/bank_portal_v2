"use client";

import FilterIcon from "@/app/assets/icons/FilterIcon";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  label: string;
  showExtraFilters: String;
  setShowExtraFilters: React.Dispatch<React.SetStateAction<string>>;
  active: String;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const AgentButtons = ({
  label,
  showExtraFilters,
  setShowExtraFilters,
  active,
  setActive,
}: Props) => {
  return (
    <div
      className={`cursor-pointer flex items-center border-2 border-(--contrast) pr-4 rounded-full
            transition-all duration-100 ease-in ${active == label && "bg-(--contrast)"}`}
      key={label}
    >
      <div
        onClick={() => setActive(`${label}`)}
        className={`py-1 w-full text-(--contrast)  self-end mt-auto
              transition-all duration-100 ease-in ${active === label && "text-white"}
              text-center pl-6 pr-3 font-semibold`}
      >
        {label}
      </div>
      <p
        className={`pb-1 font-semibold! text-(--contrast)! ${active === label && "text-white!"}`}
      >
        |
      </p>
      <div
        onClick={() =>
          setShowExtraFilters(showExtraFilters === label ? "closed" : label)
        }
        className="grid"
      >
        {/*                 <FilterIcon
                  className={`
                  w-[18] h-[18]
                  cursor-pointer 
                  transition-all duration-200
                  hover:scale-110 hover:text-(--contrast)
                  text-(--contrast)
                  ${showExtraFilters === a ? " translate-y-[-1]" : "text-(--black)"}
                  `}
                /> */}
        <IoIosArrowDown
          onClick={() => setActive(label)}
          className={`
                  w-[18] h-[18] ml-3
                  cursor-pointer 
                  transition-all duration-200
                  hover:scale-110
                  text-(--contrast)
                  ${active === label && "text-white"}
                  ${showExtraFilters === label ? " translate-y-[-1] rotate-180" : "text-(--black) "}
                  `}
        />
      </div>
    </div>
  );
};

export default AgentButtons;
