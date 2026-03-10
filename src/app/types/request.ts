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
  flagged: string | null;
  handlerName?: string | null;

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
};
