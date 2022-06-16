import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = Express();

server.use(Express.urlencoded({ extended: true }));
server.use(Express.json());
server.use(cors());

export default server;
