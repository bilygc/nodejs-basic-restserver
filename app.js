dotenv.config();
import dotenv from 'dotenv';
import Server from './models/server.js';

const server = new Server();

server.start();