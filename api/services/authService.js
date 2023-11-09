const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

class authService {
  async login(dto) {
    try {
      const usuario = await database.usuarios.findOne({
        attributes: ["id", "email", "senha"],
        where: {
          email: dto.email,
        },
      });

      if (!usuario) {
        throw new Error("usuario não cadastrado");
      }

      const senhasIguais = await compare(dto.senha, usuario.senha);

      if (!senhasIguais) {
        throw new Error("email ou senha incorretas");
      }

      const accessToken = sign(
        {
          id: usuario.id,
          email: usuario.email,
        },
        jsonSecret.secret,
        {
          expiresIn: 86400,
        }
      );

      return { accessToken, expiresIn: 86400 };
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
}

module.exports = authService;
