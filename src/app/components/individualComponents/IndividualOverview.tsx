"use client";

import SetStatus from "./SetStatus";
import type { Request } from "@/app/types/request";
import Comments from "../requestOverviewComponents/Comments";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import type { Section } from "@/app/types/navigation";
import LKIcon from "@/app/assets/icons/LKIcon";
import ButtonOne from "../utilityComponents/ButtonOne";
import BrugerIcon from "@/app/assets/icons/BrugerIcon";

const MY_AGENT_ID = 2;

type Props = {
  request: Request;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  setSection: React.Dispatch<React.SetStateAction<Section>>;
  toggleFlag: (id: number) => void;
};

export default function IndividualOverview({
  request,
  setRequests,
  setSection,
  toggleFlag,
}: Props) {
  const formatKr = (value?: number | null) =>
    typeof value === "number"
      ? `${value.toLocaleString("da-DK", {
          maximumFractionDigits: 3,
        })} kr.`
      : "-";
  const faktor = (value?: number | null) =>
    typeof value === "number"
      ? `${value.toLocaleString("da-DK", {
          maximumFractionDigits: 2,
        })}`
      : "-";

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
        <div className="border-2 border-black/20 rounded-xl p-5">
          {/* LOAN DETAILS */}
          <Section title="A. Lånedetaljer">
            <Info
              LKData={false}
              label="Lånebeløb"
              value={formatKr(request.amount)}
            />
            <Info LKData={false} label="Låntager" value="1" />
            <Info LKData={false} label="Formål" value={request.forWhat} />
            <Info
              LKData={false}
              label="Boligsituation"
              value={request.housingSituation}
            />
            <Info LKData={false} label="Adresse" value={request.location} />
            <Info
              LKData={false}
              label="Postnr."
              value={`${request.postalCode}`}
            />
          </Section>
        </div>
        {/* EMPLOYMENT */}
        <div className="border-2 border-black/20 rounded-xl p-5">
          <Section title="B. Gældsfaktor">
            <Info label="Gældsfaktor" value={faktor(request.gaeldsfaktor)} />
            <Info
              LKData={false}
              label="Bruttoindkomst pr. md."
              value={formatKr(request.indkomst)}
            />
            <Info label="Gæld" value={formatKr(request.debt)} />
            <Info
              LKData={false}
              label="Supplerende gæld"
              value={formatKr(request.supplementaryDebt)}
            />
          </Section>
        </div>

        {/* FINANCIAL */}
        <div className="border-2 border-black/20 rounded-xl p-5">
          <Section title="C. Udbetaling">
            <Info label="Opsparing" value={formatKr(request.opsparing)} />
            <Info
              LKData={false}
              label="Supplerende opsparing"
              value={formatKr(request.supplementaryWealth)}
            />
          </Section>
        </div>
        <div className="border-2 border-black/20 rounded-xl p-5">
          <Section title="D. Rådighedsbeløb">
            <Info
              label="Rådighedsbeløb pr. md."
              value={formatKr(request.raadighedsBeloeb)}
            />
            <Info
              label="Faste betalinger pr. md."
              value={formatKr(request.budget?.totalPlanned)}
            />
            <Info
              label="Nettoindkomst pr. md."
              value={formatKr(request.raadighedsBeloeb)}
            />
            <div
              className="[&>*>span]:underline [&>*>span]:hover:text-(--contrast)! cursor-pointer
                transition-all duration-200 ease-in"
            >
              <Info label="Budget" value="Hent her" />
            </div>
          </Section>
        </div>

        <div className="border-2 border-black/20 rounded-xl p-5">
          <Section title="E. Personoplysninger">
            <Info LKData={false} label="Jobstatus" value={request.jobStatus} />
            <Info LKData={false} label="Jobtitel" value={request.jobTitle} />
            <Info
              LKData={false}
              label="Uddannelsesniveau"
              value={request.educationLevel}
            />
            <Info LKData={false} label="Alder" value={request.age} />
            <Info LKData={false} label="Børn" value={request.numberOfKids} />
            <Info
              LKData={false}
              label="Civilstatus"
              value={request.engagementStatus}
            />
          </Section>
        </div>
        <div className="border-2 border-black/20 rounded-xl p-5">
          <Section title="F. Kontaktoplysninger">
            <Info LKData={false} label="Telefonnr." value={request.telephone} />
            <Info LKData={false} label="Email" value={request.email} />
          </Section>
        </div>
        <div className="w-fit ">
          <ButtonOne label="Download datasæt" className="" />
        </div>
        <Section title="Kommentarer">
          <Comments large={true} />
        </Section>
        <SetStatus request={request} setRequests={setRequests} />
      </div>
    </div>
  );
}

{
  /* BUDGET */
}
{
  /* {request.budget && (
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
          )} */
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

function Info({
  label,
  value,
  LKData = true,
}: {
  label: string;
  value: React.ReactNode;
  LKData?: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-(--black)/10 pb-2">
      <div className="flex gap-2 items-center">
        {LKData ? (
          <div className="group relative w-fit">
            <LKIcon className="w-[20]" />

            <div
              className="absolute bottom-full left-1/2 translate-x-1/2 mb-2
                  hidden group-hover:block
                  bg-black/70 text-white text-xs px-2 py-1 rounded"
            >
              Dette er låneklar data
            </div>
          </div>
        ) : (
          <div className="group relative w-fit">
            <BrugerIcon className="w-[20]" />

            <div
              className="absolute bottom-full left-1/2 translate-x-1/2 mb-2
                  hidden group-hover:block
                  bg-black/70 text-white text-xs px-2 py-1 rounded"
            >
              Dette er bruger indtastet data
            </div>
          </div>
        )}
        <span className="text-(--black)! font-semibold! ">{label}:</span>
      </div>
      <span className=" text-(--black)/70!">{value}</span>
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
