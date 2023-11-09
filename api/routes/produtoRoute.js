const { Router } = require("express");
const ProdutoController = require("../controllers/produtoController");
const autenticado = require("../../middleware/autenticado");
const router = Router();

router.use(autenticado);

router
  .post("/produto", ProdutoController.cadastrarProduto)
  .get("/produto", ProdutoController.buscarTodosProdutos)
  .get("/produto/id/:id", ProdutoController.buscarProdutoPorId)
  .delete("/produto/id/:id", ProdutoController.deletarProdutoPorId)
  .put("/produto/id/:id", ProdutoController.editarProduto);

module.exports = router;
