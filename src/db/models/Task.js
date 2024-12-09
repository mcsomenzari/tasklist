const { Sequelize, Model } = require('sequelize');

class Task extends Model {
  static init(sequelize){
    super.init({
      task: Sequelize.STRING,
      check: Sequelize.BOOLEAN,
    },
    {
      sequelize,
    });
  }
}

module.exports = Task;