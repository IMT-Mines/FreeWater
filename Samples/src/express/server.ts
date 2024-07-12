import express from 'express';
import { config } from '../config';

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/samples', async (req, res) => {
  res.status(200).send({ sample: 'sample' });
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
