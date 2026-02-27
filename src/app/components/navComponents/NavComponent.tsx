"use client";

import { useState } from "react";
import NavHeader from "./NavHeader";
import ExtraFiltersPanel from "./ExtraFiltersPanel";
import NavAgentsBar from "./NavAgentsBar";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function NavComponent({ search, setSearch }: Props) {
  const [showExtraFilters, setShowExtraFilters] = useState("closed");
  const [location, setLocation] = useState("");

  return (
    <div className="bg-white lk-box-shadow rounded-l-lg">
      <NavHeader
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
      />

      <NavAgentsBar
        showExtraFilters={showExtraFilters}
        setShowExtraFilters={setShowExtraFilters}
      />

      <ExtraFiltersPanel show={showExtraFilters} />
    </div>
  );
}
