import type { SearchAgent } from "@/app/types/filial";
import AgentButtons from "./AgentButtons";
import { FaPlus } from "react-icons/fa";

type Props = {
  agents: SearchAgent[];

  activeAgent: SearchAgent | null;
  setActiveAgent: React.Dispatch<React.SetStateAction<SearchAgent | null>>;

  showExtraFilters: string;
  setShowExtraFilters: React.Dispatch<React.SetStateAction<string>>;
};

export default function NavAgentsBar({
  agents,
  activeAgent,
  setActiveAgent,
  showExtraFilters,
  setShowExtraFilters,
}: Props) {
  return (
    <div className="grid grid-cols-[70px_1fr]">
      <div
        className={`bg-(--prime) ${
          showExtraFilters === "closed" && "rounded-bl-lg"
        }`}
      />

      <div className="flex items-center mb-2">
        <h3 className="pl-5 text-(--black)/60 my-auto mb-2">Søgeagenter</h3>

        <div className="flex pl-5 gap-5 flex-wrap items-center">
          {(agents ?? []).map((agent) => (
            <AgentButtons
              key={agent.id}
              agent={agent}
              activeAgent={activeAgent}
              setActiveAgent={setActiveAgent}
              setShowExtraFilters={setShowExtraFilters}
              showExtraFilters={showExtraFilters}
            />
          ))}

          {/*           <div className="rounded-full h-[33] w-[3] bg-(--contrast)"></div> */}

          {/* plus button */}
          <div
            onClick={() =>
              showExtraFilters === "closed"
                ? setShowExtraFilters("add")
                : setShowExtraFilters("closed")
            }
            className="grid cursor-pointer transition-scale hover:scale-[1.1] duration-200 ease-[cubic-bezier(.34,2,.64,1)]"
          >
            <FaPlus
              className={`my-auto w-[22] h-[22] text-(--contrast)
                ${showExtraFilters === "add" ? "rotate-45" : ""}
                transition-all duration-100 ease-in`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
