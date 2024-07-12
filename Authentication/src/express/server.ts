import express from 'express';
import { config } from '../config';

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
  res.status(200).send({ token: 'token' });
});

app.post('/register', async (req, res) => {
  res.status(200).send({ registered: true });
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
