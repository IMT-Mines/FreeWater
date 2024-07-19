import bcrypt from 'bcrypt';
import pool from '../database/db';

export class AuthenticationService {
  async findUserByUsername(username: string) {
    const [rows]: any = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    console.log(await pool.query('SELECT * FROM users WHERE username = ?', [username]));
    return rows[0];
  }

  async insertUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  }
}
