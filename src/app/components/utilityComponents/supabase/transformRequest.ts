import { Request } from "@/app/types/request";

export const mapStatus = (status: string): Request["status"] => {
  switch (status) {
    case "approved":
      return "Godkendt";
    case "rejected":
      return "Afslået";
    case "under_review":
      return "Behandles";
    default:
      return "Afventer";
  }
};

export function transformRequest(r: any): Request {
  const disposableIncome = r.monthly_income - r.fixed_expenses;

  const debtFactor =
    r.monthly_income > 0 ? r.loan_amount / r.monthly_income : 0;

  const budget = r.budgets?.[0];

  return {
    id: r.id,
    name: r.name,
    amount: r.loan_amount,
    forWhat: r.loan_kind,
    location: r.address,
    postalCode: r.postal_code,
    region: r.region,
    score: r.score,
    jobTitle: r.job_title,
    jobStatus: r.job_status,
    educationLevel: r.education_level,
    housingSituation: r.housing_situation,
    email: r.email,
    status: mapStatus(r.status),
    indkomst: r.monthly_income,
    raadighedsBeloeb: disposableIncome,
    gaeldsfaktor: Number(debtFactor.toFixed(2)),
    opsparing: r.wealth,
    flagged: r.flagged ?? null,

    budget: budget
      ? {
          totalPlanned: budget.total_planned,
          createdAt: budget.created_at,
          lines: budget.budget_lines.map((l: any) => ({
            id: l.id,
            categoryKey: l.category_key,
            displayName: l.display_name,
            plannedAmount: l.planned_amount,
            avg: l.avg,
            lowRange: l.low_range,
            highRange: l.high_range,
          })),
        }
      : undefined,
  };
}
