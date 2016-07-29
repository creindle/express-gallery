'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pictures', [{
      url : 'https://yournorthcounty.com/wp-content/uploads/2016/03/5168676178_42e170ce06_o.jpg',
      author : 'Christie Reindle :D',
      description : 'Dreams come true :)',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Pictures', [{
      url : 'https://yournorthcounty.com/wp-content/uploads/2016/03/5168676178_42e170ce06_o.jpg'
    }])
  }
};
