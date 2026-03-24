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
  selectedRegions: string[];
  selectedKommuner: string[];
  selectedPostcodes: string[];

  agentRegion: string[];
  setAgentRegion: React.Dispatch<React.SetStateAction<string[]>>;

  agentKommune: string[];
  setAgentKommune: React.Dispatch<React.SetStateAction<string[]>>;

  agentPostcodes: string[];
  setAgentPostcodes: React.Dispatch<React.SetStateAction<string[]>>;
};
const NewAgent = ({
  addAgent,
  selectedRegions,
  selectedPostcodes,
  selectedKommuner,
  agentRegion,
  setAgentRegion,
  agentKommune,
  setAgentKommune,
  agentPostcodes,
  setAgentPostcodes,
}: Props) => {
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
      location: {
        regions: agentRegion,
        kommuner: agentKommune,
        postcodes: agentPostcodes,
      },
    };

    addAgent(newAgent);

    setName("");
    setFilters({});
    setAgentRegion(selectedRegions);
    setAgentKommune(selectedKommuner);
    setAgentPostcodes(selectedPostcodes);
  }

  function handleReset() {
    setName("");
    setFilters({});
  }

  return (
    <div className=" space-y-4 col-span-2">
      <div className="flex flex-col gap-2 max-w-[500] mb-8">
        <div className="text-[20px]! [&>*]:h-[50]">
          <InputFilter
            dataInput="agentName"
            type="text"
            placeholder="Indtast navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <FilterSettings
        filters={filters}
        setFilters={setFilters}
        selectedRegions={selectedRegions}
        selectedKommuner={selectedKommuner}
        agentRegion={agentRegion}
        setAgentRegion={setAgentRegion}
        agentKommune={agentKommune}
        setAgentKommune={setAgentKommune}
        agentPostcodes={agentPostcodes}
        setAgentPostcodes={setAgentPostcodes}
      />

      <div className="flex gap-3 justify-start pt-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-md border border-(--black)/20 hover:bg-(--black)/5"
        >
          Nulstil
        </button>

        <button
          onClick={() => {
            handleCreateAgent();
            console.log(`selectedRegions ${selectedRegions}`);
          }}
          className="px-4 py-2 rounded-md bg-(--contrast) text-white"
        >
          Opret agent
        </button>
      </div>
    </div>
  );
};

export default NewAgent;
