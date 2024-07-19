import { beforeAll, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { get, set } from '../src/memcached/memcached';
import { CitiesService } from '../src/service/cities.service';
import { City } from '../src/model/city.model';

vi.mock('../src/memcached/memcached', () => ({
  get: vi.fn(),
  set: vi.fn()
}));

describe('CitiesService', () => {
  let sut: CitiesService;

  beforeAll(() => {
    sut = new CitiesService();
  });

  describe('fetchCities', () => {
    it('should return cached cities if they exist', async () => {
      // Arrange
      const mockCities: City[] = [{ code: '84076', name: 'AVIGNON' }];
      const getSpy = vi.mocked(get).mockResolvedValue(mockCities);

      // Act
      const result = await sut.fetchCities();

      // Assert
      expect(result).toEqual(mockCities);
      expect(getSpy).toHaveBeenCalledWith('cities');

      // Clean up
      getSpy.mockRestore();
    });

    it('should fetch cities from API if they are not cached', async () => {
      // Arrange
      const mockCities: City[] = [{ code: '84076', name: 'AVIGNON' }];
      const getSpy = vi.mocked(get).mockResolvedValue(null);
      const fetchSpy = vi.spyOn(sut, 'fetchCitiesFromAPI').mockResolvedValue(mockCities);
      const setSpy = vi.mocked(set).mockResolvedValue();

      // Act
      const result = await sut.fetchCities();

      // Assert
      expect(result).toEqual(mockCities);
      expect(getSpy).toHaveBeenCalledWith('cities');
      expect(fetchSpy).toHaveBeenCalled();
      expect(setSpy).toHaveBeenCalledWith('cities', mockCities);

      // Clean up
      getSpy.mockRestore();
      fetchSpy.mockRestore();
      setSpy.mockRestore();
    });
  });

  describe('fetchCitiesFromAPI', () => {
    it('should fetch cities from the API and return them', async () => {
      // Arrange
      const mockResponse = {
        data: {
          data: [{ code_commune: '84076', nom_commune: 'AVIGNON' }]
        }
      };
      const axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValue(mockResponse);

      // Act
      const result = await sut.fetchCitiesFromAPI();

      // Assert
      expect(result).toEqual([{ code: '84076', name: 'AVIGNON' }]);
      expect(axiosGetSpy).toHaveBeenCalledTimes(3);
      expect(axiosGetSpy).toHaveBeenCalledWith(
        'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi?size=20000&fields=code_commune%2Cnom_commune&page=1'
      );
      expect(axiosGetSpy).toHaveBeenCalledWith(
        'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi?size=20000&fields=code_commune%2Cnom_commune&page=2'
      );
      expect(axiosGetSpy).toHaveBeenCalledWith(
        'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi?size=20000&fields=code_commune%2Cnom_commune&page=3'
      );

      // Clean up
      axiosGetSpy.mockRestore();
    });
  });
});
