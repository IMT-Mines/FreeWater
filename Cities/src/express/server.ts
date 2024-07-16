import express from 'express';
import cors from 'cors';
import {config} from '../config';
import {fetchCitiesFromAPI} from "../service/apiCities";
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


app.get('/cities', isAuthenticated, async (req, res) => {
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
