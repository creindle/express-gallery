'use strict';
const faker = require('faker');

var pictureObject = [];
for (var i = 0; i < 50; i++){
  var temp = {
    user_id : faker.random.number({min: 1, max: 50}),
    url : faker.image.imageUrl(500, 500, "abstract") + '/' + Math.floor(Math.random() * 11),
    author : faker.name.firstName() + " " + faker.name.firstName(),
    description : faker.lorem.sentence(),
    createdAt : new Date(),
    updatedAt : new Date(),
  }
  pictureObject.push(temp);
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pictures',
      pictureObject
    , {})
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Pictures')
  }
};
