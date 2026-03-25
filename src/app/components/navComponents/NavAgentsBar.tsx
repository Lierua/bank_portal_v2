import type { SearchAgent } from "@/app/types/filial";
import AgentButtons from "./AgentButtons";

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

        <div className="flex pl-5 gap-5 flex-wrap">
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
        </div>
      </div>
    </div>
  );
}
