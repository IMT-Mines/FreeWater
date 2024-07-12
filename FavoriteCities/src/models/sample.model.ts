export interface Sample {
    isDrinkable: boolean;
    name: string;
    date: Date;
}

export interface SampleData {
    cityCode: string;
    cityName: string;
    supplier: string;
    samples: Sample[];
}