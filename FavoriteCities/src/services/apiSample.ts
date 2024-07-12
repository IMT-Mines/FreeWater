import axios from "axios";
import {SampleData} from "../models/sample.model";

export async function fetchSamplesFromCities(codes: string): Promise<SampleData[]> {

    const baseUrl = "http://localhost:10003/samples/";

    const response = await axios.post(baseUrl, {codes: codes});
    return response.data;
}
