"use client";

import type { Request } from "@/app/types/request";
import { MdInbox } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import ButtonOne from "../utilityComponents/ButtonOne";
import SetSideStatus from "./SetSideStatus";
import Comments from "./Comments";

const MY_AGENT_ID = 2;

type Props = {
  request: Request | null;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  toggleFlag: (id: number) => void;
};

export default function SideOverview({
  request,
  setSection,
  setRequests,
  setSelectedId,
  toggleFlag,
}: Props) {
  if (!request) {
    return (
      <div className="flex items-center justify-center bg-white h-full flex-col">
        <p className="text-2xl text-(--black)/60">Vælg en ansøgning</p>
        <MdInbox className="text-8xl text-(--black)/20" />
      </div>
    );
  }

  const isMine = request.flagged === MY_AGENT_ID;
  const isTakenByOther =
    request.flagged !== null && request.flagged !== MY_AGENT_ID;

  return (
    <div className="bg-white">
      <div key={request.id} className="p-5 h-full animate-slide-fade-in">
        <div className="bg-white flex flex-col h-full p-6 border-2 border-black/20 rounded-[5px]">
          <div className="mb-5 flex justify-between items-start">
            <h1 className="text-4xl font-bold text-(--black)">
              {request.name}
            </h1>

            <div className="flex items-center gap-3">
              {/*               {!isTakenByOther &&
                (isMine ? (
                  <FaBookmark
                    onClick={() => toggleFlag(request.id)}
                    className="text-[28px] text-(--contrast) cursor-pointer"
                  />
                ) : (
                  <FaRegBookmark
                    onClick={() => toggleFlag(request.id)}
                    className="text-[28px] opacity-65 cursor-pointer"
                  />
                ))} */}

              <IoCloseOutline
                onClick={() => setSelectedId(null)}
                className="text-[32px] cursor-pointer"
              />
            </div>
          </div>

          {/* LOAN DETAILS */}
          <div className="space-y-6">
            <div className="flex gap-2">
              <h1 className="font-semibold text-[25px]! text-(--black)">
                Status:
              </h1>

              <h1
                className={`font-semibold text-[25px]!
            ${request.status === "Behandles" && "text-yellow-400"}
            ${request.status === "Godkendt" && "text-green-500"}
            ${request.status === "Afslået" && "text-red-500"}
            ${request.status === "Afventer" && "text-blue-500"}
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
          <div className="mt-auto flex flex-col gap-1">
            <div className="mb-4">
              <Comments large={false} />
            </div>

            <SetSideStatus
              request={request}
              setRequests={setRequests}
              toggleFlag={toggleFlag}
            />

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

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-(--black)/10 pb-2">
      <span className="text-(--black)/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
