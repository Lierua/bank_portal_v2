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
        <h3 className="pl-5 text-(--black)/60 my-auto mt-1">Søgeagenter</h3>
        <div className="pb-4 flex pl-5 gap-5 flex-wrap">
          {["Middelfart", "Aarhus", "København"].map((a) => (
            <div className="flex gap-2 items-center" key={a}>
              <div
                className="px-6 py-1 w-full bg-(--contrast) text-white rounded-full self-end mt-auto
              transition-all duration-100 ease-in hover:shadow-[inset_0_-30px_60px_-30px_var(--light-contrast)]
              text-center"
              >
                {a}
              </div>
              <VscSettings
                onClick={() =>
                  setShowExtraFilters(showExtraFilters === a ? "closed" : a)
                }
                className={`pt-1 text-4xl cursor-pointer transition-colors 
                  ${showExtraFilters === a ? "text-(--contrast) translate(-1,-1)" : "text-(--black)"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
