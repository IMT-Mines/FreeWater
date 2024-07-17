import express from 'express';
import cors from 'cors';
import {config} from '../config';
import {findUserByUsername, insertUser, signJWT} from "../service/authentication";
import cookieParser from "cookie-parser";
import {isAuthenticated} from "../util/utils";
import bcrypt from "bcrypt";


const port = config.PORT;
const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    methods: ['GET', 'POST']
}));
app.use(cookieParser());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(401).send({ success: false, message: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send({ success: false, message: 'Invalid username or password' });
        }

        const token = signJWT(username);
        res.cookie('jwtToken', token, { httpOnly: true, secure: false, sameSite: 'strict' });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);

        if (user) {
            return res.status(400).send({ success: false, message: 'Username already exists' });
        }

        await insertUser(username, password);
        res.status(201).send({ success: true });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

app.get('/auth', isAuthenticated, async (req, res) => {
    res.status(200).send({authenticated: true});
});

app.post('/logout', isAuthenticated, async (req, res) => {
    res.clearCookie('jwtToken');
    res.status(200).send({loggedOut: true});
});

export function startServer() {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

