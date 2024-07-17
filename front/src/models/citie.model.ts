export interface Sample {
    drinkable: number;
    name: string;
    date: Date;
}

export interface City {
    cityCode: string;
    cityName: string;
    supplier: string;
    samples: Sample[];
}