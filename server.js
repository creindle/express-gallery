/*
​*GET /*​: `Returning a list of gallery photos`
​*GET /gallery/4*​: `Single gallery 4`
​*GET /gallery/new*​: `Gallery submission form`
​*POST /gallery*​: `Creating a gallery with {author}, {url}, {description}`
​*PUT /gallery/4*​: `Updating gallery with {new_author}, {new_url}, {new_description}`
​*DELETE /gallery/4*​: `Deleting gallery 4`
*/

console.log("Sanity check");
// Include json file

// Module - Express
var express = require('express');
var app = express();

var db = require('./models');
var Picture = db.Picture;
//console.log('db: ', db);

// Module - Pug/Jade
var pug = require('pug');

// Module - morgan
var morgan = require('morgan');

// Module - body-parser
var bodyParser = require('body-parser');

// Module - querystring
var querystring = require('querystring');

// Module - method-override
var methodOverride = require('method-override');
var connect = require('connect');

// Module - passport
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;  // Want to use Basic Authentication Strategy

// Other variables
var path = require('path');
//var Gallery = require('./gallery');

// Express
app.use(express.static('public'));


// Pug
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

// morgan
app.use(morgan('dev'));

// body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Middleware - Passport/Basic Strategy
var user = { username: 'bob', password: 'secret', email: 'bob@example.com' };
passport.use(new BasicStrategy(
  function(username, password, done) {
    // Example authentication strategy using
    if ( !(username === user.username && password === user.password) ) {
      return done(null, false);
    }
    return done(null, user);
}));

// Method-override
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
  res.redirect('/gallery');
});

app.get('/gallery/new', function (req, res) {
  res.render('gallery-new');
});

app.get('/gallery', function (req, res) {
  Picture.findAll()
    .then(function(picture) {
      res.render('gallery', {picture: picture});
    });
});

app.get('/gallery/:id',
  passport.authenticate('basic', { session: false }),
  function(req,res)  {
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
    res.json(pictures);
  });
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Example app listening at http://%s:%s`, host, port);
  db.sequelize.sync();
});