"use client";

import type { SearchAgent, FilterSettings } from "@/app/types/filial";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import InputFilter from "../../utilityComponents/InputFilter";

type Props = {
  agent: SearchAgent;
  onChange: (filters: FilterSettings) => void;
};

export default function FilterSavedSettings({ agent, onChange }: Props) {
  const [filters, setFilters] = useState<FilterSettings>(agent.filters ?? {});

  useEffect(() => {
    setFilters(agent.filters ?? {});
  }, [agent]);

  function updateField(key: keyof FilterSettings, value: any) {
    const next = { ...filters, [key]: value };

    setFilters(next);
    onChange(next);
  }

  return (
    <div className="overflow-hidden transition-all duration-300">
      <div className="pb-5 space-y-4 overflow-y-auto">
        {/* LOAN */}
        <FilterSection title="Lån">
          <div className="grid grid-cols-2 gap-7">
            <InputBlock label="Lånebeløb (min)">
              <InputFilter
                dataInput="loanAmountMin"
                type="number"
                value={filters.loanAmountMin ?? ""}
                onChange={(e) =>
                  updateField("loanAmountMin", Number(e.target.value))
                }
              />
            </InputBlock>

            <SelectFilter
              label="Boligtype"
              value={filters.housingType}
              onChange={(v) => updateField("housingType", v)}
              options={["Ejerbolig", "Andelsbolig", "Sommerhus"]}
            />
          </div>
        </FilterSection>

        {/* ECONOMY */}
        <FilterSection title="Økonomi">
          <div className="grid grid-cols-2 gap-7">
            <InputBlock label="Indkomst (min)">
              <InputFilter
                dataInput="incomeMin"
                type="number"
                value={filters.incomeMin ?? ""}
                onChange={(e) =>
                  updateField("incomeMin", Number(e.target.value))
                }
              />
            </InputBlock>

            <InputBlock label="Faste udgifter (max)">
              <InputFilter
                dataInput="fixedExpensesMax"
                type="number"
                value={filters.fixedExpensesMax ?? ""}
                onChange={(e) =>
                  updateField("fixedExpensesMax", Number(e.target.value))
                }
              />
            </InputBlock>

            <InputBlock label="Formue (min)">
              <InputFilter
                dataInput="wealthMin"
                type="number"
                value={filters.wealthMin ?? ""}
                onChange={(e) =>
                  updateField("wealthMin", Number(e.target.value))
                }
              />
            </InputBlock>

            <InputBlock label="Gæld (max)">
              <InputFilter
                dataInput="debtsMax"
                type="number"
                value={filters.debtsMax ?? ""}
                onChange={(e) =>
                  updateField("debtsMax", Number(e.target.value))
                }
              />
            </InputBlock>
          </div>
        </FilterSection>

        {/* PERSON */}
        <FilterSection title="Personlige oplysninger">
          <div className="grid grid-cols-2 gap-7">
            <SelectFilter
              label="Uddannelse"
              value={filters.educationLevel}
              onChange={(v) => updateField("educationLevel", v)}
              options={["HighSchool", "Vocational", "Bachelor", "Master"]}
            />

            <SelectFilter
              label="Jobstatus"
              value={filters.jobStatus}
              onChange={(v) => updateField("jobStatus", v)}
              options={["FullTime", "PartTime", "SelfEmployed"]}
            />

            <SelectFilter
              label="Boligsituation"
              value={filters.housingSituation}
              onChange={(v) => updateField("housingSituation", v)}
              options={["Lejer", "Ejer"]}
            />
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

function SelectFilter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold pl-2">{label}</p>

      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="h-[40px] rounded-md border border-(--black)/20 px-3"
      >
        <option value="">Alle</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function InputBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold pl-2">{label}</p>
      {children}
    </div>
  );
}

function FilterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-(--black)/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex justify-between items-center px-4 py-3 bg-(--black)/5 hover:bg-(--black)/10"
      >
        <span className="font-semibold">{title}</span>

        <IoIosArrowDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[1000] p-4" : "max-h-0 px-4"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
