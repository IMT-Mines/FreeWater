import axios from "axios";
import {SampleData} from "../model/sample.model";

export async function fetchSamplesFromCities(codesCities: string[]): Promise<SampleData[]> {

    const baseUrl = "http://localhost:10003/samples/";

    const response = await axios.post(baseUrl, codesCities);
    return response.data;
}
