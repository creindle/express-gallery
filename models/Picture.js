module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    url: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Picture.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
      }
    }
  });
  return Picture;
};