const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const S3 = require('aws-sdk/clients/s3');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  console.log(req.path);
  res.locals.path = req.path;
  next();
});

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'EKS demo'
  });
});

app.get('/auth', async (req, res) => {
  const s3Client = new S3();
  let buckets = [];
  let error;
  try {
    const bucketResponse = await s3Client.listBuckets().promise();
    buckets = bucketResponse.Buckets;
  } catch (err) {
    console.log(err);
    error = err.message;
  }

  res.render('auth', {
    buckets,
    error,
    title: 'Authentication and Authorization'
  });
});

app.get('/service-mesh', async (req, res) => {
  res.render('service-mesh', {
    title: 'Service Mesh'
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
