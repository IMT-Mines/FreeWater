import express from 'express';
import {config} from '../config';
import {fetchSamplesFromCities} from "../service/apiSample";
import {getFromDBFavoriteCities} from "../service/dbFavoriteCities";

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/favorite', async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send({error: 'Unauthorized'});
        return;
    }
    // TODO IMPLEMENT
    res.status(201).send(["30126", "30085"]);
});

app.get('/favorite', async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send({error: 'Unauthorized'});
        return;
    }

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
