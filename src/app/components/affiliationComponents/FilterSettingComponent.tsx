"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import InputFilter from "../utilityComponents/InputFilter";

/* -------------------------
   Select Filter
-------------------------- */
function SelectFilter({
  label,
  dataInput,
  options,
  placeholder = "Vælg…",
}: {
  label: string;
  dataInput: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold pl-2">{label}</p>

      <select
        data-input={dataInput}
        defaultValue=""
        className="h-[40] rounded-md border border-(--black)/20 px-3"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        <option value="">Alle</option>

        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

/* -------------------------
   Input Wrapper
-------------------------- */
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

/* -------------------------
   Accordion Section
-------------------------- */
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
        className={`
          transition-all duration-300 overflow-hidden
          ${open ? "max-h-[1000] p-4" : "max-h-0 px-4"}
        `}
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------------
   MAIN PANEL
-------------------------- */
export default function ExtraFiltersPanel({ show }: { show: string }) {
  return (
    <div
      className={`
        grid grid-cols-[70px_1fr]
        overflow-hidden transition-all duration-300
        ${show != "closed" ? "max-h-[800]" : "max-h-0"}
      `}
    >
      <div className="bg-(--prime) rounded-bl-lg" />

      {/* CONTENT */}
      <div className="pb-5 px-5 pt-4 space-y-4 overflow-y-auto">
        {/* LOAN */}
        <FilterSection title="Lån">
          <div className="grid grid-cols-5 gap-7">
            <InputBlock label="Lånebeløb (min)">
              <InputFilter dataInput="loanAmountMin" type="number" />
            </InputBlock>

            <SelectFilter
              label="Låneformål"
              dataInput="loanKind"
              options={["Bolig", "Andet"]}
            />
          </div>
        </FilterSection>

        <FilterSection title="Bolig">
          <div className="grid grid-cols-5 gap-7">
            <SelectFilter
              label="Boligtype"
              dataInput="Bolig type"
              options={["Ejerbolig", "Andelsbolig", "Sommerhus"]}
            />

            <SelectFilter
              label="Affiliate"
              dataInput="affiliate"
              options={["H", "MJY", "NJ", "SD", "SYD"]}
            />

            <InputBlock label="Postnummer">
              <InputFilter dataInput="postalCode" type="text" />
            </InputBlock>
          </div>
        </FilterSection>

        {/* ECONOMY */}
        <FilterSection title="Økonomi">
          <div className="grid grid-cols-5 gap-7">
            <InputBlock label="Indkomst (min)">
              <InputFilter dataInput="incomeMin" type="number" />
            </InputBlock>

            {/*             <InputBlock label="Indkomst (max)">
              <InputFilter dataInput="incomeMax" type="number" />
            </InputBlock> */}

            <InputBlock label="Faste udgifter (max)">
              <InputFilter dataInput="fixedExpensesMax" type="number" />
            </InputBlock>

            <InputBlock label="Formue (min)">
              <InputFilter dataInput="wealthMin" type="number" />
            </InputBlock>
            <InputBlock label="Gæld (max)">
              <InputFilter dataInput="debtsMax" type="number" />
            </InputBlock>
          </div>
        </FilterSection>

        {/* PERSON */}
        <FilterSection title="Personlige oplysninger">
          <div className="grid grid-cols-5 gap-7">
            <SelectFilter
              label="Uddannelse"
              dataInput="educationLevel"
              options={["HighSchool", "Vocational", "Bachelor", "Master"]}
            />

            <SelectFilter
              label="Jobstatus"
              dataInput="jobStatus"
              options={["FullTime", "PartTime", "SelfEmployed"]}
            />

            <SelectFilter
              label="Boligsituation"
              dataInput="housingSituation"
              options={["Lejer", "Ejer"]}
            />
          </div>
        </FilterSection>

        {/* ACTIONS */}
        <div className="flex gap-3 justify-end pt-2">
          <button className="px-4 py-2 rounded-md border border-(--black)/20 hover:bg-(--black)/5">
            Nulstil
          </button>

          <button className="px-4 py-2 rounded-md bg-(--contrast) text-white">
            Anvend filtre
          </button>
        </div>
      </div>
    </div>
  );
}
