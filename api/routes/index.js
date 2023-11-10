const bodyParser = require("body-parser");
const produto = require("./produtoRoute");
const usuarios = require("./usuariosRoute");
const auth = require("./authRoute");
const role = require("./rolesRoute");
const permissao = require("./permissaoRoute");
const seguranca = require("./segurancaRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), auth, usuarios, produto, role, permissao, seguranca);
};
