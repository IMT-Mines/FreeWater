import jwt from 'jsonwebtoken';

export function signJWT(username: string) {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            username: username
        },
        process.env.JWT_SECRET!
    );
}