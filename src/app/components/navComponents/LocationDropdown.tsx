"use client";

import { useState, useRef, useEffect } from "react";
import { TbMapSearch } from "react-icons/tb";
import IconButton from "./ui/IconButton";

type Props = {
  location: string;
  setLocation: (value: string) => void;
};

const locations = [
  "Alle",
  "København",
  "Aarhus",
  "Odense",
  "Aalborg",
  "Esbjerg",
];

export default function LocationDropdown({ location, setLocation }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* =========================
     Close when clicking outside
  ========================= */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger */}
      <IconButton onClick={() => setOpen((p) => !p)}>
        <TbMapSearch />
      </IconButton>

      {/* Dropdown */}
      <div
        className={`
          absolute left-[10px] mt-2 w-48
          bg-white border-2 border-(--black)/30
          rounded-md shadow-lg z-50 overflow-hidden
          transition-all duration-200 origin-top
          ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {locations.map((loc) => (
          <button
            key={loc}
            onClick={() => {
              setLocation(loc);
              setOpen(false);
            }}
            className={`
              w-full text-left px-4 py-2
              hover:bg-gray-100 font-semibold
              border-b border-gray-100
              ${location === loc ? "bg-(--light-prime)/20" : ""}
            `}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}
