import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from "../database/db";

export function signJWT(username: string) {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            username: username
        },
        process.env.JWT_SECRET!
    );
}

export async function findUserByUsername(username: string) {
    const [rows]: any = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
}

export async function insertUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
}