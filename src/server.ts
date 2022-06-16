import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes';

dotenv.config();

const server = Express();

server.use(Express.urlencoded({ extended: true }));
server.use(Express.json());
server.use(cors());

server.use(router);

export default server;

// Environ 5h
