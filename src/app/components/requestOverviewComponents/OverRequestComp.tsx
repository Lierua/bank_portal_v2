"use client";

import { useState } from "react";
import NavComponent from "../navComponents/NavComponent";
import RequestContent from "../RequestContent";
import type { SearchAgent, FilialAgent } from "@/app/types/filial";

const OverRequestComponent = () => {
  const [agents, setAgents] = useState<SearchAgent[]>([]);
  const [activeAgent, setActiveAgent] = useState<SearchAgent | null>(null);

  const [selectedAffiliation, setSelectedAffiliation] =
    useState<FilialAgent | null>(null);

  const [search, setSearch] = useState("");

  const addAgent = (agent: SearchAgent) => {
    setAgents((prev) => [...prev, agent]);
  };

  const updateAgent = (agent: SearchAgent) => {
    setAgents((prev) => prev.map((a) => (a.id === agent.id ? agent : a)));
  };

  const deleteAgent = (id: number) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="pt-[15] gap-[15] flex flex-col min-h-screen">
      <NavComponent
        search={search}
        setSearch={setSearch}
        agents={agents}
        activeAgent={activeAgent}
        setActiveAgent={setActiveAgent}
      />

      <RequestContent
        search={search}
        agents={agents}
        addAgent={addAgent}
        updateAgent={updateAgent}
        deleteAgent={deleteAgent}
        activeAgent={activeAgent}
      />
    </div>
  );
};

export default OverRequestComponent;
