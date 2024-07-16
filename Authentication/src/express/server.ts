import express from 'express';
import cors from 'cors';
import { config } from '../config';

const port = config.PORT;
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'POST']
}));


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
