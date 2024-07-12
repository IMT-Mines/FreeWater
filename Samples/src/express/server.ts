import express from 'express';
import { config } from '../config';
import {getAllSamples} from "../services/apiSamples";

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/samples', async (req, res) => {
  const sampleData = await getAllSamples(["01004"])
  res.status(200).send(sampleData);
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
