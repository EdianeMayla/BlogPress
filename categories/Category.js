//para conectar com o banco

const Sequelize = require("sequelize");
const connection = require("../database/database");

//criando a tabela no banco

const Category = connection.define('categories',{
  title:{
    type: Sequelize.STRING,
    allowNull: false
  },slug:{
    type: Sequelize.STRING,
    allowNull: false


  }
})

Category.sync({force: true});

module.exports = Category;
