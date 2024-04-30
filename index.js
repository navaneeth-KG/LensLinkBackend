import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

import mongoose from './db/dbConnection.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static('uploads'));

app.listen(4999, () => {
  console.log('server is running');
});
