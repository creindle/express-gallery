module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Picture.belongsTo(models.User);
      }
    }
  });
  return Picture;
};