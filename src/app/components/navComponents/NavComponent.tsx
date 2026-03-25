"use client";

import { useState } from "react";
import NavHeader from "./NavHeader";
import ExtraFiltersPanel from "./ExtraFiltersPanel";
import NavAgentsBar from "./NavAgentsBar";
import type { SearchAgent } from "@/app/types/filial";
import LocalAgent from "./LocalAgent";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  agents: SearchAgent[];
  activeAgent: SearchAgent | null;
  setActiveAgent: React.Dispatch<React.SetStateAction<SearchAgent | null>>;

  addLocalAgent: (agent: SearchAgent) => void;
};

export default function NavComponent({
  search,
  setSearch,
  agents,
  activeAgent,
  setActiveAgent,
  addLocalAgent,
}: Props) {
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
        agents={agents}
        activeAgent={activeAgent}
        setActiveAgent={setActiveAgent}
        showExtraFilters={showExtraFilters}
        setShowExtraFilters={setShowExtraFilters}
      />

      <ExtraFiltersPanel show={showExtraFilters} />
      <LocalAgent show={showExtraFilters} addLocalAgent={addLocalAgent} />
    </div>
  );
}
