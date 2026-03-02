"use client";

import type { Request } from "../RequestContent";
import { MdInbox } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import ButtonOne from "../utilityComponents/ButtonOne";

type Props = {
  request: Request | null;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function SideOverview({
  request,
  setSection,
  setSelectedId,
}: Props) {
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
        <div className="bg-white flex flex-col h-full p-6 border-2 border-black/20 rounded-[5px]">
          {/* HEADER */}
          <div className="mb-10 flex flex-col gap-4 h-fit">
            <div className="flex justify-between gap-4 items-start ">
              <h1 className="text-4xl! font-bold">{request.name}</h1>
              <div className=" self-end mb-[5] flex gap-2">
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
                <IoCloseOutline
                  onClick={() => setSelectedId(null)}
                  className="text-[40px] mt-[-4]"
                />
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

            <Info label="Gældsfaktor" value={request.gaeldsfaktor} />
            <Info label="Indkomst" value={request.indkomst} />
            <Info
              label="RådighedsBeloeb"
              value={`${request.postalCode} – ${request.raadighedsBeloeb}`}
            />
            <div className="mt-12 [&>*>*]:text-xl!">
              <Info label="Uddannelse" value={`${request.educationLevel}`} />
            </div>
            <Info
              label="JobTitle / JobStatus"
              value={`${request.jobTitle} – ${request.jobStatus}`}
            />
            <Info
              label="Postnr / Region"
              value={`${request.postalCode} – ${request.region}`}
            />
          </div>

          {/* ACTION */}
          <div className="mt-auto mb-6">
            <ButtonOne
              label="Se detaljer"
              onClick={() => setSection("person")}
            />
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
