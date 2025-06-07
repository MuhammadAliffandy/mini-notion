import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
  },
  transports: ["websocket", "polling"],});


app.set('io', io);

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,POST,DELETE,PUT', 
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())


app.use(morgan('dev'));

app.use('/', routes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Ping successfully' });
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


