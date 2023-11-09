const { hash } = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const database = require("../models");

class usuarioService {
  async cadastrar(dto) {
    const usuario = await database.usuarios.findOne({
      where: {
        email: dto.email,
      },
    });

    if (usuario) {
      throw new Error("usuario já cadastrado");
    }

    try {
      const senhaHash = await hash(dto.senha, 8);
      const novoUsuario = await database.usuarios.create({
        id: uuidv4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      return novoUsuario;
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }

  async buscarTodosUsuarios() {
    const usuarios = await database.usuarios.findAll();

    return usuarios;
  }

  async buscarUsuarioPorId(id) {
    const usuario = await database.usuarios.findOne({
      where: {
        id: id,
      },
    });

    if (!usuario) {
      throw new Error("usuario informado não cadastrado!");
    }

    return usuario;
  }

  async editarUsuario(dto) {
    const usuario = await database.usuarios.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!usuario) {
      throw new Error("usuario informado não cadastrado!");
    }

    try {
      usuario.nome = dto.nome;
      usuario.email = dto.email;

      await usuario.save();

      return await usuario.reload();
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }

  async deletarUsuarioPorId(id) {
    const usuario = await database.usuarios.findOne({
      where: {
        id: id,
      },
    });

    if (!usuario) {
      throw new Error("usuario informado não cadastrado!");
    }

    try {
      await database.usuarios.destroy({
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

module.exports = usuarioService;
