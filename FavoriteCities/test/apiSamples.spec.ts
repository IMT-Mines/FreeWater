import { beforeAll, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { ApiSamplesService } from '../src/service/apiSamples.service';
import { SampleData } from '../src/model/sample.model';

vi.mock('axios');

describe('ApiSamplesService', () => {
  let sut: ApiSamplesService;

  beforeAll(() => {
    sut = new ApiSamplesService();
  });

  describe('fetchSamplesFromCities', () => {
    it('should fetch sample data from cities', async () => {
      // Arrange
      const codesCities = ['84076', '75056'];
      const mockSampleData: SampleData[] = [
        {
          cityCode: '84076',
          cityName: 'AVIGNON',
          supplier: 'SDEI',
          date: new Date('2021-09-01T00:00:00.000Z'),
          samples: [
            {
              name: 'Aluminium',
              value: 0.01,
              unit: 'mg/l'
            }
          ],
          conclusion: 'conclusion',
          drinkableScore: 0
        },
        {
          cityCode: '75056',
          cityName: 'PARIS',
          supplier: 'Eau de Paris',
          date: new Date('2021-09-01T00:00:00.000Z'),
          samples: [
            {
              name: 'Chlore',
              value: 0.5,
              unit: 'mg/l'
            }
          ],
          conclusion: 'conclusion',
          drinkableScore: 1
        }
      ];
      vi.spyOn(axios, 'post').mockResolvedValue({ data: mockSampleData });

      // Act
      const result = await sut.fetchSamplesFromCities(codesCities);

      // Assert
      expect(result).toEqual(mockSampleData);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:10003/samples/', codesCities);
    });
  });
});
