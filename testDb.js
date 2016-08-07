var db = require('./models');

db.sequelize.sync()
  .then(run)

  function run() {
    var picture = db.Picture.findOne();

    picture.then(function (picture) {
      //console.log(picture.prototype);
      picture.getUser()
        .then(function(user) {
          console.log(user.username);
          res.render('/gallery', {
            username:user.username,
            url: post.url
          })
        })
    });
  }
