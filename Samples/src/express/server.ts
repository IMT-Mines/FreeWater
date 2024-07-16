import express from 'express';
import { config } from '../config';
import {getAllSamples} from "../service/apiSamples";

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/samples', async (req, res) => {
  const codes = req.body;
  const sampleData = await getAllSamples(codes);
  res.status(200).send(sampleData);
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
