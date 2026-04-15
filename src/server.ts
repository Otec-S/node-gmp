import express from 'express';
import { connect, disconnect } from './db-connection.js';

const app = express();
app.use(express.json());

// routes go here

const bootstrap = async () => {
  await connect();    // connect() handles errors internally and exits on failure
  app.listen(8000, () => console.log('Server started on port 8000'));
};

process.on('SIGTERM', async () => {
  await disconnect();
  process.exit(0);
});

bootstrap();
