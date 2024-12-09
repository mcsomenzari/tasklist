const Sequelize = require('sequelize');
const Config = require('../config/config.json');
const User = require('./models/User')

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const environment = process.env.NODE_ENV || 'development';
    const dbConfig = Config[environment];

    //console.log(process.env.NODE_ENV);
    //console.log('Configuração carregada:', dbConfig);

    this.connection = new Sequelize(dbConfig);
    
    models.map(model => model.init(this.connection));
  }
}

module.exports = new Database;