import type { RawRequest, Request } from "@/app/types/request";
export function mapRequest(raw: RawRequest): Request {
  const budget = raw.economicData.budget;

  return {
    id: raw.id,

    name: raw.personalInfo.name,
    telephone: raw.personalInfo.telephone,
    age: raw.personalInfo.age,
    numberOfKids: raw.personalInfo.numberOfKids,
    engagementStatus: raw.personalInfo.engagementStatus,

    amount: raw.loanDetails.amount,
    forWhat: raw.loanDetails.purpose.loanKind,

    location: raw.loanDetails.purpose.location.address,
    postalCode: raw.loanDetails.purpose.location.postalCode,
    region: raw.loanDetails.purpose.location.region,

    score: raw.loanDetails.score,

    jobTitle: raw.employment.jobTitle,
    jobStatus: raw.employment.jobStatus,
    educationLevel: raw.employment.educationLevel,

    housingSituation: raw.personalInfo.housingSituation,
    email: raw.personalInfo.email,

    debt: raw.economicData.debts,
    supplementaryDebt: raw.economicData.supplementaryDebt,

    indkomst: raw.economicData.monthlyIncome,

    opsparing: raw.economicData.wealth,
    supplementaryWealth: raw.economicData.supplementaryWealth,

    raadighedsBeloeb:
      raw.economicData.monthlyIncome - raw.economicData.fixedExpenses,

    gaeldsfaktor:
      raw.economicData.monthlyIncome > 0
        ? raw.economicData.debts / raw.economicData.monthlyIncome
        : 0,

    status: raw.status === "" ? "Afventer" : raw.status,
    flagged: raw.flagged,

    /* ⭐ MATCHES YOUR REQUEST TYPE PERFECTLY */
    budget: budget
      ? {
          totalPlanned: budget.totalPlanned,
          netIncome: budget.totalPlanned,
          createdAt: budget.createdAt,
          lines: budget.lines.map((l) => ({
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
}
