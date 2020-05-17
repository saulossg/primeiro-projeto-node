import express from 'express';
import routes from './routes';

const server = express();
const port = 3333;

server.use(express.json());
server.use(routes);

server.listen(3333, () => {
  console.log(`😉 Server Running......port: ${port}`);
})
