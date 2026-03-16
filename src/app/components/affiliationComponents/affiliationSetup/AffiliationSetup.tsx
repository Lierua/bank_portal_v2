"use client";

import { useState, useMemo } from "react";
import postCodes from "@/data/postCodes.json";

import type { FilialAgent, SearchAgent } from "@/app/types/filial";

import MultiSelect from "../../utilityComponents/formUtilities/MultiSelect";
import SearchableMultiSelect from "../../utilityComponents/formUtilities/SearchMultiSelect";
import InputFilter from "../../utilityComponents/InputFilter";
import NewAgent from "./NewAgent";
import AgentItem from "./AgentItem";

type Props = {
  setSection: React.Dispatch<React.SetStateAction<string>>;
  addAffiliation: (agent: FilialAgent) => void;
};

const AffiliationSetup = ({ setSection, addAffiliation }: Props) => {
  const regions = [
    { code: "KBH", label: "København (KBH)" },
    { code: "SJL", label: "Sjælland (SJL)" },
    { code: "FYN", label: "Fyn (FYN)" },
    { code: "LF", label: "Lolland-Falster (LF)" },
    { code: "SJY", label: "Sydjylland (SJY)" },
    { code: "MJY", label: "Midtjylland (MJY)" },
    { code: "NJY", label: "Nordjylland (NJY)" },
  ];

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

  const [name, setName] = useState("");
  const [agents, setAgents] = useState<SearchAgent[]>([]);

  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedKommuner, setSelectedKommuner] = useState<string[]>([]);
  const [manualPostcodes, setManualPostcodes] = useState<string[]>([]);
  const [excludedPostcodes, setExcludedPostcodes] = useState<string[]>([]);

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

  /* ================= AGENT ACTION ================= */

  function addAgent(agent: SearchAgent) {
    setAgents((prev) => [...prev, agent]);
  }

  /* ================= CREATE FILIAL ================= */

  function handleCreateFilial() {
    if (!name.trim()) return alert("Navn påkrævet");

    if (!selectedRegions.length && !selectedPostcodes.length) {
      return alert("Vælg område");
    }

    const filial: FilialAgent = {
      id: Date.now(),
      name: name.trim(),
      area: {
        regions: selectedRegions,
        postcodes: selectedPostcodes,
      },
      agents,
    };

    addAffiliation(filial);
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
        <Section title="Filial">
          <div className="mt-2 col-span-2 max-w-[500]">
            <InputFilter
              dataInput="affiliationName"
              type="text"
              placeholder="Indtast navn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Section>
        <div className="max-w-[1000]">
          <Section title="Område">
            <p className="col-span-2 text-(--black)/60!">
              Definér det område filialet får låneansøgninger fra.
            </p>

            <div className="flex flex-col gap-2">
              <p className="font-semibold pl-2">Regioner</p>
              <MultiSelect
                options={regions.map((r) => ({
                  value: r.code,
                  label: r.label,
                }))}
                value={selectedRegions}
                onChange={setSelectedRegions}
                placeholder="Vælg regioner"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold pl-2">Kommuner</p>
              <SearchableMultiSelect
                options={kommuneOptions}
                value={selectedKommuner}
                onChange={setSelectedKommuner}
                placeholder="Kommune"
                searchLabel="Søg kommune..."
              />
            </div>

            <div className="flex flex-col gap-2 col-span-2">
              <p className="font-semibold pl-2">Postnumre</p>
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
                placeholder="Postnummer"
                searchLabel="Søg postnummer eller by..."
              />
            </div>
          </Section>
        </div>
        {/* ================= AGENTS ================= */}

        <Section title="Filter Agenter">
          <p className="col-span-2 text-(--black)/60!">
            Opret filteragenter, så filialen nemt og hurtigt kan anvende de
            ønskede filtre.
          </p>
          {agents.length === 0 && (
            <p className="italic text-black/60">- Ingen agenter endnu</p>
          )}
          <div className="flex flex-col">
            {agents.map((a) => (
              <AgentItem key={a.id} agent={a} />
            ))}
          </div>
          <NewAgent addAgent={addAgent} />
        </Section>
        <button
          onClick={handleCreateFilial}
          className="bg-(--contrast) text-white px-4 py-2 rounded"
        >
          Opret Filial
        </button>
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
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
