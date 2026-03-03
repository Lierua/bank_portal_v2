import { VscSettings } from "react-icons/vsc";

export default function NavAgentsBar({
  showExtraFilters,
  setShowExtraFilters,
}: {
  showExtraFilters: String;
  setShowExtraFilters: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="grid grid-cols-[70px_1fr]">
      <div
        className={`bg-(--prime) ${showExtraFilters == "closed" && "rounded-bl-lg"}`}
      />
      <div className="flex items-center">
        <h3 className="pl-5 font-semibold! text-(--prime) mb-auto">
          Søgeagenter
        </h3>
        <div className="pb-4 flex pl-5 gap-5 flex-wrap">
          {["Middelfart", "Aarhus", "København"].map((a) => (
            <div className="flex gap-2 items-center" key={a}>
              <div
                className="font-semibold! px-4 py-1 cursor-pointer border-3 border-(--prime) rounded-[8] text-(--prime)! px-2 items-center
          hover:bg-(--contrast) hover:border-(--contrast) hover:text-white! transition-all duration-200 ease-in"
              >
                {a}
              </div>
              <VscSettings
                onClick={() =>
                  setShowExtraFilters(showExtraFilters === a ? "closed" : a)
                }
                className={`text-3xl cursor-pointer transition-colors 
                  ${showExtraFilters === a ? "text-(--contrast) translate(-1,-1)" : "text-(--black)"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
