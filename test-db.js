var db = require('./models');

db.sequelize.sync()
  .then(run)

app.get('gallery/:id', function run(req, res) {
    var picture = db.Picture.findOne({
      include: [
        { model: db.User },
        { model: db.Comment }
      ]
    });
    picture.then(function (picture) {
      res.render('gallery', {
        username: post.user.username
      })
      console.log(picture.user);
    });
  });