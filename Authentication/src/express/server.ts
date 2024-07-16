import express from 'express';
import cors from 'cors';
import {config} from '../config';
import {signJWT} from "../service/authentication";
import cookieParser from "cookie-parser";
import {isAuthenticated} from "../util/utils";

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
    const token = signJWT(req.body.username);
    res.cookie('jwtToken', token, {httpOnly: true, secure: false, sameSite: 'strict'});
    res.status(200).send({success: true});
});

app.post('/register', async (req, res) => {
    res.status(200).send({registered: true});
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

