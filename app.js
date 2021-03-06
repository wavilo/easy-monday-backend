require('dotenv').config();

const bodyParser      = require('body-parser');
const cookieParser    = require('cookie-parser');
const express         = require('express');
const favicon         = require('serve-favicon');
const hbs             = require('hbs');
const mongoose        = require('mongoose');
const logger          = require('morgan');
const path            = require('path');
const session         = require('express-session');
const MongoStore      = require('connect-mongo')(session); 
const passportSetup   = require('./passport/setup');
const cors            = require('cors');

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200'] 
})); 

app.use(session({ 
  secret: 'secret different for every app',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

passportSetup(app);


// default value for title local
app.locals.title = 'Easy Monday';


// app.use((req, res, next) => {
//   console.log("req.user", req.user)
//   next()
// })

const index = require('./routes/index');
app.use('/', index);

const authRouter = require('./routes/auth');
app.use('/api', authRouter);

const commentRouter = require('./routes/comment-api-router');
app.use('/api', commentRouter);

// const youtubeRouter = require('./routes/youtube-api');
// app.use('/api', youtubeRouter);

// const processRouter = require('./routes/process');
// app.use('/', processRouter);

module.exports = app;

// Send Angular's HTML for all other routes
app.use((req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
})