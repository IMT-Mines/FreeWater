import express from 'express';
import cors from 'cors';
import { config } from '../config';
import { fetchSamplesFromCities } from '../service/apiSample';
import { getJWTPayload, isAuthenticated } from '../util/utils';
import cookieParser from 'cookie-parser';
import { deleteFavoriteCity, getFromDBFavoriteCities, insertFavoriteCity } from '../service/dbFavoriteCities';

const port = config.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    methods: ['GET', 'POST', 'DELETE']
  })
);
app.use(cookieParser());

app.post('/favorite', isAuthenticated, async (req, res) => {
  try {
    const token = req.cookies.jwtToken;
    const payload: any = getJWTPayload(token);
    await insertFavoriteCity(payload.username, req.body.cityCode);
  } catch (error) {
    console.error('Insert favorite error:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
  res.status(201).send({ status: 'success' });
});

app.delete('/favorite/:cityCode', isAuthenticated, async (req, res) => {
  try {
    const cityCode = req.params.cityCode;
    const payload: any = getJWTPayload(req.cookies.jwtToken);
    await deleteFavoriteCity(payload.username, cityCode);
  } catch (error) {
    console.error('Delete favorite error:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
  res.status(204).send();
});

app.get('/favorite', isAuthenticated, async (req, res) => {
  let favoriteCities;
  try {
    const payload: any = getJWTPayload(req.cookies.jwtToken);
    favoriteCities = await getFromDBFavoriteCities(payload.username);
    favoriteCities = favoriteCities.map((city: any) => city.cityCode);
  } catch (error) {
    console.error('Get favorite error:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
  if (!favoriteCities) {
    res.status(200).send([]);
    return;
  }
  try {
    const samplesCities = await fetchSamplesFromCities(favoriteCities);
    res.status(200).send(samplesCities);
  } catch (error) {
    console.error('Fetch samples error:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
