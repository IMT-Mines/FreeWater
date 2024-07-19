import { beforeAll, describe, expect, it, vi } from 'vitest';
import { DbFavoriteCitiesService } from '../src/service/dbFavoriteCities.service';
import pool from '../src/database/db';

vi.mock('../database/db');

describe('DbFavoriteCitiesService', () => {
  let sut: DbFavoriteCitiesService;

  beforeAll(() => {
    sut = new DbFavoriteCitiesService();
  });

  describe('getFromDBFavoriteCities', () => {
    it('should return favorite cities from the database', async () => {
      // Arrange
      const username = 'testuser';
      const mockRows = [{ cityCode: '84076' }, { cityCode: '75056' }];
      vi.spyOn(pool, 'query').mockResolvedValue([mockRows] as any);

      // Act
      const result = await sut.getFromDBFavoriteCities(username);

      // Assert
      expect(result).toEqual(mockRows);
      expect(pool.query).toHaveBeenCalledWith('SELECT cityCode FROM favorite_city WHERE username = ?', [username]);
    });
  });

  describe('insertFavoriteCity', () => {
    it('should insert a favorite city into the database', async () => {
      // Arrange
      const username = 'testuser';
      const cityCode = '84076';
      const querySpy = vi.spyOn(pool, 'query').mockResolvedValue(null!);

      // Act
      await sut.insertFavoriteCity(username, cityCode);

      // Assert
      expect(querySpy).toHaveBeenCalledWith(
        'INSERT INTO favorite_city (username, cityCode) VALUES (?, ?)',
        [username, cityCode]
      );
    });
  });

  describe('deleteFavoriteCity', () => {
    it('should delete a favorite city from the database', async () => {
      // Arrange
      const username = 'testuser';
      const cityCode = '84076';
      const querySpy = vi.spyOn(pool, 'query').mockResolvedValue(null!);

      // Act
      await sut.deleteFavoriteCity(username, cityCode);

      // Assert
      expect(querySpy).toHaveBeenCalledWith(
        'DELETE FROM favorite_city WHERE username = ? AND cityCode = ?',
        [username, cityCode]
      );
    });
  });
});
