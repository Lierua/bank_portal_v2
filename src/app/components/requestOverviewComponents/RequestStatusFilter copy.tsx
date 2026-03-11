"use client";

type Props = {
  requestPara: string;
  setRequestPara: React.Dispatch<React.SetStateAction<string>>;
};

type FilterItem = {
  label: string;
  value: string;
  count: number;
  activeBg: string;
  inactiveBg: string;
};

/* ======================
   Filter Config
====================== */

const filters: FilterItem[] = [
  {
    label: "Alle",
    value: "Alle",
    count: 101,
    activeBg: "bg-(--prime)",
    inactiveBg: "bg-(--prime)/90",
  },
  {
    label: "Afventer",
    value: "Afventer",
    count: 101,
    activeBg: "bg-(--light-prime)",
    inactiveBg: "bg-(--light-prime)/90",
  },
  {
    label: "Godkendt",
    value: "Godkendt",
    count: 101,
    activeBg: "bg-green-500",
    inactiveBg: "bg-green-400",
  },
  {
    label: "Afslået",
    value: "Afslået",
    count: 101,
    activeBg: "bg-red-500",
    inactiveBg: "bg-red-400",
  },
];

export default function RequestStatusFilterCopy({
  requestPara,
  setRequestPara,
}: Props) {
  return (
    <div className="flex gap-3 items-end pl-10 pt-5">
      {filters.map((filter) => {
        const active = requestPara === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => setRequestPara(filter.value)}
            className={`
              w-[180] h-[100]
              px-4 py-2 rounded-[10]
              grid content-between text-left

              transition-all duration-200 ease-in
              cursor-pointer select-none

              ${active ? filter.activeBg : filter.inactiveBg}
              hover:brightness-110

              shadow-[inset_0_-30px_60px_-30px_rgba(0,0,0,0.35)]
            `}
          >
            <h3
              className={`
                text-[17px]! font-semibold! text-white transition
                ${active ? "" : "text-white/60"}
              `}
            >
              {filter.label}
            </h3>

            <h1
              className={`
                text-2xl font-bold! text-white transition
                ${active ? "" : "text-white/60"}
              `}
            >
              {filter.count}
            </h1>
          </button>
        );
      })}
    </div>
  );
}
