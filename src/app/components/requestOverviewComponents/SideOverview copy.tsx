"use client";

import type { Request } from "../RequestContent";
import { MdInbox } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import ButtonOne from "../utilityComponents/ButtonOne";
import SetSideStatus from "./SetSideStatus";
import SideComments from "./SideComments";

type Props = {
  request: Request | null;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
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
        <p className="text-2xl text-(--black)/60">Vælg en ansøgning</p>
        <MdInbox className="text-8xl text-(--black)/20" />
      </div>
    );
  }

  /* ---------------- LOCAL STATE ---------------- */
  const [marked, setMarked] = useState(false);

  /* ---------------- CONTENT ---------------- */
  return (
    <div className="bg-white">
      <div key={request.id} className="p-5 h-full animate-slide-fade-in">
        <div className="bg-white flex flex-col h-full p-6 border-2 border-black/20 rounded-[5px]">
          {/* HEADER */}
          <div className="mb-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold">{request.name}</h1>

              <div className="self-end scale-y-110 mb-[5px]">
                {!marked ? (
                  <FaRegBookmark
                    onClick={() => setMarked(true)}
                    className="text-[33px] opacity-65 cursor-pointer"
                  />
                ) : (
                  <FaBookmark
                    onClick={() => setMarked(false)}
                    className="text-[33px] text-(--contrast) cursor-pointer"
                  />
                )}
                <IoCloseOutline
                  onClick={() => setSelectedId(null)}
                  className="text-[40px] mt-[-4]"
                />
              </div>
            </div>
          </div>

          {/* LOAN DETAILS */}
          <div className="space-y-6">
            <div className="flex gap-2">
              <h1 className="font-semibold text-[25px]!">Status:</h1>

              <h1
                className={`font-semibold text-[25px]!
            ${request.status === "Godkendt" && "text-green-500"}
            ${request.status === "Afslået" && "text-red-500"}
            ${request.status === "Pending" && "text-blue-500"}
          `}
              >
                {request.status}
              </h1>
            </div>
            <Info
              label="Lånebeløb"
              value={`${request.amount.toLocaleString("da-DK")} kr.`}
            />

            <Info label="Gældsfaktor" value={request.gaeldsfaktor} />
            <Info label="Indkomst" value={request.indkomst} />

            <Info
              label="Rådighedsbeløb"
              value={`${request.postalCode} – ${request.raadighedsBeloeb}`}
            />
          </div>
          <div className="mt-6">
            <SideComments />
          </div>
          {/* STATUS CONTROL */}
          <div className="my-4">
            <SetSideStatus request={request} setRequests={setRequests} />
          </div>

          {/* ACTION */}
          <div className="mt-auto mb-0">
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

/* ---------------- INFO ROW ---------------- */
function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-(--black)/10 pb-2">
      <span className="text-(--black)/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
