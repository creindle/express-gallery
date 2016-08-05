console.log("Sanity check");

var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();

var bodyParser = require('body-parser');
var connect = require('connect');
var methodOverride = require('method-override');
var morgan = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var pug = require('pug');
var querystring = require('querystring');

var db = require('./models');
var Picture = db.Picture;
var User = db.User;
//var user = { username: 'bob', password: 'secret' };

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(session({
  secret: "hahahah",
  resave: true,
  saveUninitilized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      where: {
        username: username
      }
    })
    .then(function(user){
      console.log(user);
      console.log(username);
      console.log(password);
      if ( !(username === user.username && password === user.password) ) {
         console.log('Is false');
         return done(null, false);
      }
      console.log('Is = >' + user);
      //this is when the user is serialized :D
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  console.log("Serialize User", user);
  done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
  console.log("Deserialize user", userId);
  User.findOne({
    where: {
      id: userId
    }
  })
  .then(function(user) {
    done(null, user);
  })
  .catch(function(err) {
    return done(err);
  });
});

// Get Methods
app.get('/', function(req, res) {
  res.redirect('/gallery');
});

app.get('/gallery/new',
  isAuthenticated,
  function (req, res) {
  res.render('gallery-new');
});

app.get('/gallery', function (req, res) {
  Picture.findAll()
    .then(function(picture) {
      res.render('gallery', {picture: picture});
    });
});


app.get('/gallery/:id', function(req,res)  {
  if (isNaN(req.params.id) === true) {
    return res.redirect('/gallery');
  }
  Picture.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(picture) {
    console.log(picture);//if picture === null
    if (picture === null) {
      return res.redirect('/gallery');
    }
    else {
      res.render('gallery-id', {picture: picture});
    }
  });
});

app.get('/gallery/:id/edit', function(req, res) {
  if (isNaN(req.params.id) === true) {
    return res.redirect('/gallery');
  }
  Picture.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(picture) {
    console.log(picture);//if picture === null
    if (picture === null) {
      return res.redirect('/gallery');
    }
    else {
      res.render('gallery-id-edit', {picture: picture});
    }
  });
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/secret', function(req, res) {
  console.log("Render the secret");
  console.log(req.user.username);
  console.log("WHERE IS THE SECRET");
  console.log(req.headers);
  res.render('secret', {username: req.user.username});
});

// - Post Methods
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login'
  })
);

app.post('/gallery', function (req, res, next) {
  Picture.create({
    url: req.body.url,
    author: req.body.author,
    description: req.body.description
  })
  .then(function(picture) {
    console.log(picture.toJSON());
    res.render('gallery-id', {picture: picture});
  });
});

app.put('/gallery/:id', function (req, res) {
  console.log("entering put method");
  Picture.update({
    url: req.body.url,
    author: req.body.author,
    description: req.body.description
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(function(picture) {
    res.render('gallery-id', {picture: picture});
  });
});

app.delete('/gallery/:id', function (req, res) {
  Picture.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function(pictures) {
    res.redirect('/gallery');
  });
});

db.sequelize
  .sync()
  .then(function() {
    var server = app.listen(8080, function () {
      var host = server.address().address;
      var port = server.address().port;

      console.log(`Example app listening at http://%s:%s`, host, port);
});
  })
  .catch(function (err) {
    return
  })

function isAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
}