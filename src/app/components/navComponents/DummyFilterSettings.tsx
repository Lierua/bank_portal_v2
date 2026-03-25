"use client";

import { useState } from "react";
import MultiSelect from "../utilityComponents/formUtilities/MultiSelect";
import SearchableMultiSelect from "../utilityComponents/formUtilities/SearchMultiSelect";
import SelectFilter from "../utilityComponents/SelectFilter";
import InputBlock from "../utilityComponents/InputBlock";
import FilterSection from "../utilityComponents/FilterSection";
import InputFilter from "../utilityComponents/InputFilter";

export default function DummyFilterSettings() {
  /* ===== local UI only ===== */

  const [regions, setRegions] = useState<string[]>([]);
  const [kommuner, setKommuner] = useState<string[]>([]);
  const [postcodes, setPostcodes] = useState<string[]>([]);

  const [loanMin, setLoanMin] = useState("");
  const [incomeMin, setIncomeMin] = useState("");

  return (
    <div className="transition-all duration-300">
      <div className="pb-5 space-y-4">
        {/* ================= LÅN ================= */}

        <FilterSection title="Lån">
          <div className="grid grid-cols-4 gap-7">
            <InputBlock label="Lånebeløb (min)">
              <InputFilter
                dataInput=""
                type="number"
                value={loanMin}
                onChange={(e) => setLoanMin(e.target.value)}
              />
            </InputBlock>

            <SelectFilter
              label="Boligtype"
              dataInput="housingType"
              options={["Ejerbolig", "Andelsbolig", "Sommerhus"]}
            />
          </div>
        </FilterSection>

        {/* ================= MARKEDSOMRÅDE ================= */}

        <FilterSection title="Markedsområde">
          <div className="flex flex-col gap-2">
            <p className="font-semibold pl-2">Region</p>

            <MultiSelect
              options={[
                { value: "KBH", label: "København" },
                { value: "SJL", label: "Sjælland" },
                { value: "FYN", label: "Fyn" },
              ]}
              value={regions}
              onChange={setRegions}
              placeholder="Vælg region"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold pl-2">Kommune</p>

            <SearchableMultiSelect
              options={[
                { value: "København", label: "København" },
                { value: "Odense", label: "Odense" },
                { value: "Aarhus", label: "Aarhus" },
              ]}
              value={kommuner}
              onChange={setKommuner}
              placeholder="Vælg kommune"
              searchLabel="Søg kommune..."
            />
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <p className="font-semibold pl-2">Postnumre</p>

            <SearchableMultiSelect
              options={[
                { value: "1000", label: "1000 København K" },
                { value: "5000", label: "5000 Odense" },
                { value: "8000", label: "8000 Aarhus" },
              ]}
              value={postcodes}
              onChange={setPostcodes}
              placeholder="Vælg postnummer"
              searchLabel="Søg postnummer..."
            />
          </div>
        </FilterSection>

        {/* ================= ØKONOMI ================= */}

        <FilterSection title="Økonomi">
          <div className="grid grid-cols-4 gap-7">
            <InputBlock label="Indkomst (min.)">
              <InputFilter
                dataInput=""
                type="number"
                value={incomeMin}
                onChange={(e) => setIncomeMin(e.target.value)}
              />
            </InputBlock>

            <InputBlock label="Faste udgifter (maks.)">
              <InputFilter dataInput="" type="number" />
            </InputBlock>

            <InputBlock label="Formue (min.)">
              <InputFilter dataInput="" type="number" />
            </InputBlock>

            <InputBlock label="Gæld (maks.)">
              <InputFilter dataInput="" type="number" />
            </InputBlock>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
