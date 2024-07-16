import express from 'express';
import { config } from '../config';
import {getAllSamples} from "../service/apiSamples";

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/samples', async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send({error: 'Unauthorized'});
    return;
  }
  const sampleData = await getAllSamples(["01004"])
  res.status(200).send(sampleData);
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
