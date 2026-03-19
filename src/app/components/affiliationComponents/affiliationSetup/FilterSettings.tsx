"use client";

import { useMemo, useState } from "react";
import InputFilter from "../../utilityComponents/InputFilter";
import postCodes from "@/data/postCodes.json";

import type { FilialAgent } from "@/app/types/filial";
import type { FilterSettings as FilterSettingsType } from "@/app/types/filial";

import SearchableMultiSelect from "../../utilityComponents/formUtilities/SearchMultiSelect";
import MultiSelect from "../../utilityComponents/formUtilities/MultiSelect";
import SelectFilter from "../../utilityComponents/SelectFilter";
import InputBlock from "../../utilityComponents/InputBlock";
import FilterSection from "../../utilityComponents/FilterSection";

type Props = {
  filters: FilterSettingsType;
  setFilters: React.Dispatch<React.SetStateAction<FilterSettingsType>>;
  affiliation?: FilialAgent;
  selectedRegions: string[];
  selectedPostcodes: string[];

  agentRegion: string[];
  setAgentRegion: React.Dispatch<React.SetStateAction<string[]>>;

  agentKommune: string[];
  setAgentKommune: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FilterSettings({
  filters,
  setFilters,
  affiliation,
  selectedRegions,
  selectedPostcodes,
  agentRegion,
  setAgentRegion,
  agentKommune,
  setAgentKommune,
}: Props) {
  const [selectedKommuner, setSelectedKommuner] = useState<string[]>([]);
  const [manualPostcodes, setManualPostcodes] = useState<string[]>([]);
  const [excludedPostcodes, setExcludedPostcodes] = useState<string[]>([]);

  /* ================= REGION MASTER ================= */

  const regions = [
    { code: "KBH", label: "København (KBH)" },
    { code: "SJL", label: "Sjælland (SJL)" },
    { code: "FYN", label: "Fyn (FYN)" },
    { code: "LF", label: "Lolland-Falster (LF)" },
    { code: "SJY", label: "Sydjylland (SJY)" },
    { code: "MJY", label: "Midtjylland (MJY)" },
    { code: "NJY", label: "Nordjylland (NJY)" },
  ];

  /* ================= REGION LIMIT ================= */

  const allowedRegions = regions.filter((r) =>
    selectedRegions.includes(r.code),
  );

  /* ================= FILTER UPDATE ================= */

  function update(key: keyof FilterSettingsType, value: any) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

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

  /* ================= DERIVED ================= */

  const kommunePostcodes = useMemo(() => {
    const all = agentKommune.flatMap((k) => kommuneToPostcodes[k] ?? []);
    return [...new Set(all)];
  }, [agentKommune, kommuneToPostcodes]);

  /* ================= RENDER ================= */
  return (
    <div className="transition-all duration-300">
      <div className="pb-5 space-y-4 ">
        <FilterSection title="Lån">
          <div className="grid grid-cols-4 gap-7">
            <InputBlock label="Lånebeløb (min)">
              <InputFilter
                dataInput="loanAmountMin"
                type="number"
                value={filters.loanAmountMin ?? ""}
                onChange={(e) =>
                  update("loanAmountMin", Number(e.target.value))
                }
              />
            </InputBlock>

            <SelectFilter
              dataInput="housingType"
              label="Boligtype"
              value={filters.housingType ?? ""}
              onChange={(v) => update("housingType", v)}
              options={["Ejerbolig", "Andelsbolig", "Sommerhus"]}
            />
          </div>
        </FilterSection>{" "}
        <FilterSection title="Markedsområde">
          <div className="flex flex-col gap-2">
            <p className="font-semibold pl-2">Region</p>

            <MultiSelect
              options={allowedRegions.map((r) => ({
                value: r.code,
                label: r.label,
              }))}
              value={agentRegion}
              onChange={setAgentRegion}
              placeholder="Vælg region"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold pl-2">Kommune</p>

            <SearchableMultiSelect
              options={kommuneOptions}
              value={agentKommune}
              onChange={setAgentKommune}
              placeholder="Vælg kommune"
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
              placeholder="Vælg postnummer"
              searchLabel="Søg postnummer eller by..."
            />
          </div>
        </FilterSection>
        <FilterSection title="Økonomi">
          <div className="grid grid-cols-4 gap-7">
            <InputBlock label="Indkomst (min.)">
              <InputFilter
                dataInput="incomeMin"
                type="number"
                value={filters.incomeMin ?? ""}
                onChange={(e) => update("incomeMin", Number(e.target.value))}
              />
            </InputBlock>

            <InputBlock label="Faste udgifter (maks.)">
              <InputFilter
                dataInput="fixedExpensesMax"
                type="number"
                value={filters.fixedExpensesMax ?? ""}
                onChange={(e) =>
                  update("fixedExpensesMax", Number(e.target.value))
                }
              />
            </InputBlock>

            <InputBlock label="Formue (min.)">
              <InputFilter
                dataInput="wealthMin"
                type="number"
                value={filters.wealthMin ?? ""}
                onChange={(e) => update("wealthMin", Number(e.target.value))}
              />
            </InputBlock>

            <InputBlock label="Gæld (maks.)">
              <InputFilter
                dataInput="debtsMax"
                type="number"
                value={filters.debtsMax ?? ""}
                onChange={(e) => update("debtsMax", Number(e.target.value))}
              />
            </InputBlock>
          </div>
        </FilterSection>
        <FilterSection title="Personlige oplysninger">
          <div className="grid grid-cols-4 gap-7">
            <SelectFilter
              dataInput="educationLevel"
              label="Uddannelse"
              value={filters.educationLevel ?? ""}
              onChange={(v) => update("educationLevel", v)}
              options={["HighSchool", "Vocational", "Bachelor", "Master"]}
            />

            <SelectFilter
              dataInput="jobStatus"
              label="Jobstatus"
              value={filters.jobStatus ?? ""}
              onChange={(v) => update("jobStatus", v)}
              options={["FullTime", "PartTime", "SelfEmployed"]}
            />

            <SelectFilter
              dataInput="housingSituation"
              label="Boligsituation"
              value={filters.housingSituation ?? ""}
              onChange={(v) => update("housingSituation", v)}
              options={["Lejer", "Ejer"]}
            />
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
