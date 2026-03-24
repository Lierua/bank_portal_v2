export type SearchAgent = {
  id: number;
  name: string;

  location: {
    regions: string[];
    kommuner: string[];
    postcodes: string[];
  };

  filters: FilterSettings;
};

export type FilialAgent = {
  id: number;
  name: string;

  area: {
    regions: string[];
    postcodes: string[];
  };
  handlers: string[];
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

  area?: {
    regions: string[];
    postcodes: string[];
  };

  incomeMin?: number;
  fixedExpensesMax?: number;
  wealthMin?: number;
  debtsMax?: number;

  educationLevel?: string;
  jobStatus?: string;
  housingSituation?: string;
};
