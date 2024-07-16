import express from 'express';
import cors from 'cors';
import {config} from '../config';
import {fetchSamplesFromCities} from "../service/apiSample";
import {getFromDBFavoriteCities} from "../service/dbFavoriteCities";
import {isAuthenticated} from "../util/utils";
import cookieParser from "cookie-parser";

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

app.post('/favorite', isAuthenticated, async (req, res) => {
    // TODO IMPLEMENT
    res.status(201).send("30126");
});

app.delete('/favorite/:codeCity', isAuthenticated, async (req, res) => {
    // TODO IMPLEMENT
    res.status(204).send();
});

app.get('/favorite', isAuthenticated, async (req, res) => {
    const favoriteCities = await getFromDBFavoriteCities();
    if (!favoriteCities) {
        res.status(200).send([]);
        return;
    }

    const samplesCities = await fetchSamplesFromCities(favoriteCities);
    res.status(200).send(samplesCities);
});

export function startServer() {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}
