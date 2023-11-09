const database = require("../models");
const { v4: uuidv4 } = require("uuid");

class permissaoService {
  async cadastrar(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (permissao) {
      throw new Error("permissao já cadastrada");
    }

    try {
      const novaPermissao = await database.permissoes.create({
        id: uuidv4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return novaPermissao;
    } catch (error) {
      throw new Error("Erro ao cadastrar permissao");
    }
  }

  async buscarTodasPermissoes() {
    const permissoes = await database.permissoes.findAll();

    return permissoes;
  }

  async buscarPermissaoPorId(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });

    if (!permissao) {
      throw new Error("permissao informada não cadastrada!");
    }

    return permissao;
  }

  async editarPermissao(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!permissao) {
      throw new Error("permissao informada não cadastrada!");
    }

    try {
      permissao.nome = dto.nome;
      permissao.descricao = dto.descricao;

      await permissao.save();

      return await permissao.reload();
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }

  async deletarPermissaoPorId(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });

    if (!permissao) {
      throw new Error("permissao informada não cadastrada!");
    }

    try {
      await database.permissoes.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
}

module.exports = permissaoService;
