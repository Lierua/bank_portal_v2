"use client";

import SetStatus from "./SetStatus";
import type { Request } from "@/app/types/request";
import Comments from "../requestOverviewComponents/Comments";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const MY_AGENT_ID = 2;

type Props = {
  request: Request;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  toggleFlag: (id: number) => void;
};

export default function IndividualOverview({
  request,
  setRequests,
  setSection,
  toggleFlag,
}: Props) {
  const formatKr = (value: number) => `${value.toLocaleString("da-DK")} kr.`;

  const isMine = request.flagged === MY_AGENT_ID;
  const isTakenByOther =
    request.flagged !== null && request.flagged !== MY_AGENT_ID;

  return (
    <div className="min-h-screen bg-white p-10">
      <button
        onClick={() => setSection("Ansøgninger")}
        className="mb-8 text-sm hover:text-(--contrast)"
      >
        ← Tilbage
      </button>

      <div className="border-2 border-black/20 rounded-[5px] p-8 space-y-8">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold">{request.name}</h1>

          {!isTakenByOther &&
            (isMine ? (
              <FaBookmark
                onClick={() => toggleFlag(request.id)}
                className="text-[30px] text-(--contrast) cursor-pointer"
              />
            ) : (
              <FaRegBookmark
                onClick={() => toggleFlag(request.id)}
                className="text-[30px] opacity-65 cursor-pointer"
              />
            ))}
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

        {/* BUDGET */}
        {request.budget && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Budget Oversigt</h2>

            <div className="border border-(--black)/10 rounded-[5px] p-6 flex justify-between items-center">
              <span className="text-(--black)/70">
                Planlagt månedligt forbrug
              </span>
              <span className="text-xl font-bold text-(--contrast)">
                {formatKr(request.budget.totalPlanned)}
              </span>
            </div>

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

        <Comments large={true} />
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
      className={`flex justify-between items-center px-6 py-4 ${
        isLast ? "" : "border-b border-(--black)/10"
      }`}
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
