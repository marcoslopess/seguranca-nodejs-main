const { Router } = require("express");
const ProdutoController = require("../controllers/produtoController");
const roles = require("../middleware/roles");
const permissoes = require("../middleware/permissoes");
const permissoesRoles = require("../middleware/permissoesRoles");

const router = Router();

router
  .post("/produto", permissoesRoles(["Adicionar"]), ProdutoController.cadastrarProduto)
  .get("/produto", permissoes(["Listar"]), ProdutoController.buscarTodosProdutos)
  .get("/produto/id/:id", permissoesRoles(["Listar"]), ProdutoController.buscarProdutoPorId)
  .delete("/produto/id/:id", roles(["admin"]), permissoes(["Excluir"]), ProdutoController.deletarProdutoPorId)
  .put("/produto/id/:id", permissoesRoles(["Editar"]), ProdutoController.editarProduto);

module.exports = router;
