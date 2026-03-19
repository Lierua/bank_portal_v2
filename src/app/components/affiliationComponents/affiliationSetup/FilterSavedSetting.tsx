"use client";

import type { SearchAgent, FilterSettings } from "@/app/types/filial";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import InputFilter from "../../utilityComponents/InputFilter";
import InputBlock from "../../utilityComponents/InputBlock";
import FilterSection from "../../utilityComponents/FilterSection";
import SelectFilter from "../../utilityComponents/SelectFilter";

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
              dataInput="housingType"
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

            <InputBlock label="Formue (min.)">
              <InputFilter
                dataInput="wealthMin"
                type="number"
                value={filters.wealthMin ?? ""}
                onChange={(e) =>
                  updateField("wealthMin", Number(e.target.value))
                }
              />
            </InputBlock>

            <InputBlock label="Gæld (maks.)">
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
              dataInput="educationLevel"
              label="Uddannelse"
              value={filters.educationLevel}
              onChange={(v) => updateField("educationLevel", v)}
              options={["HighSchool", "Vocational", "Bachelor", "Master"]}
            />

            <SelectFilter
              dataInput="jobStatus"
              label="Jobstatus"
              value={filters.jobStatus}
              onChange={(v) => updateField("jobStatus", v)}
              options={["FullTime", "PartTime", "SelfEmployed"]}
            />

            <SelectFilter
              dataInput="housingSituation"
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
