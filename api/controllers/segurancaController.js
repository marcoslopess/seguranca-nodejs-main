const SegurancaService = require("../services/segurancaService");
const segurancaService = new SegurancaService();

class SegurancaController {
  static async cadastrarAcl(req, res) {
    const { roles, permissoes } = req.body;
    const { usuarioId } = req;

    try {
      const acl = await segurancaService.cadastrarAcl({ roles, permissoes, usuarioId });

      res.status(201).json(acl);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
  static async cadastrarPermissoesRoles(req, res) {
    const { roleId, permissoes } = req.body;

    try {
      const permissoesRoles = await segurancaService.cadastrarPermissoesRoles({ roleId, permissoes });

      res.status(201).json(permissoesRoles);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodasSegurancas(req, res) {
    const segurancas = await segurancaService.buscarTodasSegurancas();

    res.status(200).json(segurancas);
  }

  static async buscarSegurancaPorId(req, res) {
    try {
      const { id } = req.params;
      const seguranca = await segurancaService.buscarSegurancaPorId(id);

      res.status(200).json(seguranca);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async editarSeguranca(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    try {
      const seguranca = await segurancaService.editarSeguranca({ id, nome, descricao, preco });

      res.status(200).json(seguranca);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deletarSegurancaPorId(req, res) {
    const { id } = req.params;

    try {
      await segurancaService.deletarSegurancaPorId(id);

      res.status(200).send({ message: "Seguranca deletada com sucesso!" });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = SegurancaController;
