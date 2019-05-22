const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/sms');

const app = express();

app.use(logger('dev'));
// Обработка cors запросов, если клиент на другом домене
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/sms', usersRouter);

//================Развертывание приложения в production================
if (process.env.NODE_ENV === 'production') {
  console.log('-----Сервер app запущен в production-----');
  const pathFolder = path.resolve('client', 'build');
  app.use(express.static(pathFolder));
  app.get('*', (req, res) => {
    const pathIndex = path.resolve(pathFolder, 'index.html');
    res.sendFile(pathIndex)
  });
} else {
  app.use("/favicon.ico", express.static('favicon.ico'));
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use('/', indexRouter);
}
//================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
