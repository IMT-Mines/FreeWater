import axios from 'axios';
import {SampleData} from "../models/sample.model";

async function fetchSampleFromCity(code: string): Promise<SampleData> {
    const stub = true;

    if (stub) {
        return {
            cityCode: "12345",
            cityName: "Stub City",
            supplier: "Stub Supplier",
            samples: [
                {
                    isDrinkable: true,
                    name: "Stub Sample",
                    date: new Date()
                }
            ]
        }
    }

    try {
        const baseUrl = "https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?code_commune="
        const response = await axios.get(`${baseUrl}${code}`);
        const sampleData: SampleData = {
            cityCode: response.data.data[0].code_commune,
            cityName: response.data.data[0].nom_commune,
            supplier: response.data.data[0].nom_entite,
            samples: []
        }
        // const date = new Date(response.data.data[0].date_prelevement);
        for (const item of response.data.data) {
            // if (date !== new Date(item.date_prelevement)) {
            //     break;
            // }
            const sample = {
                isDrinkable: item.conclusion_conformite_prelevement === "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.",
                name: item.libelle_parametre,
                date: new Date(item.date_prelevement)
            }
            sampleData.samples.push(sample);
        }

        return sampleData
    } catch (error) {
        console.error('Error fetching external data:', error);
        throw error;
    }
}


export async function getAllSamples(codesCities: string[]) {
    const sampleData: SampleData[] = [];
    for (const codeCity of codesCities) {
        sampleData.push(await fetchSampleFromCity(codeCity));
    }
    return sampleData;
}