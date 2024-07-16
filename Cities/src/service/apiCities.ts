import axios from 'axios';
import {Citie} from "../models/citie.model";

export async function fetchCitiesFromAPI(): Promise<Citie[]> {
    try {
        const response = await axios.get('https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi');
        const citiesMap = new Map<string, Citie>();
        for (const item of response.data.data) {
            citiesMap.set(item.code_commune, {code: item.code_commune, name: item.nom_commune});
        }
        return Array.from(citiesMap.values());
    } catch (error) {
        console.error('Error fetching external data:', error);
        throw error;
    }
}
