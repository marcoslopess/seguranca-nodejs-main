const PermissaoService = require("../services/permissaoService");
const permissaoService = new PermissaoService();

class PermissaoController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const permissao = await permissaoService.cadastrar({ nome, descricao });

      res.status(201).json(permissao);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodasPermissoes(req, res) {
    const permissaos = await permissaoService.buscarTodasPermissoes();

    res.status(200).json(permissaos);
  }

  static async buscarPermissaoPorId(req, res) {
    try {
      const { id } = req.params;
      const permissao = await permissaoService.buscarPermissaoPorId(id);

      res.status(200).json(permissao);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async editarPermissao(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    try {
      const permissao = await permissaoService.editarPermissao({ id, nome, descricao, preco });

      res.status(200).json(permissao);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deletarPermissaoPorId(req, res) {
    const { id } = req.params;

    try {
      await permissaoService.deletarPermissaoPorId(id);

      res.status(200).send({ message: "Permissao deletada com sucesso!" });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissaoController;
