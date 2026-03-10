"use client";

import { FaRegFileAlt, FaRegFileArchive } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useState, useEffect } from "react";

import RequestList from "./requestOverviewComponents/RequestList";
import IndividualOverview from "./individualComponents/IndividualOverview";
import SideOverviewCopy from "./requestOverviewComponents/SideOverview copy";
import RequestStatusFilterCopy from "./requestOverviewComponents/RequestStatusFilter copy";
import MyRequestList from "./requestOverviewComponents/MyRequestList";

import {
  toggleRequestHandler,
  getRequests,
} from "@/app/services/requestService";
import { useUser } from "@/app/hooks/useUser";

/* =========================
   UI Type
========================= */

export type Request = {
  id: number;
  name: string;
  amount: number;
  forWhat: string;
  location: string;
  postalCode: string;
  region: string;
  score: number;
  jobTitle: string;
  jobStatus: string;
  educationLevel: string;
  housingSituation: string;
  email: string;
  status: "Godkendt" | "Afslået" | "Afventer" | "Behandles";
  indkomst: number;
  raadighedsBeloeb: number;
  gaeldsfaktor: number;
  opsparing: number;
  budget?: {
    totalPlanned: number;
    createdAt: string;
    lines: {
      id: string;
      categoryKey: string;
      displayName: string;
      plannedAmount: number;
      avg: number;
      lowRange: number;
      highRange: number;
    }[];
  };
  flagged: string | null;
  handlerName?: string | null;
};

/* =========================
   Component
========================= */

const RequestContent = ({ search }: { search: string }) => {
  const [requestPara, setRequestPara] = useState("Alle");
  const [section, setSection] = useState("Ansøgninger");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);

  const { profile } = useUser();

  /* =========================
   Fetch Supabase Data
========================= */
  useEffect(() => {
    (async () => {
      setRequests(await getRequests());
    })();
  }, []);

  /* =========================
     Selected Request
  ========================= */

  const selectedRequest =
    selectedId !== null
      ? (requests.find((r) => r.id === selectedId) ?? null)
      : null;

  /* =========================
     Toggle Handler
  ========================= */

  const toggleFlag = async (id: number) => {
    if (!profile?.id) return;

    const request = requests.find((r) => r.id === id);
    if (!request) return;

    const isCurrentlyMine = request.flagged === profile.id;

    const newHandlerId = isCurrentlyMine ? null : profile.id;
    const newHandlerName = isCurrentlyMine ? null : profile.full_name;

    const updated = await toggleRequestHandler(id, newHandlerId);
    if (!updated) return;

    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;

        let newStatus = r.status;

        if (!isCurrentlyMine && r.status === "Afventer") {
          newStatus = "Behandles";
        }

        if (isCurrentlyMine && r.status === "Behandles") {
          newStatus = "Afventer";
        }

        return {
          ...r,
          flagged: newHandlerId,
          handlerName: newHandlerName,
          status: newStatus,
        };
      }),
    );
  };

  return (
    <div className="body-banner rounded-tl-lg overflow-hidden h-[calc(100dvh-166px)] flex-1 lk-box-shadow">
      {/* Top Menu */}
      <div className="bg-(--prime) banner-rows lk-box-shadow z-20">
        <FaRegFileAlt
          onClick={() => {
            setSelectedId(null);
            setSection("Ansøgninger");
          }}
          className="text-(--white) text-4xl row-2 mx-auto mt-2 cursor-pointer"
        />
        <BsFillPersonLinesFill
          onClick={() => {
            setSelectedId(null);
            setSection("MineEmner");
          }}
          className="text-(--white) text-4xl row-3 mx-auto mt-2 cursor-pointer"
        />
        <FaRegFileArchive
          onClick={() => {
            setSelectedId(null);
            setSection("Arkiv");
          }}
          className="text-(--white) text-4xl row-4 mx-auto mt-2 cursor-pointer"
        />
      </div>

      <div className="bg-(--light-prime) banner-rows lk-inner-shadow">
        <div className="row-2 h-full items-center grid group relative">
          <p
            onClick={() => {
              setSelectedId(null);
              setSection("Ansøgninger");
            }}
            className="pl-[10] my-auto text-(--white)! z-11 font-semibold cursor-pointer row-1 col-1"
          >
            Ansøgninger
          </p>
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] mb-[-2]
            origin-left ${
              section === "Ansøgninger"
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }
            w-[150] h-[40] z-10 bg-(--contrast) row-1 col-1`}
          ></div>
        </div>

        <div className="row-3 h-full items-center grid group relative">
          <p
            onClick={() => {
              setSelectedId(null);
              setSection("MineEmner");
            }}
            className="pl-[10] my-auto text-(--white)! z-11 font-semibold cursor-pointer row-1 col-1"
          >
            Mine Emner
          </p>
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] mb-[-2]
            origin-left ${
              section === "MineEmner"
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }
            w-[150] h-[40] z-10 bg-(--contrast) row-1 col-1`}
          ></div>
        </div>

        <div className="row-4 h-full items-center grid group relative">
          <p
            onClick={() => {
              setSelectedId(null);
              setSection("Arkiv");
            }}
            className="pl-[10] my-auto text-(--white)! z-11 font-semibold cursor-pointer row-1 col-1"
          >
            Arkiv
          </p>
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] mb-[-2]
            origin-left ${
              section === "Arkiv"
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }
            w-[150] h-[40] z-10 bg-(--contrast) row-1 col-1`}
          ></div>
        </div>
      </div>

      {/* Individual view */}
      {selectedRequest && section === "person" && (
        <IndividualOverview
          request={selectedRequest}
          setRequests={setRequests}
          setSection={setSection}
          toggleFlag={toggleFlag}
        />
      )}

      {/* All requests */}
      {section === "Ansøgninger" && (
        <div
          className={`grid ${
            selectedRequest ? "grid-cols-[4fr_2fr]" : "grid-cols-[4fr_0fr]"
          }`}
        >
          <div className="bg-white grid grid-rows-[120px_1fr]">
            <RequestStatusFilterCopy
              requestPara={requestPara}
              setRequestPara={setRequestPara}
            />
            <RequestList
              search={search}
              requests={requests}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              toggleFlag={toggleFlag}
            />
          </div>

          {selectedRequest && (
            <SideOverviewCopy
              request={selectedRequest}
              setSection={setSection}
              setSelectedId={setSelectedId}
              setRequests={setRequests}
              toggleFlag={toggleFlag}
            />
          )}
        </div>
      )}

      {/* My requests */}
      {section === "MineEmner" && (
        <div
          className={`grid transition-all duration-800 ease-in ${
            selectedRequest ? "grid-cols-[4fr_2fr]" : "grid-cols-[4fr_0fr]"
          }`}
        >
          <div className="bg-white grid grid-rows-[120px_1fr]">
            <RequestStatusFilterCopy
              requestPara={requestPara}
              setRequestPara={setRequestPara}
            />
            <MyRequestList
              search={search}
              requests={requests}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              toggleFlag={toggleFlag}
            />
          </div>

          {selectedRequest && (
            <SideOverviewCopy
              request={selectedRequest}
              setSection={setSection}
              setSelectedId={setSelectedId}
              setRequests={setRequests}
              toggleFlag={toggleFlag}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RequestContent;
