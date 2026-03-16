"use client";

import type { SearchAgent, FilterSettings } from "@/app/types/filial";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import InputFilter from "../../utilityComponents/InputFilter";

type Props = {
  agent: SearchAgent;
};

export default function FilterSavedSettings({ agent }: Props) {
  const f: FilterSettings = agent.filters ?? {};

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
                defaultValue={f.loanAmountMin}
              />
            </InputBlock>

            <SelectFilter
              label="Boligtype"
              dataInput="housingType"
              options={["Ejerbolig", "Andelsbolig", "Sommerhus"]}
              defaultValue={f.housingType}
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
                defaultValue={f.incomeMin}
              />
            </InputBlock>

            <InputBlock label="Faste udgifter (max)">
              <InputFilter
                dataInput="fixedExpensesMax"
                type="number"
                defaultValue={f.fixedExpensesMax}
              />
            </InputBlock>

            <InputBlock label="Formue (min)">
              <InputFilter
                dataInput="wealthMin"
                type="number"
                defaultValue={f.wealthMin}
              />
            </InputBlock>

            <InputBlock label="Gæld (max)">
              <InputFilter
                dataInput="debtsMax"
                type="number"
                defaultValue={f.debtsMax}
              />
            </InputBlock>
          </div>
        </FilterSection>

        {/* PERSON */}
        <FilterSection title="Personlige oplysninger">
          <div className="grid grid-cols-2 gap-7">
            <SelectFilter
              label="Uddannelse"
              dataInput="educationLevel"
              options={["HighSchool", "Vocational", "Bachelor", "Master"]}
              defaultValue={f.educationLevel}
            />

            <SelectFilter
              label="Jobstatus"
              dataInput="jobStatus"
              options={["FullTime", "PartTime", "SelfEmployed"]}
              defaultValue={f.jobStatus}
            />

            <SelectFilter
              label="Boligsituation"
              dataInput="housingSituation"
              options={["Lejer", "Ejer"]}
              defaultValue={f.housingSituation}
            />
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

function SelectFilter({
  label,
  dataInput,
  options,
  placeholder = "Vælg…",
  defaultValue,
}: {
  label: string;
  dataInput: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold pl-2">{label}</p>

      <select
        data-input={dataInput}
        defaultValue={defaultValue ?? ""}
        className="h-[40px] rounded-md border border-(--black)/20 px-3"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        <option value="">Alle</option>
      </select>
    </div>
  );
}

/* ------------------------- Input Wrapper -------------------------- */
function InputBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold pl-2">{label}</p> {children}
    </div>
  );
}

/* ------------------------- Accordion Section -------------------------- */
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
        className={` transition-all duration-300 overflow-hidden ${
          open ? "max-h-[1000] p-4" : "max-h-0 px-4"
        } `}
      >
        {children}
      </div>
    </div>
  );
}
