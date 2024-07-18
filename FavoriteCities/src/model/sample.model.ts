export interface Sample {
  name: string;
  unit: string;
  value: number;
}

export interface SampleData {
  cityCode: string;
  cityName: string;
  supplier: string;
  date: Date;
  samples: Sample[];
  conclusion: string;
  drinkableScore: number;
}