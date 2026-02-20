"use client";

import { useState, useRef } from "react";

import { IoIosLogOut } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { TbMapSearch } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";

import SearchBar from "./SearchBar";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const NavComponent = ({ search, setSearch }: Props) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [location, setLocation] = useState("");

  const dateInputRef = useRef<HTMLInputElement>(null);

  const locations = [
    "Alle",
    "København",
    "Aarhus",
    "Odense",
    "Aalborg",
    "Esbjerg",
  ];

  const openCalendar = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <div className="bg-white lk-box-shadow rounded-l-lg">
      {/* ================= HEADER ================= */}
      <div className="grid grid-cols-[70px_200px_1fr] h-[70px] items-center">
        {/* Logo */}
        <div
          className={`h-full bg-(--prime) text-4xl! text-(--white) flex items-center justify-center font-bold
           ${showExtraFilters ? "rounded-tl-lg" : "rounded-l-lg"}`}
        >
          lk
        </div>

        {/* Title */}
        <h2 className="pl-5 font-bold text-(--black)/90">Oversigt</h2>

        {/* Actions */}
        <div className="flex justify-between items-center px-5">
          {/* LEFT ACTIONS */}
          <div className="flex items-center gap-8 relative">
            <div className="w-[250px]">
              <SearchBar search={search} setSearch={setSearch} />
            </div>

            {/* Hidden Date Input */}
            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="absolute opacity-0 pointer-events-none left-[40] top-[25]"
            />

            <IconButton onClick={openCalendar} title="Vælg dato">
              <FiCalendar />
            </IconButton>

            {/* LOCATION */}
            <div className="relative">
              <IconButton
                title="Vælg lokation"
                onClick={() => setShowLocations((p) => !p)}
              >
                <TbMapSearch />
              </IconButton>

              {/* Location Dropdown */}
              <div
                className={`absolute left-[10] mt-2 w-48 bg-white border-2 border-(--black)/30
                rounded-md shadow-lg z-50 overflow-hidden
                transition-all duration-200
                ${
                  showLocations
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setShowLocations(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 font-semibold border-b-2 border-gray-100"
                  >
                    - {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* EXTRA FILTER TOGGLE */}
            <IconButton
              title="Ekstra filtre"
              onClick={() => setShowExtraFilters((p) => !p)}
            >
              <HiDotsHorizontal />
            </IconButton>
          </div>

          {/* RIGHT USER */}
          <div className="flex items-center gap-4">
            <h3 className="font-bold">Line Christiansen</h3>

            <IoPersonCircleOutline className="text-(--black) text-5xl" />

            <IoIosLogOut
              title="Log ud"
              className="text-(--black) text-[40px] cursor-pointer transition-colors hover:text-(--contrast)"
            />
          </div>
        </div>
      </div>

      {/* ================= EXTRA FILTERS ================= */}
      <div
        className={`
        grid grid-cols-[70px_1fr]
        transition-all duration-400 ease-cubic-bezier(0.34, 1.56, 0.64, 1)
        overflow-hidden opacity-100
        ${showExtraFilters ? "max-h-[200px] " : "max-h-0 "}
      `}
      >
        <div className="bg-(--prime) rounded-bl-lg" />

        <div className="pb-4">
          <h2
            className={`transition-all duration-300 ease-in pl-5 font-bold 
              text-(--black)/90 mb-2 ${showExtraFilters ? "opacity-100" : "opacity-0"}`}
          >
            Ekstra filtering
          </h2>

          <div
            className={`${showExtraFilters ? "opacity-100" : "opacity-0"} transition-all duration-300 ease-in
            flex pl-5 gap-5 flex-wrap text-(--black)/70`}
          >
            <FilterChip label="Filter 1" />
            <FilterChip label="Filter 2" />
            <FilterChip label="Filter 3" />
            <FilterChip label="Filter 4" />
            <FilterChip label="Filter 5" />
            <FilterChip label="Filter 6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavComponent;

/* ================= SMALL COMPONENTS ================= */

function IconButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <div
      title={title}
      onClick={onClick}
      className="text-(--black) text-4xl cursor-pointer
      transition-all duration-200
      hover:text-(--contrast) hover:scale-110"
    >
      {children}
    </div>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <div
      className="px-4 py-1 border border-(--black)/20 rounded-full
      hover:bg-(--contrast) hover:text-white transition cursor-pointer"
    >
      {label}
    </div>
  );
}
