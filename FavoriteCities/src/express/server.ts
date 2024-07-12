import express from 'express';
import {config} from '../config';
import {fetchSamplesFromCities} from "../services/apiSample";

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/favorite', async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send({error: 'Unauthorized'});
        return;
    }

    res.status(201).send({});
});

app.get('/favorite', async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send({error: 'Unauthorized'});
        return;
    }

    const samplesCities = await fetchSamplesFromCities('01004');
    res.status(200).send(samplesCities);
});

export function startServer() {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}
