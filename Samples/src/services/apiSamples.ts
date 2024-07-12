import axios from 'axios';

async function fetchSampleFromCity() {
    try {
        const response = await axios.get('https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi');

    } catch (error) {
        console.error('Error fetching external data:', error);
        throw error;
    }
}
