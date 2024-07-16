import axios from 'axios';
import {SampleData} from "../model/sample.model";

async function fetchSampleFromCity(code: string): Promise<SampleData> {
    try {
        const response = await axios.get(`https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?fields=libelle_parametre%2Cdate_prelevement%2Cconclusion_conformite_prelevement%2Cnom_distributeur%2Cnom_commune%2Ccode_commune&size=40&code_commune=${code}`);
        const sampleData: SampleData = {
            cityCode: response.data.data[0].code_commune,
            cityName: response.data.data[0].nom_commune,
            supplier: response.data.data[0].nom_distributeur,
            samples: []
        }
        const date = new Date(response.data.data[0].date_prelevement);
        for (const item of response.data.data) {
            if (date.getTime() !== new Date(item.date_prelevement).getTime()) {
                break;
            }
            const sample = {
                drinkable: getDrinkableScore(item.conclusion_conformite_prelevement),
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

function getDrinkableScore(conformity: string) {
    if (conformity === "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.") {
        return 2;
    } else if (conformity === "Eau d'alimentation conforme aux limites de qualité et non conforme aux références de qualité.") {
        return 1;
    }
    return 0;
}