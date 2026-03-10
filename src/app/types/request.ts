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

    budget: {
      id: string;
      userId: string;
      year: number;
      month: number;
      totalPlanned: number;
      createdAt: string;

      lines: BudgetLine[];
    };

    wealth: number;
    debts: number;
  };

  flagged: number | null;
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

  flagged: number | null;
};

export type BudgetLine = {
  id: string;
  budgetId: string;
  budget: null;
  categoryKey: string;
  displayName: string;
  isRecurring: boolean;
  plannedAmount: number;
  avg: number;
  p25: number;
  p75: number;
  lowRange: number;
  highRange: number;
  stdDev: number;
  recurringAvg: number;
};
