export interface Sample {
    isDrinkable?: boolean;
    drinkable?: number;
    name: string;
    date: Date;
}

export interface SampleData {
    cityCode: string;
    cityName: string;
    supplier: string;
    samples: Sample[];
}