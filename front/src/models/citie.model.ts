export interface Sample {
    drinkable: number;
    name: string;
    date: Date;
}

export interface Citie {
    cityCode: string;
    cityName: string;
    supplier: string;
    samples: Sample[];
}