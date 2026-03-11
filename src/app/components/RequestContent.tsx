"use client";

import { useState } from "react";
import { FaRegFileAlt, FaRegFileArchive } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { RiListSettingsLine } from "react-icons/ri";

import RequestList from "./requestOverviewComponents/RequestList";
import IndividualOverview from "./individualComponents/IndividualOverview";
import SideOverviewCopy from "./requestOverviewComponents/SideOverview copy";
import RequestStatusFilterCopy from "./requestOverviewComponents/RequestStatusFilter copy";
import MyRequestList from "./requestOverviewComponents/MyRequestList";
import AffiliationComponent from "./affiliationComponents/AffiliationComponent";
import AffiliationSetup from "./affiliationComponents/affiliationSetup/AffiliationSetup";

import rawRequests from "@/data/dummyRequests.json";

import type { RawRequest, Request } from "@/app/types/request";
import type { Bank, FilialAgent } from "@/app/types/filial";

/* =========================
   Component
========================= */

const RequestContent = ({ search }: { search: string }) => {
  const [requestPara, setRequestPara] = useState("Alle");
  const [section, setSection] = useState("Ansøgninger");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [banks, setBanks] = useState<Bank[]>([
    {
      id: 1,
      name: "Middelfart",
      affiliations: [],
    },
  ]);

  const mapStatus = (status: string): Request["status"] => {
    switch (status) {
      case "Approved":
        return "Godkendt";
      case "Rejected":
        return "Afslået";
      case "UnderReview":
        return "Behandles";
      default:
        return "Afventer";
    }
  };

  /* =========================
     Transform JSON → UI Data
  ========================= */

  const [requests, setRequests] = useState<Request[]>(
    (rawRequests as RawRequest[]).map((r) => {
      const disposableIncome =
        r.economicData.monthlyIncome - r.economicData.fixedExpenses;

      const debtFactor =
        r.economicData.monthlyIncome > 0
          ? r.loanDetails.amount / r.economicData.monthlyIncome
          : 0;

      return {
        id: r.id,
        name: r.personalInfo.name,
        amount: r.loanDetails.amount,
        forWhat: r.loanDetails.purpose.loanKind,
        location: r.loanDetails.purpose.location.address,
        postalCode: r.loanDetails.purpose.location.postalCode,
        region: r.loanDetails.purpose.location.region,
        score: r.loanDetails.score,
        jobTitle: r.employment.jobTitle,
        jobStatus: r.employment.jobStatus,
        educationLevel: r.employment.educationLevel,
        housingSituation: r.personalInfo.housingSituation,
        email: r.personalInfo.email,
        status: mapStatus(r.status),
        indkomst: r.economicData.monthlyIncome,
        raadighedsBeloeb: disposableIncome,
        gaeldsfaktor: Number(debtFactor.toFixed(2)),
        opsparing: r.economicData.wealth,
        flagged: r.flagged ?? null,
        budget: r.economicData.budget
          ? {
              totalPlanned: r.economicData.budget.totalPlanned,
              createdAt: r.economicData.budget.createdAt,
              lines: r.economicData.budget.lines.map((l) => ({
                id: l.id,
                categoryKey: l.categoryKey,
                displayName: l.displayName,
                plannedAmount: l.plannedAmount,
                avg: l.avg,
                lowRange: l.lowRange,
                highRange: l.highRange,
              })),
            }
          : undefined,
      };
    }),
  );

  const selectedRequest =
    selectedId !== null
      ? (requests.find((r) => r.id === selectedId) ?? null)
      : null;

  const MY_AGENT_ID = 2;

  const toggleFlag = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;

        const isCurrentlyMine = r.flagged === MY_AGENT_ID;
        const newFlag = isCurrentlyMine ? null : MY_AGENT_ID;

        let newStatus = r.status;

        if (!isCurrentlyMine && r.status === "Afventer") {
          newStatus = "Behandles";
        }

        if (isCurrentlyMine && r.status === "Behandles") {
          newStatus = "Afventer";
        }

        return {
          ...r,
          flagged: newFlag,
          status: newStatus,
        };
      }),
    );
  };

  const addAffiliation = (agent: FilialAgent) => {
    setBanks((prev) =>
      prev.map((bank) =>
        bank.id === 1
          ? {
              ...bank,
              affiliations: [...bank.affiliations, agent],
            }
          : bank,
      ),
    );

    console.log("Updated banks:", banks);
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
        <RiListSettingsLine
          onClick={() => {
            setSelectedId(null);
            setSection("Affiliate");
          }}
          className="text-(--white) text-4xl row-5 mx-auto mt-2 cursor-pointer"
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
          />
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
          />
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
          />
        </div>

        <div className="row-5 h-full items-center grid group relative">
          <p
            onClick={() => {
              setSelectedId(null);
              setSection("Affiliate");
            }}
            className="pl-[10] my-auto text-(--white)! z-11 font-semibold cursor-pointer row-1 col-1"
          >
            Filial Setup
          </p>
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] mb-[-2]
              origin-left ${
                section === "Affiliate"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }
              w-[150] h-[40] z-10 bg-(--contrast) row-1 col-1`}
          />
        </div>
      </div>

      {/* Show Individual */}
      {selectedRequest && section === "person" && (
        <IndividualOverview
          request={selectedRequest}
          setRequests={setRequests}
          setSection={setSection}
          toggleFlag={toggleFlag}
        />
      )}

      {/* Ansøgninger */}
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

      {/* Mine Emner */}
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

      {/* Filial oversigt */}
      {section === "Affiliate" && (
        <AffiliationComponent setSection={setSection} banks={banks} />
      )}

      {/* Filial setup */}
      {section === "AffiliationSetup" && (
        <AffiliationSetup
          setSection={setSection}
          addAffiliation={addAffiliation}
        />
      )}
    </div>
  );
};

export default RequestContent;
