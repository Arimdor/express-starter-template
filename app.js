require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors')
const redis = require("redis");

const app = express();
const client  = redis.createClient();

const apiRouter = require('./routes/api');
const webRouter = require('./routes/web');

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(session({
    secret: 'O~kV!Um]+(r;[Mb[m-4nnxpql.[!@R',
    store: new RedisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false,
    rolling: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
app.use('/', webRouter);

//  Errors handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('errors/error');
});

let port = process.env.APP_PORT || 8080;
app.listen(port, function () {
    console.log(`Iniciando en el puerto ${port}`);
});