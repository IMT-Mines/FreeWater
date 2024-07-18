import axios from 'axios';
import { City } from '../model/city.model';
import { get, set } from '../memcached/memcached';

export async function fetchCities(): Promise<City[]> {
  const cachedCities = await get<City[]>('cities');
  if (cachedCities) {
    return cachedCities;
  }
  const cities = await fetchCitiesFromAPI();
  await set<City[]>('cities', cities);
  return cities;
}

export async function fetchCitiesFromAPI(): Promise<City[]> {
  const citiesMap = new Map<string, City>();
  const urls = Array.from({ length: 3 }, (_, i) => `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi?size=20000&fields=code_commune%2Cnom_commune&page=${i + 1}`);

  try {
    const responses = await Promise.all(urls.map(url => axios.get(url)));
    responses.forEach(response => {
      response.data.data.forEach((item: any) => {
        citiesMap.set(item.code_commune, { code: item.code_commune, name: item.nom_commune });
      });
    });
  } catch (error) {
    console.error('Error fetching external data:', error);
    throw error;
  }
  return Array.from(citiesMap.values());
}
