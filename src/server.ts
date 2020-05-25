import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import 'reflect-metadata';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const server = express();
const port = 3333;

server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);

server.use((err: Error, request: Request, response: Response, _ : NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

server.listen(3333, () => {
  console.log(`😉 Server Running......port: ${port}`);
});
