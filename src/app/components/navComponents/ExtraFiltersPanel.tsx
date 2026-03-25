"use client";

import InputFilter from "../utilityComponents/InputFilter";
import SelectFilter from "../utilityComponents/SelectFilter";
import InputBlock from "../utilityComponents/InputBlock";
import FilterSection from "../utilityComponents/FilterSection";

export default function ExtraFiltersPanel({ show }: { show: string }) {
  return (
    <div
      className={`
        grid grid-cols-[70px_1fr]
        overflow-hidden transition-all duration-300
        ${show != "closed" && show != "add" ? "max-h-[800]" : "max-h-0"}
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
              label="Region"
              dataInput="region"
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
