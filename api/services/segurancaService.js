const database = require("../models");
const { v4: uuidv4 } = require("uuid");
const Sequelize = require("sequelize");

class segurancaService {
  async cadastrarAcl(dto) {
    try {
      const usuario = await database.usuarios.findOne({
        include: [
          {
            model: database.roles,
            as: "usuario_roles",
            attributes: ["id", "nome", "descricao"],
            through: {
              attributes: [],
            },
          },
          {
            model: database.permissoes,
            as: "usuario_permissoes",
            attributes: ["id", "nome", "descricao"],
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          id: dto.usuarioId,
        },
      });

      if (!usuario) {
        throw new Error("Usuario não cadastrado");
      }

      const rolesCadastradas = await database.roles.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: dto.roles,
          },
        },
      });

      const permissoesCadastradas = await database.permissoes.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: dto.permissoes,
          },
        },
      });

      await usuario.removeUsuario_roles(usuario.usuario_roles);
      await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

      await usuario.addUsuario_roles(rolesCadastradas);
      await usuario.addUsuario_permissoes(permissoesCadastradas);

      const novoUsuario = await database.usuarios.findOne({
        include: [
          {
            model: database.roles,
            as: "usuario_roles",
            attributes: ["id", "nome", "descricao"],
            through: {
              attributes: [],
            },
          },
          {
            model: database.permissoes,
            as: "usuario_permissoes",
            attributes: ["id", "nome", "descricao"],
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          id: dto.usuarioId,
        },
      });

      return novoUsuario;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar segurança");
    }
  }

  async cadastrarPermissoesRoles(dto) {
    try {
      const role = await database.roles.findOne({
        include: [
          {
            model: database.permissoes,
            as: "roles_das_permissoes",
            attributes: ["id", "nome", "descricao"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (!role) {
        throw new Error("Role não cadastrada");
      }

      const permissoesCadastradas = await database.permissoes.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: dto.permissoes,
          },
        },
      });

      await role.removeRoles_das_permissoes(role.roles_das_permissoes);
      await role.addRoles_das_permissoes(permissoesCadastradas);

      const novaRole = await database.roles.findOne({
        include: [
          {
            model: database.permissoes,
            as: "roles_das_permissoes",
            attributes: ["id", "nome", "descricao"],
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          id: dto.roleId,
        },
      });

      return novaRole;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar permissões da role");
    }
  }

  async buscarTodasSegurancas() {
    const segurancas = await database.segurancas.findAll();

    return segurancas;
  }

  async buscarPermissaoPorId(id) {
    const seguranca = await database.segurancas.findOne({
      where: {
        id: id,
      },
    });

    if (!seguranca) {
      throw new Error("segurança informada não cadastrada!");
    }

    return seguranca;
  }

  async editarPermissao(dto) {
    const seguranca = await database.segurancas.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!seguranca) {
      throw new Error("segurança informada não cadastrada!");
    }

    try {
      seguranca.nome = dto.nome;
      seguranca.descricao = dto.descricao;

      await seguranca.save();

      return await seguranca.reload();
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }

  async deletarPermissaoPorId(id) {
    const seguranca = await database.segurancas.findOne({
      where: {
        id: id,
      },
    });

    if (!seguranca) {
      throw new Error("segurança informada não cadastrada!");
    }

    try {
      await database.segurancas.destroy({
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

module.exports = segurancaService;
