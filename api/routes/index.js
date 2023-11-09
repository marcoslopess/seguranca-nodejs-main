const bodyParser = require("body-parser");

const produto = require("./produtoRoute");
const usuarios = require("./usuariosRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), produto, usuarios);
};
