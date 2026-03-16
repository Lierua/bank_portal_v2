"use client";

import { useState } from "react";
import InputFilter from "../../utilityComponents/InputFilter";
import FilterSettings from "./FilterSettings";

import type {
  SearchAgent,
  FilterSettings as FilterSettingsType,
} from "@/app/types/filial";

type Props = {
  addAgent: (agent: SearchAgent) => void;
};

const NewAgent = ({ addAgent }: Props) => {
  const [name, setName] = useState("");

  const [filters, setFilters] = useState<FilterSettingsType>({});

  function handleCreateAgent() {
    if (!name.trim()) {
      alert("Agent navn er påkrævet");
      return;
    }

    const newAgent: SearchAgent = {
      id: Date.now(),
      name: name.trim(),
      filters,
    };

    addAgent(newAgent);

    setName("");
    setFilters({});
  }

  function handleReset() {
    setName("");
    setFilters({});
  }

  return (
    <div className="border-2 border-black/20 rounded-lg p-4 space-y-4 col-span-2">
      <div className="flex flex-col gap-2 max-w-[500] mb-10">
        <p className="font-semibold pl-2">Agent navn</p>

        <InputFilter
          dataInput="agentName"
          type="text"
          placeholder="Indtast navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <FilterSettings filters={filters} setFilters={setFilters} />

      <div className="flex gap-3 justify-start pt-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-md border border-(--black)/20 hover:bg-(--black)/5"
        >
          Nulstil
        </button>

        <button
          onClick={handleCreateAgent}
          className="px-4 py-2 rounded-md bg-(--contrast) text-white"
        >
          Opret agent
        </button>
      </div>
    </div>
  );
};

export default NewAgent;
