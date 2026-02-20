"use client";

import SetStatus from "../individualComponents/SetStatus";
import type { Request } from "../RequestContent";

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
      <div className="border-2 border-black/20 rounded-[5px] p-8 space-y-12">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">{request.name}</h1>
          <p>{request.email}</p>
          <div className="mt-6 flex items-center justify-between border border-(--black)/10 rounded-[5px] px-6 py-4 max-w-[400px]">
            <span className="text-sm uppercase tracking-wider text-(--black)/50">
              Credit Score
            </span>
            <span className="text-3xl font-bold text-(--contrast)">
              {request.score}
            </span>
          </div>
        </div>

        {/* LOAN DETAILS */}
        <Section title="Låne Detaljer">
          <Info
            label="Lånebeløb"
            value={`${request.amount.toLocaleString("da-DK")} kr.`}
          />
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
          <Info
            label="Indkomst"
            value={`${request.indkomst.toLocaleString("da-DK")} kr.`}
          />
          <Info
            label="Rådighedsbeløb"
            value={`${request.raadighedsBeloeb.toLocaleString("da-DK")} kr.`}
          />
          <Info label="Gældsfaktor" value={request.gaeldsfaktor} />
          <Info
            label="Formue"
            value={`${request.opsparing.toLocaleString("da-DK")} kr.`}
          />
        </Section>

        {/* STATUS */}
        <div className="pt-10 border-t border-(--black)/10">
          <SetStatus request={request} setRequests={setRequests} />
        </div>
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
      <span className="text-(--black)/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
