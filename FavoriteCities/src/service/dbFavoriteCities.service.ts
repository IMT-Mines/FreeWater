import pool from '../database/db';

export class DbFavoriteCitiesService {
  async getFromDBFavoriteCities(username: string): Promise<string[]> {
    const [rows]: any = await pool.query('SELECT cityCode FROM favorite_city WHERE username = ?', [username]);
    return rows;
  }

  async insertFavoriteCity(username: string, cityCode: string) {
    await pool.query('INSERT INTO favorite_city (username, cityCode) VALUES (?, ?)', [username, cityCode]);
  }

  async deleteFavoriteCity(username: string, cityCode: string) {
    await pool.query('DELETE FROM favorite_city WHERE username = ? AND cityCode = ?', [username, cityCode]);
  }
}