import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routes } from './routes';
import config from './config';

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors()); // security step to enable only specific front end servers from accessing
app.use(express.json()); // middleware
app.use(routes);

app.listen(config.PORT || 3333, () => {
  console.log('running');
});