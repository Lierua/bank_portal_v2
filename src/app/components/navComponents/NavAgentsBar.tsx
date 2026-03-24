import Image from "next/image";

import { useState } from "react";
import AgentButtons from "./AgentButtons";

export default function NavAgentsBar({
  showExtraFilters,
  setShowExtraFilters,
}: {
  showExtraFilters: String;
  setShowExtraFilters: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [active, setActive] = useState<string>("");
  return (
    <div className="grid grid-cols-[70px_1fr]">
      <div
        className={`bg-(--prime) ${showExtraFilters == "closed" && "rounded-bl-lg"}`}
      />
      <div className="flex items-center mb-2">
        <h3 className="pl-5 text-(--black)/60 my-auto mb-2">Søgeagenter</h3>
        <div className="flex pl-5 gap-5 flex-wrap">
          {["Middelfart", "Aarhus", "København"].map((a) => (
            <AgentButtons
              label={a}
              active={active}
              setActive={setActive}
              setShowExtraFilters={setShowExtraFilters}
              showExtraFilters={showExtraFilters}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
