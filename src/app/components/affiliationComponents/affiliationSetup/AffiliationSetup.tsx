"use client";

import { useState, useMemo } from "react";

import postCodes from "@/data/postCodes.json";

import type { FilialAgent } from "@/app/types/filial";

import FilterSettings from "./FilterSettings";
import MultiSelect from "../../utilityComponents/formUtilities/MultiSelect";
import SearchableMultiSelect from "../../utilityComponents/formUtilities/SearchMultiSelect";
import InputFilter from "../../utilityComponents/InputFilter";
import { IoIosArrowDown } from "react-icons/io";

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

  /* =========================
BUILD LOOKUPS FROM JSON
========================= */

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
        .filter((p) => p !== "9999"); // skip unknown
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

  /* =========================
STATE
========================= */

  const [name, setName] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedKommuner, setSelectedKommuner] = useState<string[]>([]);
  const [manualPostcodes, setManualPostcodes] = useState<string[]>([]);
  const [excludedPostcodes, setExcludedPostcodes] = useState<string[]>([]);
  const [open, setOpen] = useState(true);
  /* =========================
DERIVED POSTCODES
========================= */

  const kommunePostcodes = useMemo(() => {
    const all = selectedKommuner.flatMap((k) => kommuneToPostcodes[k] ?? []);
    return [...new Set(all)];
  }, [selectedKommuner, kommuneToPostcodes]);

  const selectedPostcodes = useMemo(() => {
    const merged = new Set([...manualPostcodes, ...kommunePostcodes]);

    excludedPostcodes.forEach((p) => merged.delete(p));

    return [...merged];
  }, [manualPostcodes, kommunePostcodes, excludedPostcodes]);

  /* =========================
ACTIONS
========================= */

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

    handleReset();
    setSection("Affiliate");
  }

  function handleReset() {
    setName("");
    setSelectedRegions([]);
    setSelectedKommuner([]);
    setManualPostcodes([]);
    setExcludedPostcodes([]);
  }

  /* =========================
    UI
========================= */

  return (
    <div className="bg-white p-10">
      <button
        onClick={() => setSection("Affiliate")}
        className="mb-8 text-sm hover:text-(--contrast)"
      >
        ← Tilbage
      </button>
      <div className="border-2 border-black/20 rounded-[5px] p-8 space-y-8">
        <Section title="Filial">
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

        <div className="h-[2] w-full bg-(--black)/20" />

        <Section title="Indstillinger">
          <div
            className={`border border-(--black)/10 rounded-lg ${open ? "" : "overflow-hidden"} col-span-2 mt-6`}
          >
            <button
              onClick={() => setOpen((p) => !p)}
              className="w-full flex justify-between items-center px-4 py-3 bg-(--black)/5 hover:bg-(--black)/10"
            >
              <span className="font-semibold">Område</span>

              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid grid-cols-2 gap-4
                      transition-all duration-300
                      ${open ? "max-h-[1000] p-4" : "max-h-0 px-4"}
                    `}
            >
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
            </div>
          </div>
          <div className="col-span-2">
            <FilterSettings />
          </div>
        </Section>

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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-6">{children}</div>
    </div>
  );
}
