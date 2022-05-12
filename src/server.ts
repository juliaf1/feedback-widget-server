import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.use(cors()); // security step to enable only specific front end servers from accessing
app.use(express.json()); // middleware
app.use(routes);

app.listen(3333, () => {
  console.log('running');
});