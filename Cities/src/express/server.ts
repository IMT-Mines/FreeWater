import express from 'express';
import cors from 'cors';
import { config } from '../config';
import { isAuthenticated } from '../util/utils';
import cookieParser from 'cookie-parser';
import { fetchCities } from '../service/cities.service';

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

app.get('/cities', isAuthenticated, async (req, res) => {
  try {
    const externalData = await fetchCities();
    res.status(200).send(externalData);
  } catch (error) {
    console.log('Error fetching external data:', error);
    res.status(500).send({ error: 'Failed to fetch external data' });
  }
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
