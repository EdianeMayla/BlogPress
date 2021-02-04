//para conectar com o banco

const Sequelize = require("sequelize");
const connection = require("../database/database");

//criando a tabela no banco

const User = connection.define('users',{
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },password:{
    type: Sequelize.STRING,
    allowNull: false


  }
})

//User.sync({force: true});

module.exports = User;
