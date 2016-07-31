'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username : 'mary',
      password : 'jane',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      username :'mary'
    }])
  }
};
