import express from 'express';
import bodyParser from 'body-parser';
import logger  from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
/** API inside build */
const apiRoot = './API/';


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * Use to load favicon.ico
 * app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', path.join(__dirname, '../FRONT/views/'));
app.set('view engine', 'jade');

/** PUBLIC directory */
app.use(express.static(path.join(__dirname, '../FRONT/public')));


app.set('superSecret', "testPhrase");

export default app;










