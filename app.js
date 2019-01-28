process.setMaxListeners(0);
require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const app = express();
const path = require('path');
const logger = require('morgan');

const apiRouter = require('./routes/api');
const webRouter = require('./routes/web');

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
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