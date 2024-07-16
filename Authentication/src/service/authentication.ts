import jwt from 'jsonwebtoken';
export function signJWT(username: string) {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: username
    },
    process.env.JWT_SECRET
  );
}
export function verifyJWT(token: string){
    return jwt.verify(
        token,
        process.env.JWT_SECRET,
    );
}
