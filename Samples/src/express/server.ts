import express from 'express';
import { config } from '../config';
import { ApiSamplesService } from '../service/apiSamples.service';

const port = config.PORT;
const app = express();
const apiSamplesService = new ApiSamplesService();

app.use(express.json());

app.post('/samples', async (req, res) => {
  const codes = req.body;
  try {
    const sampleData = await apiSamplesService.getAllSamples(codes);
    res.status(200).send(sampleData);
  } catch (error) {
    console.error('Error fetching samples:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});

export function startServer() {
  let server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  return { app: app, server: server };
}
