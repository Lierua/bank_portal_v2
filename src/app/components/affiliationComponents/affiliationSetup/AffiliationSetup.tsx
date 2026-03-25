"use client";

import { useState, useMemo, useEffect } from "react";
import postCodes from "@/data/postCodes.json";

import type { FilialAgent, SearchAgent } from "@/app/types/filial";

import MultiSelect from "../../utilityComponents/formUtilities/MultiSelect";
import SearchableMultiSelect from "../../utilityComponents/formUtilities/SearchMultiSelect";
import InputFilter from "../../utilityComponents/InputFilter";
import NewAgent from "./NewAgent";
import AgentItem from "./AgentItem";
import type { Section } from "@/app/types/navigation";

type Props = {
  setSection: React.Dispatch<React.SetStateAction<Section>>;
  addAffiliation: (agent: FilialAgent) => void;
  updateAffiliation?: (agent: FilialAgent) => void;
  affiliation?: FilialAgent;
  agents: SearchAgent[];
  addAgent: (agent: SearchAgent) => void;
  updateAgent: (agent: SearchAgent) => void;
  deleteAgent: (id: number) => void;
};

const AffiliationSetup = ({
  setSection,
  addAffiliation,
  affiliation,
  updateAffiliation,
  addAgent,
  updateAgent,
  deleteAgent,
  agents,
}: Props) => {
  const regions = [
    { code: "KBH", label: "København (KBH)" },
    { code: "SJL", label: "Sjælland (SJL)" },
    { code: "FYN", label: "Fyn (FYN)" },
    { code: "LF", label: "Lolland-Falster (LF)" },
    { code: "SJY", label: "Sydjylland (SJY)" },
    { code: "MJY", label: "Midtjylland (MJY)" },
    { code: "NJY", label: "Nordjylland (NJY)" },
  ];

  const handlers = [
    { value: "0", label: "Mads Jensen" },
    { value: "1", label: "Frederik Nielsen" },
    { value: "2", label: "Andreas Hansen" },
    { value: "3", label: "Mathilde Sørensen" },
    { value: "4", label: "Emma Pedersen" },
    { value: "5", label: "Lucas Andersen" },
    { value: "6", label: "Sofie Kristensen" },
  ];

  const isEditMode = !!affiliation;

  /* ================= LOOKUPS ================= */

  const kommuneOptions = useMemo(
    () =>
      postCodes.map((k) => ({
        value: k.name,
        label: k.name,
      })),
    [],
  );

  const kommuneToPostcodes = useMemo(() => {
    const map: Record<string, string[]> = {};

    postCodes.forEach((k) => {
      map[k.name] = k.postcodes
        .map((p) => p.postcode)
        .filter((p) => p !== "9999");
    });

    return map;
  }, []);

  const postcodeOptions = useMemo(() => {
    const seen = new Set<string>();
    const list: { value: string; label: string }[] = [];

    postCodes.forEach((k) => {
      k.postcodes.forEach((p) => {
        if (p.postcode === "9999") return;

        if (!seen.has(p.postcode)) {
          seen.add(p.postcode);

          list.push({
            value: p.postcode,
            label: `${p.postcode} - ${p.cityName}`,
          });
        }
      });
    });

    return list;
  }, []);

  /* ================= STATE ================= */

  const [name, setName] = useState(() => affiliation?.name ?? "");

  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    () => affiliation?.area.regions ?? [],
  );

  const [manualPostcodes, setManualPostcodes] = useState<string[]>(
    () => affiliation?.area.postcodes ?? [],
  );

  const [selectedKommuner, setSelectedKommuner] = useState<string[]>([]);
  const [excludedPostcodes, setExcludedPostcodes] = useState<string[]>([]);
  const [selectedHandlers, setSelectedHandlers] = useState<string[]>(
    () => affiliation?.handlers ?? [],
  );

  /* ================= Agent ================= */

  const [agentRegion, setAgentRegion] = useState<string[]>(selectedRegions);
  const [agentKommune, setAgentKommune] = useState<string[]>(selectedKommuner);
  const [agentPostcodes, setAgentPostcodes] =
    useState<string[]>(manualPostcodes);

  /* ================= DERIVED ================= */

  const kommunePostcodes = useMemo(() => {
    const all = selectedKommuner.flatMap((k) => kommuneToPostcodes[k] ?? []);
    return [...new Set(all)];
  }, [selectedKommuner, kommuneToPostcodes]);

  const selectedPostcodes = useMemo(() => {
    const merged = new Set([...manualPostcodes, ...kommunePostcodes]);
    excludedPostcodes.forEach((p) => merged.delete(p));
    return [...merged];
  }, [manualPostcodes, kommunePostcodes, excludedPostcodes]);

  useEffect(() => {
    setAgentRegion(selectedRegions);
  }, [selectedRegions]);

  useEffect(() => {
    setAgentKommune(selectedKommuner);
  }, [selectedKommuner]);

  useEffect(() => {
    setAgentPostcodes(selectedPostcodes);
  }, [selectedPostcodes]);

  /* ================= SAVE FILIAL ================= */

  function handleSaveFilial() {
    if (!name.trim()) return alert("Navn påkrævet");

    const filial: FilialAgent = {
      id: affiliation?.id ?? Date.now(),
      name,
      area: {
        regions: selectedRegions,
        postcodes: selectedPostcodes,
      },
      agents,
      handlers: selectedHandlers,
    };

    if (isEditMode && updateAffiliation) {
      updateAffiliation(filial);
    } else {
      addAffiliation(filial);
    }
    console.log(affiliation?.agents);
    console.log(filial);
    setSection("Affiliate");
  }

  /* ================= UI ================= */

  return (
    <div className="bg-white p-10 space-y-6 items-start">
      <button
        onClick={() => setSection("Affiliate")}
        className="text-sm hover:text-(--contrast) mr-auto"
      >
        ← Tilbage
      </button>

      <div className="border-2 border-black/20 rounded-[5px] p-8 space-y-8">
        <div className="[&>*>h2]:text-4xl! [&>*>h2]:font-semibold! [&>*>h2]:text-(--black)!">
          <Section title="Afdeling">
            <div className="mt-2 col-span-2 max-w-[500]">
              <div className="text-[20px]! [&>*]:h-[50] [&>*]:font-semibold">
                <InputFilter
                  dataInput="affiliationName"
                  type="text"
                  placeholder="Indtast afdelingsnavn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </Section>
        </div>
        <div className="max-w-[1000]">
          <Section title="Markedsområde">
            <p className="col-span-2 text-(--black)/60!">
              Definér markedsområde for afdelingen
            </p>

            <div className="flex flex-col gap-2">
              <p className="font-semibold pl-2">Region</p>
              <MultiSelect
                options={regions.map((r) => ({
                  value: r.code,
                  label: r.label,
                }))}
                value={selectedRegions}
                onChange={setSelectedRegions}
                placeholder="Vælg region"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold pl-2">Kommune</p>
              <SearchableMultiSelect
                options={kommuneOptions}
                value={selectedKommuner}
                onChange={setSelectedKommuner}
                placeholder="Vælg kommune"
                searchLabel="Søg kommune..."
              />
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <p className="font-semibold pl-2">Postnumner</p>
              <SearchableMultiSelect
                options={postcodeOptions}
                value={selectedPostcodes}
                onChange={(vals) => {
                  const nextExcluded = kommunePostcodes.filter(
                    (p) => !vals.includes(p),
                  );

                  const nextManual = vals.filter(
                    (p) => !kommunePostcodes.includes(p),
                  );

                  setExcludedPostcodes(nextExcluded);
                  setManualPostcodes(nextManual);
                }}
                placeholder="Vælg postnummer"
                searchLabel="Søg postnummer eller by..."
              />
            </div>
          </Section>
        </div>
        <div className="max-w-[1000]">
          <Section title="Bruger">
            <p className="col-span-2 text-(--black)/60!">
              Definér bruger for afdeling
            </p>

            <div className="flex flex-col gap-2 col-span-2">
              <SearchableMultiSelect
                options={handlers}
                value={selectedHandlers}
                onChange={setSelectedHandlers}
                placeholder="Vælg bruger"
                searchLabel="Søg bruger..."
              />
            </div>
          </Section>
          <button
            onClick={handleSaveFilial}
            className="bg-(--contrast) text-white px-4 py-2 mt-10 rounded"
          >
            {isEditMode ? "Opdater afdeling" : "Opret afdeling"}
          </button>
        </div>
        <div className="border-2 border-black/20 rounded-lg p-4">
          <Section title="Søgeagenter">
            <p className="col-span-2 text-(--black)/60!">
              Opret søgeagent for afdeling
            </p>

            <div className="flex flex-col">
              {agents.map((agent) => (
                <AgentItem
                  key={agent.id}
                  agent={agent}
                  onDelete={deleteAgent}
                  onUpdate={updateAgent}
                />
              ))}
            </div>

            <NewAgent
              addAgent={addAgent}
              selectedRegions={selectedRegions}
              selectedKommuner={selectedKommuner}
              selectedPostcodes={selectedPostcodes}
              agentRegion={agentRegion}
              setAgentRegion={setAgentRegion}
              agentKommune={agentKommune}
              setAgentKommune={setAgentKommune}
              agentPostcodes={agentPostcodes}
              setAgentPostcodes={setAgentPostcodes}
            />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default AffiliationSetup;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold!">{title}</h2>
      <div className="grid grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
