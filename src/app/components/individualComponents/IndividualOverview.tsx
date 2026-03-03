"use client";

import SetStatus from "./SetStatus";
import type { Request } from "../RequestContent";
import SideComments from "../requestOverviewComponents/SideComments";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useState } from "react";

type Props = {
  request: Request;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
};

export default function IndividualOverview({
  request,
  setRequests,
  setSection,
}: Props) {
  const formatKr = (value: number) => `${value.toLocaleString("da-DK")} kr.`;

  /* ---------------- LOCAL STATE ---------------- */
  const [marked, setMarked] = useState(false);
  return (
    <div className="min-h-screen bg-white p-10">
      {/* Back */}
      <button
        onClick={() => setSection("Ansøgninger")}
        className="mb-8 text-sm tracking-wide hover:text-(--contrast) transition"
      >
        ← Tilbage
      </button>

      {/* MAIN CARD */}
      <div className="border-2 border-black/20 rounded-[5px] p-8 space-y-8">
        {/* HEADER */}
        <div>
          <div className="flex justify-between items-start w-[450]">
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
            </div>
          </div>
          <p>{request.email}</p>
          <div className="mt-2">
            <SideComments />
          </div>
        </div>

        {/* LOAN DETAILS */}
        <Section title="Låne Detaljer">
          <Info label="Lånebeløb" value={formatKr(request.amount)} />
          <Info label="Lånetype" value={request.forWhat} />
          <Info label="Adresse" value={request.location} />
          <Info
            label="Postnr / Region"
            value={`${request.postalCode} – ${request.region}`}
          />
        </Section>

        {/* EMPLOYMENT */}
        <Section title="Beskæftigelse">
          <Info label="Stilling" value={request.jobTitle} />
          <Info label="Ansættelse" value={request.jobStatus} />
          <Info label="Uddannelse" value={request.educationLevel} />
          <Info label="Boligsituation" value={request.housingSituation} />
        </Section>

        {/* FINANCIAL */}
        <Section title="Økonomi">
          <Info label="Indkomst" value={formatKr(request.indkomst)} />
          <Info
            label="Rådighedsbeløb"
            value={formatKr(request.raadighedsBeloeb)}
          />
          <Info label="Gældsfaktor" value={request.gaeldsfaktor} />
          <Info label="Formue" value={formatKr(request.opsparing)} />
        </Section>

        {/* =========================
            BUDGET (NEW)
        ========================= */}
        {request.budget && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Budget Oversigt</h2>

            {/* Budget Summary */}
            <div className="border border-(--black)/10 rounded-[5px] p-6 flex justify-between items-center">
              <span className="text-(--black)/70">
                Planlagt månedligt forbrug
              </span>
              <span className="text-xl font-bold text-(--contrast)">
                {formatKr(request.budget.totalPlanned)}
              </span>
            </div>

            {/* Budget Lines */}
            <div className="border border-(--black)/10 rounded-[10px] divide-y">
              {request.budget.lines.map((line, index, arr) => (
                <BudgetLine
                  key={line.id}
                  line={line}
                  isLast={index === arr.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* STATUS */}
        <SetStatus request={request} setRequests={setRequests} />
      </div>
    </div>
  );
}

/* =========================
   Section Wrapper
========================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

/* =========================
   Info Row
========================= */

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-(--black)/10 pb-2">
      <span className="text-(--black)/70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

/* =========================
   Budget Line Row
========================= */

function BudgetLine({
  line,
  isLast,
}: {
  line: {
    displayName: string;
    plannedAmount: number;
    avg: number;
    lowRange: number;
    highRange: number;
  };
  isLast: boolean;
}) {
  const formatKr = (v: number) => `${v.toLocaleString("da-DK")} kr.`;

  return (
    <div
      className={`flex justify-between items-center px-6 py-4 ${isLast ? "" : "border-b border-(--black)/10"}`}
    >
      <div>
        <p className="font-semibold">{line.displayName}</p>
        <p className="text-[15px]! text-(--black)/70!">
          Gns: {formatKr(line.avg)} • Normal: {formatKr(line.lowRange)} –{" "}
          {formatKr(line.highRange)}
        </p>
      </div>

      <span className="font-bold text-(--contrast)">
        {formatKr(line.plannedAmount)}
      </span>
    </div>
  );
}
