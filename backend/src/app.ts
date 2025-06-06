import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();


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


export default app;
