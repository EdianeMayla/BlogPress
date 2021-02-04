const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require('express-session');

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");
const sessionUser = require("./middleware/sessionUser");
const flash = require('express-flash-messages');


app.use(flash());

//view engine
app.set('view engine', 'ejs');

//sessions

app.use(session({
  secret: "testedeacesso", cookie: { maxAge: 1200000 } 
}))

app.use(sessionUser);
//Static

app.use(express.static('public'));

//body parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database

connection
  .authenticate()
  .then(() => {
    console.log("conexão realizada com sucesso");
  }).catch((error) => {
    console.log(error);
  })

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

//Modelo de rotas utilizando express session 
// app.get("/session", (req, res) => {
// });
// app.get("/reading", (req, res) => { 
// });


app.get("/", (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 4
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
})

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        res.render("article", { article: article, categories: categories });
      });
    } else {
      res.redirect("/");
    }
  }).catch(err => {
    res.redirect("/");
  });
})

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug
    },
    include: [{ model: Article }]
  }).then(category => {
    if (category != undefined) {

      Category.findAll().then(categories => {
        res.render("index", { articles: category.articles, categories: categories });
      });
    } else {
      res.redirect("/");
    }
  }).catch(err => {
    res.redirect("/");
  });
})

app.listen(8080, () => {
  console.log("o servidor está rodando")
})