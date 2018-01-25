const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const flash = require('connect-flash');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const { mongoURI } = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;

// load user model
require('./models/User');

// passport config
require('./config/passport')(passport);

// load routers
const root_router = require('./routes/root');
const auth_router = require('./routes/auth');

// mongoose connect
mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI)
  .then(() => console.log('Mongodb connected!'))
  .catch(err => console.log(err));

// set view engine
app.engine('handlebars', hbs({ defaultLayout: 'default' }));
app.set('view engine', 'handlebars');
// set static folder
app.use(express.static(path.join(__dirname + '/public')));
// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// apply flash message
app.use(flash());

// global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// routes
app.use('/', root_router);
app.use('/auth', auth_router);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
