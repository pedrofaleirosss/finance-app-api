import express from 'express';
import { usersRouter, transactionsRouter } from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';

export const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL('../docs/swagger.json', import.meta.url), 'utf8'),
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
