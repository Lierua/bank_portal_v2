"use client";

import { useState } from "react";

import postNumbers from "@/data/postNumre.json";

import type { FilialAgent } from "@/app/types/filial";

import FilterSettings from "./FilterSettings";
import MultiSelect from "../../utilityComponents/formUtilities/MultiSelect";
import SearchableMultiSelect from "../../utilityComponents/formUtilities/SearchMultiSelect";
import InputFilter from "../../utilityComponents/InputFilter";

type Props = {
  setSection: React.Dispatch<React.SetStateAction<string>>;
  addAffiliation: (agent: FilialAgent) => void;
};

const AffiliationSetup = ({ setSection, addAffiliation }: Props) => {
  const regions = [
    { code: "KBH", name: "København", label: "København (KBH)" },
    { code: "SJL", name: "Sjælland", label: "Sjælland (SJL)" },
    { code: "FYN", name: "Fyn", label: "Fyn (FYN)" },
    { code: "LF", name: "Lolland-Falster", label: "Lolland-Falster (LF)" },
    { code: "SJY", name: "Sydjylland", label: "Sydjylland (SJY)" },
    { code: "MJY", name: "Midtjylland", label: "Midtjylland (MJY)" },
    { code: "NJY", name: "Nordjylland", label: "Nordjylland (NJY)" },
  ];

  const [name, setName] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedPostcodes, setSelectedPostcodes] = useState<string[]>([]);

  function handleCreateFilial() {
    if (!name.trim()) {
      alert("Navn er påkrævet");
      return;
    }

    if (!selectedRegions.length && !selectedPostcodes.length) {
      alert("Vælg mindst én region eller ét postnummer");
      return;
    }

    const newAgent: FilialAgent = {
      id: Date.now(),
      name: name.trim(),
      area: {
        regions: selectedRegions,
        postcodes: selectedPostcodes,
      },
      filters: {},
    };

    addAffiliation(newAgent);

    setName("");
    setSelectedRegions([]);
    setSelectedPostcodes([]);
    setSection("Affiliate");
  }

  function handleReset() {
    setName("");
    setSelectedRegions([]);
    setSelectedPostcodes([]);
  }

  return (
    <div className="bg-white p-10">
      <button
        onClick={() => setSection("Affiliate")}
        className="mb-8 text-sm hover:text-(--contrast)"
      >
        ← Tilbage
      </button>

      <div className="border-2 border-black/20 rounded-[5px] p-8 space-y-8">
        <Section title="Navn for filial">
          <div className="mt-2 col-span-2">
            <InputFilter
              dataInput="affiliationName"
              type="text"
              placeholder="Indtast navn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Section>

        <div className="h-[2px] w-full bg-(--black)/20" />

        <Section title="Område">
          <p className="col-span-2 text-(--black)/60!">
            Definér det område filialet får låneansøgninger fra. Dette kan være
            regioner eller specifikke postnumre.
          </p>

          <div className="flex flex-col gap-2">
            <h3>Regioner</h3>
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
            <h3>Postnumre</h3>
            <SearchableMultiSelect
              options={postNumbers.map((p) => ({
                value: p.postNumber,
                label: `${p.postNumber} ${p.city}`,
              }))}
              value={selectedPostcodes}
              onChange={setSelectedPostcodes}
              placeholder="Vælg postnumre"
            />
          </div>
        </Section>

        <div className="h-[2px] w-full bg-(--black)/20" />

        <div className="[&>*>*]:grid-cols-1">
          <Section title="Filter indstillinger">
            <p className="col-span-2 text-(--black)/60!">
              Nedenfor kan du definere ønskede filterkrav for ansøgninger.
            </p>
            <FilterSettings />
          </Section>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-md border border-(--black)/20 hover:bg-(--black)/5"
          >
            Nulstil
          </button>

          <button
            onClick={handleCreateFilial}
            className="px-4 py-2 rounded-md bg-(--contrast) text-white"
          >
            Opret filial
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliationSetup;

/* =========================
   Section Wrapper
========================= */

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
