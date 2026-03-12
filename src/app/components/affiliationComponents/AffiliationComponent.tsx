"use client";

import AffiliationItem from "./AffiliationItem";
import NewAffiliation from "./NewAffiliation";

import type { Bank } from "@/app/types/filial";

type Props = {
  setSection: React.Dispatch<React.SetStateAction<string>>;
  banks: Bank[];
};

const AffiliationComponent = ({ setSection, banks }: Props) => {
  const bank = banks.find((b) => b.id === 1);

  return (
    <div className="flex flex-col pt-[25] bg-white h-full">
      {/* HEADER */}
      <div
        className="grid 
        grid-cols-[minmax(0,220px)_minmax(0,175px)_minmax(0,140px)_minmax(0,175px)]
        border-(--black)/10 border-b-2 pl-10 h-[40] text-(--black)/60 gap-2"
      >
        <h3>Filial</h3>
        <h3>Område</h3>
        <h3 className="truncate w-fit">Antal Behandlere</h3>
        <h3></h3>
      </div>

      {/* LIST */}
      <div className="flex flex-col overflow-y-auto my-container mb-auto">
        {!bank?.affiliations.length && (
          <div
            className="
            grid border-(--black)/10 border-b-2 pl-10 h-[40] text-(--black)/40
            "
          >
            <h3 className="my-auto italic">Ingen filialer oprettet endnu</h3>
          </div>
        )}

        {bank?.affiliations.map((aff) => {
          const regionText =
            aff.area.regions.length > 0
              ? aff.area.regions.join(", ")
              : `${aff.area.postcodes.length} postnumre`;

          return (
            <AffiliationItem
              key={aff.id}
              name={aff.name}
              region={regionText}
              members={0}
            />
          );
        })}

        {/* NEW */}
        <div onClick={() => setSection("AffiliationSetup")}>
          <NewAffiliation />
        </div>
      </div>
    </div>
  );
};

export default AffiliationComponent;
