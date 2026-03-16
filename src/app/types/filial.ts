export type SearchAgent = {
  id: number;
  name: string;
  filters: FilterSettings;
};

export type FilialAgent = {
  id: number;
  name: string;

  area: {
    regions: string[];
    postcodes: string[];
  };

  agents: SearchAgent[];
};

export type Bank = {
  id: number;
  name: string;
  affiliations: FilialAgent[];
};

export type FilterSettings = {
  loanAmountMin?: number;
  housingType?: string;

  incomeMin?: number;
  fixedExpensesMax?: number;
  wealthMin?: number;
  debtsMax?: number;

  educationLevel?: string;
  jobStatus?: string;
  housingSituation?: string;
};
