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

    telephone: string;
    age: number;
    numberOfKids: number;
    engagementStatus: "Ugift" | "Gift";
  };

  employment: {
    jobTitle: string;
    jobStatus: "Fuld" | "DelTid" | "Selvstændig";
    educationLevel: string;
  };

  economicData: {
    monthlyIncome: number;
    fixedExpenses: number;

    supplementaryDebt: number;
    supplementaryWealth: number;

    wealth: number;
    debts: number;

    budget?: {
      id: string;
      userId: string;
      year: number;
      month: number;
      totalPlanned: number;
      createdAt: string;
      lines: BudgetLine[];
    };
  };

  flagged: number | string | null;
  status: "" | "Godkendt" | "Afslået" | "Afventer" | "Behandles";
};

export type Request = {
  id: number;

  name: string;
  telephone: string;
  age: number;
  numberOfKids: number;
  engagementStatus: "Ugift" | "Gift";

  amount: number;
  forWhat: string;

  location: string;
  postalCode: string;
  region: string;

  score: number;

  jobTitle: string;
  jobStatus: "Fuld" | "DelTid" | "Selvstændig";
  educationLevel: string;

  housingSituation: string;
  email: string;

  debt: number;
  supplementaryDebt: number;

  status: "Godkendt" | "Afslået" | "Afventer" | "Behandles";

  indkomst: number;
  raadighedsBeloeb: number;
  gaeldsfaktor: number;

  opsparing: number;
  supplementaryWealth: number;

  budget?: {
    totalPlanned: number;
    netIncome: number;
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

  flagged: number | string | null;
};
