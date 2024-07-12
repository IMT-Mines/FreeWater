import express from 'express';
import {config} from '../config';
import {fetchCitiesFromAPI} from "../services/apiCities";

const port = config.PORT;
const app = express();

app.use(express.json());

app.get('/cities', async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send({error: 'Unauthorized'});
        return;
    }

    try {
        const externalData = await fetchCitiesFromAPI();
        res.status(200).send(externalData);
    } catch (error) {
        res.status(500).send({error: 'Failed to fetch external data'});
    }
});

export function startServer() {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}
