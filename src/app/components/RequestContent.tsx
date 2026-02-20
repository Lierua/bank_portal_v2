"use client";

import { FaRegFileAlt, FaRegFileArchive } from "react-icons/fa";
import { useState, useMemo } from "react";

import RequestStatusFilter from "./requestOverviewComponents/RequestStatusFilter";
import RequestList from "./requestOverviewComponents/RequestList";
import IndividualOverview from "./requestOverviewComponents/IndividualOverview";
import rawRequests from "@/data/dummyRequests.json";
import SideOverview from "./requestOverviewComponents/SideOverview";
import SideOverviewCopy from "./requestOverviewComponents/SideOverview copy";
import RequestStatusFilterCopy from "./requestOverviewComponents/RequestStatusFilter copy";

/* =========================
   Backend JSON Type
========================= */

export type RawRequest = {
  id: number;
  loanDetails: {
    score: number;
    amount: number;
    purpose: {
      loanKind: string;
      location: {
        address: string;
        postalCode: string;
        region: string;
      };
    };
  };
  personalInfo: {
    name: string;
    housingSituation: string;
    email: string;
  };
  employment: {
    jobTitle: string;
    jobStatus: string;
    educationLevel: string;
  };
  economicData: {
    monthlyIncome: number;
    fixedExpenses: number;
    wealth: number;
    debts: number;
  };
  status: string;
};

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
  status: "Godkendt" | "Afslået" | "Pending";
  indkomst: number;
  raadighedsBeloeb: number;
  gaeldsfaktor: number;
  opsparing: number;
};

/* =========================
   Component
========================= */

const RequestContent = ({ search }: { search: string }) => {
  const [requestPara, setRequestPara] = useState("Alle");
  const [section, setSection] = useState("Ansøgninger");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const mapStatus = (status: string): Request["status"] => {
    switch (status) {
      case "Approved":
        return "Godkendt";
      case "Rejected":
        return "Afslået";
      default:
        return "Pending";
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
      };
    }),
  );

  const selectedRequest =
    selectedId !== null
      ? (requests.find((r) => r.id === selectedId) ?? null)
      : null;

  return (
    <div className="body-banner rounded-tl-lg overflow-hidden flex-1 h-[calc(100dvh-120px)] lk-box-shadow">
      {/* Top Menu */}
      <div className="bg-(--prime) banner-rows lk-box-shadow z-20">
        <FaRegFileAlt
          onClick={() => {
            setSelectedId(null);
            setSection("Ansøgninger");
          }}
          className="text-(--white) text-4xl row-2 mx-auto mt-2 cursor-pointer"
        />
        <FaRegFileArchive
          onClick={() => {
            setSelectedId(null);
            setSection("Arkiv");
          }}
          className="text-(--white) text-4xl row-3 mx-auto mt-2 cursor-pointer"
        />
      </div>

      <div className="bg-(--light-prime) banner-rows lk-inner-shadow">
        <div className="row-2 h-full items-center grid group relative">
          <p
            onClick={() => {
              setSelectedId(null);
              setSection("Ansøgninger");
            }}
            className="pl-[10px] my-auto text-(--white)! z-11 font-semibold cursor-pointer row-1 col-1"
          >
            Ansøgninger
          </p>
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] mb-[-2px] 
              origin-left ${section === "Ansøgninger" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} 
              w-[150px] h-[40px] z-10 bg-(--contrast) row-1 col-1`}
          ></div>
        </div>
        <div className="row-3 h-full items-center grid group relative">
          <p
            onClick={() => {
              setSelectedId(null);
              setSection("Arkiv");
            }}
            className="pl-[10px] my-auto text-(--white)! z-11 font-semibold cursor-pointer row-1 col-1"
          >
            Arkiv
          </p>
          <div
            className={`transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] mb-[-2px] 
              origin-left ${section === "Arkiv" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} 
              w-[150px] h-[40px] z-10 bg-(--contrast) row-1 col-1`}
          ></div>
        </div>
      </div>

      {/* Show Individual */}
      {selectedRequest && section == "person" && (
        <IndividualOverview
          request={selectedRequest}
          setRequests={setRequests}
          setSection={setSection}
        />
      )}

      {/* Show List */}
      {section === "Ansøgninger" && (
        <div className="grid grid-cols-[4fr_2fr]">
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
            />
          </div>

          <SideOverviewCopy request={selectedRequest} setSection={setSection} />
        </div>
      )}
    </div>
  );
};

export default RequestContent;
