import express from 'express';
import { config } from '../config';

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/favorite', async (req, res) => {
  res.status(200).send({ favorite: ['New York', 'San Francisco', 'Los Angeles'] });
});

app.get('/favorite', async (req, res) => {
  res.status(200).send({ favorite: ['New York', 'San Francisco', 'Los Angeles'] });
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
