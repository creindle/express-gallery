'use strict';
const faker = require('faker');

var userObject = [];
for (var i = 0; i < 50; i++){
  var temp = {
    username : faker.internet.userName(),
    password : faker.internet.password(),
    createdAt : new Date(),
    updatedAt : new Date()
  }
  userObject.push(temp);
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',
      userObject
    , {})
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users')
  }
};
