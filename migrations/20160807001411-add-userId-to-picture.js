'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .addColumn('Pictures', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .removeColumn('Pictures', 'user_id');
      // .then(function () {
      //   return queryInterface
      //     .removeColumn('Pictures', 'user_id');
      // })
  }
};
