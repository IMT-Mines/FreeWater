import express from 'express';
import { config } from '../config';
import {ApiSamples} from "../service/apiSamples";

const port = config.PORT;
const app = express();
const apiSamples = new ApiSamples();

app.use(express.json());

app.post('/samples', async (req, res) => {
  const codes = req.body;
  const sampleData = await apiSamples.getAllSamples(codes);
  res.status(200).send(sampleData);
});

export function startServer() {
  let server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  return { app: app, server: server };
}
