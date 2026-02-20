"use client";

import type { Request } from "../RequestContent";

type Props = {
  request: Request | null;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  setSection: React.Dispatch<React.SetStateAction<String>>;
};

export default function SideOverview({
  request,
  setRequests,
  setSection,
}: Props) {
  if (!request) {
    return (
      <div className="flex items-center justify-center bg-white">
        <p className="text-(--black)/50">Vælg en ansøgning</p>
      </div>
    );
  }
  return (
    <div className="relative text-(--black) overflow-hidden bg-white">
      <div className="relative z-10 p-8 px-10">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 items-center justify-between">
          {/* Floating Score Badge */}
          <div className="relative group w-full">
            <div className="absolute inset-0  transition" />
            <div className="relative px-4 py-6 bg-(--light-prime) lk-inner-shadow rounded-[5px] flex flex-col items-center gap-4">
              <div className=" self-start grid">
                <h1 className="text-4xl! font-bold tracking-tight text-(--white)!">
                  {request.name}
                </h1>
                <p className="mt-2 text-(--white)/80!">{request.email}</p>
              </div>
              <div className="relative px-8 py-6 bg-(--light-prime) rounded-[5px] flex items-center gap-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-(--white)!">
                  Credit Score:
                </p>
                <p className="text-4xl font-bold text-3xl! text-(--white)!">
                  {request.score}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-6">
          {/* Glass Card Component */}
          <div
            className={`bg-(--light-prime) p-4 lk-inner-shadow rounded-[5px] py-6`}
          >
            <div className="grid">
              <h2 className="text-3xl! font-semibold! mb-8 text-(--white) col-end-1 row-end-1 z-20">
                Låne Detaljer
              </h2>
              <div className="h-[45] w-[260] ml-[-30px] col-end-1 row-end-1 bg-(--contrast) z-10"></div>
            </div>

            <div className="grid gap-4 max-w-[500px]">
              <div className="[&>*>*]:text-2xl!  [&>*]:flex [&>*]:justify-between">
                <Info
                  label="Lånebeløb:"
                  value={`${request.amount.toLocaleString("da-DK")} kr.`}
                />
              </div>
              <div className=" [&>*]:flex [&>*]:justify-between">
                <Info label="Lånetype:" value={request.forWhat} />
              </div>
              <div className=" [&>*]:flex [&>*]:justify-between">
                <Info label="Adresse:" value={request.location} />
              </div>
              <div className="  [&>*]:flex [&>*]:justify-between">
                <Info
                  label="Postnr / Region:"
                  value={`${request.postalCode} – ${request.region}`}
                />
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => setSection("person")}>hej</button>
      </div>
    </div>
  );
}

/* Mini Info Component */
function Info({ label, value }: { label: string; value: any }) {
  return (
    <div className="group">
      <p className="text-(--white)! uppercase tracking-widest text-(--white)/60 mb-1">
        {label}
      </p>
      <p className="text-(--white)! font-semibold group-hover:text-(--contrast) transition-colors duration-200">
        {value}
      </p>
    </div>
  );
}
