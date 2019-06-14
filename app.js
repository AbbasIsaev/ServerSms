const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const passport = require('passport');
const cookieSession = require('cookie-session');

const indexRouter = require('./routes/index');
const smsRouter = require('./routes/sms');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
// Обработка cors запросов, если клиент на другом домене
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//================Авторизация================
app.use(cookieSession({
  maxAge: eval(process.env.COOKIE_MAX_AGE), // Время жизни куки. Вычисляет значение в строке
  name: process.env.COOKIE_NAME,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
const session = passport.session();
app.use(session);
require('./middleware/passportGoogle')(passport);
const {authCheck} = require('./middleware/passportGoogle');

app.use('/auth', authRouter);
app.use('/profile', authCheck, (req, res) => {
  const data = {
    user: req.user,
    reqH: req.headers.cookie,
    resH: res.req.headers.cookie
  };
  res.send(data);
});
//================

app.use('/api/sms', authCheck, smsRouter);

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
  app.use('/', indexRouter);
}
//================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
