import jwt from "jsonwebtoken";

export function isAuthenticated(req: any, res: any, next: any) {
    const token = req.cookies.jwtToken;

    if (token == null) return res.sendStatus(401);

    try {
        verifyJWT(token);
        next();
    } catch (e) {
        return res.sendStatus(403);
    }
}

function verifyJWT(token: string) {
    return jwt.verify(
        token,
        process.env.JWT_SECRET!,
    );
}
