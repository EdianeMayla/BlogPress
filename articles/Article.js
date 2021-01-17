//para conectar com o banco

const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category")// exportando o model para relacionamento

//criando a tabela no banco

const Article = connection.define('articles',{
  title:{
    type: Sequelize.STRING,
    allowNull: false,
  },slug:{
    type: Sequelize.STRING,
    allowNull: false,
  },
    body:{
    type:Sequelize.TEXT,
    allowNull: false,
  },
})


//criando o relacionamento

Category.hasMany(Article);//uma categoria pertence a muitos artigos
Article.belongsTo(Category);//um artigo pertence a uma categoria

// Atualizando o relacionamento no banco

//Article.sync({force: true});

module.exports = Article;
