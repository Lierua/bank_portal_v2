"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const FilterSection = ({ title, children, defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`border border-(--black)/10 rounded-lg ${open ? "" : "overflow-hidden"}`}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex justify-between items-center px-4 py-3 bg-(--black)/5 hover:bg-(--black)/10"
      >
        <span className="font-semibold">{title}</span>

        <IoIosArrowDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`
          transition-all duration-300 }
          ${open ? "max-h-[1000] p-4" : "max-h-0 px-4"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterSection;
