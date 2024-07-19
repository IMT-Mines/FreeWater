import { beforeAll, describe, expect, it, vi } from 'vitest';
import { SampleData } from '../src/model/sample.model';
import { ApiSamplesService } from '../src/service/apiSamples.service';
import axios from 'axios';

describe('ApiSamplesService', () => {
  let sut: ApiSamplesService;

  const mockSampleData: SampleData = {
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
  };

  beforeAll(() => {
    sut = new ApiSamplesService();
  });

  describe('fetchSampleFromCity', () => {
    it('should fetch sample data from city', async () => {
      // Arrange
      const code = '84076';
      const axiosSpy = vi.spyOn(axios, 'get').mockResolvedValue({
        data: {
          data: [
            {
              code_commune: '84076',
              nom_commune: 'AVIGNON',
              nom_distributeur: 'SDEI',
              date_prelevement: '2021-09-01T00:00:00.000Z',
              conclusion_conformite_prelevement: 'conclusion',
              resultat_numerique: 0.01,
              libelle_parametre: 'Aluminium',
              libelle_unite: 'mg/l'
            }
          ]
        }
      });

      // Act
      const result = await sut.fetchSampleFromCity(code);

      // Assert
      expect(result).toEqual(mockSampleData);
      expect(axiosSpy).toHaveBeenCalledWith(
        `https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/resultats_dis?fields=resultat_numerique%2Clibelle_unite%2Clibelle_parametre%2Cdate_prelevement%2Cconclusion_conformite_prelevement%2Cnom_distributeur%2Cnom_commune%2Ccode_commune&size=40&code_commune=${code}`
      );
      axiosSpy.mockRestore();
    });
  });

  describe('getAllSamples', () => {
    it('should fetch samples for all given cities', async () => {
      // Arrange
      const codesCities = ['84076'];
      const fetchSpy = vi.spyOn(sut, 'fetchSampleFromCity').mockResolvedValue(mockSampleData);

      // Act
      const result = await sut.getAllSamples(codesCities);

      // Assert
      expect(fetchSpy).toHaveBeenCalledWith('84076');
      expect(result).toEqual([mockSampleData]);
      fetchSpy.mockRestore();
    });
  });

  describe('getDrinkableScore', () => {
    it("should return 2 when conformity is 'Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.'", () => {
      // Arrange
      const conformity =
        "Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.";

      // Act
      const result = sut.getDrinkableScore(conformity);

      // Assert
      expect(result).toBe(2);
    });

    it('should return 1 when conformity is "Eau d\'alimentation conforme aux limites de qualité et non conforme aux références de qualité."', () => {
      // Arrange
      const conformity =
        "Eau d'alimentation conforme aux limites de qualité et non conforme aux références de qualité.";

      // Act
      const result = sut.getDrinkableScore(conformity);

      // Assert
      expect(result).toBe(1);
    });

    it('should return 1 when conformity is "Eau potable au vu des paramètres recherchés, naturellement faiblement minéralisée."', () => {
      // Arrange
      const conformity = 'Eau potable au vu des paramètres recherchés, naturellement faiblement minéralisée.';

      // Act
      const result = sut.getDrinkableScore(conformity);

      // Assert
      expect(result).toBe(1);
    });

    it('should return 0 when conformity is "Eau non conforme."', () => {
      // Arrange
      const conformity = 'Eau non conforme.';

      // Act
      const result = sut.getDrinkableScore(conformity);

      // Assert
      expect(result).toBe(0);
    });
  });
});
