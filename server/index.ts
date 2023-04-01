import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { parseWebItems } from './parse';

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT ?? 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript Server, hi\n');
});

app.post('/parse', (req: Request, res: Response) => {
  console.log(req.body);
  const body = req.body;
  const { url, requestedItems } = body;

  // check body for expected information
  if (!url || !requestedItems) {
    res.status(500);
    return res.send({
      error: `Error: url or requestedItems were not provided in request body. Input: ${JSON.stringify(
        req.body,
      )}`,
    });
  }

  // create async task for parsing items from url
  parseWebItems(url, requestedItems).then((webItems) => {
    return res.send({ url: url, items: webItems });
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
