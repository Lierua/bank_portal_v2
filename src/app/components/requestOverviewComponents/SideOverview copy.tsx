"use client";

import type { Request } from "../RequestContent";
import { MdInbox } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { useState } from "react";

type Props = {
  request: Request | null;
  setSection: React.Dispatch<React.SetStateAction<string>>;
};
export default function SideOverview({ request, setSection }: Props) {
  /* EMPTY STATE */
  if (!request) {
    return (
      <div className="flex items-center justify-center bg-white h-full flex-col">
        <p className="text-2xl! text-(--black)/60!">Vælg en ansøgning</p>
        <MdInbox className="text-8xl text-(--black)/20" />
      </div>
    );
  }
  const [marked, setMarked] = useState(false);

  /* CONTENT STATE */
  return (
    <div className="bg-white">
      <div
        key={request ? request.id : "empty"}
        className={`p-5 h-full ${request ? "animate-slide-fade-in" : ""}`}
      >
        <div className="bg-white h-full p-6 border-2 border-black/20 rounded-[5px]">
          {/* HEADER */}
          <div className="mb-10 flex flex-col gap-4">
            <div className="flex justify-between gap-4 items-start ">
              <h1 className="text-4xl! font-bold">{request.name}</h1>
              <div className=" self-end scale-y-110 mb-[5]">
                {!marked ? (
                  <FaRegBookmark
                    onClick={() => setMarked(!marked)}
                    className="text-[33px] opacity-65"
                  />
                ) : (
                  <FaBookmark
                    onClick={() => setMarked(!marked)}
                    className="text-[33px] text-(--contrast)"
                  />
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border border-(--black)/10 rounded-[5px] px-4 py-3">
              <span className="text-sm uppercase tracking-wider text-(--black)/50">
                Credit Score
              </span>
              <span className="text-2xl font-bold text-(--contrast)">
                {request.score}
              </span>
            </div>
          </div>

          {/* LOAN DETAILS */}
          <div className="space-y-6">
            <h2 className="text-3xl! font-semibold">Opsummering</h2>

            <div className="[&>*>*]:text-2xl!">
              <Info
                label="Lånebeløb"
                value={`${request.amount.toLocaleString("da-DK")} kr.`}
              />
            </div>

            <Info label="Lånetype" value={request.forWhat} />
            <Info label="Adresse" value={request.location} />
            <Info
              label="Postnr / Region"
              value={`${request.postalCode} – ${request.region}`}
            />
          </div>

          {/* ACTION */}
          <div className="mt-[80px]">
            <button
              onClick={() => setSection("person")}
              className="
              transition-all duration-200 ease-in
              cursor-pointer text-white
              hover:bg-(--contrast)/70
              rounded-full bg-(--contrast)
              py-1 px-8
            "
            >
              Se detaljer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Clean Info Component */
function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-(--black)/10 pb-2">
      <span className="text-(--black)/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
