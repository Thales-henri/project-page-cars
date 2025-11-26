import { pool } from "../database.js";

export default async function usuariosRoutes_login(app) {
  app.post("/login", async (req, res) => {
    const { email, senha} = req.body;

    if (!email || !senha) {
      return res.status(400).send({ erro: "Preencha email e senha." });
    }

    try {
      const result = await pool.query(
        "SELECT * FROM usuario WHERE email = $1 AND senha = $2",
        [email, senha]
      );

      if (result.rows.length == 0) {
        return res.status(400).send({ erro: "Email ou senha incorretos." });
      }

      const usuario = result.rows[0];

      return res.send({
        mensagem: "Login realizado!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.tipo 
        }
      });

    } catch (erro) {
      console.error(erro);
      return res.status(500).send({ erro: "Erro no servidor." });
    }
  });
}
