export type FilialAgent = {
  id: number;
  name: string;
  area: {
    regions: string[];
    postcodes: string[];
  };
  filters?: Record<string, unknown>;
};

export type Bank = {
  id: number;
  name: string;
  affiliations: FilialAgent[];
};
