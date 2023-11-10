const { Router } = require("express");
const SegurancaController = require("../controllers/segurancaController");

const router = Router();

router
  .post("/seguranca/acl", SegurancaController.cadastrarAcl)
  .post("/seguranca/permissoes-roles", SegurancaController.cadastrarPermissoesRoles)
  .get("/seguranca", SegurancaController.buscarTodasSegurancas)
  .get("/seguranca/id/:id", SegurancaController.buscarSegurancaPorId)
  .delete("/seguranca/id/:id", SegurancaController.deletarSegurancaPorId)
  .put("/seguranca/id/:id", SegurancaController.editarSeguranca);

module.exports = router;
