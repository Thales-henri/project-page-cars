import { pool } from "../database.js";
export default async function usuariosRoutes_reservar(app) {
     app.post("/reservar", async (req, res) => {
     const tipo = req.headers.tipo;

     const { id_usuario, id_carro } = req.body;
     try {
          const result = await pool.query(
          `INSERT INTO carro_reservado (id_usuario, id_carro)
         VALUES ($1, $2) RETURNING * `,
        [id_usuario, id_carro]
      );
      console.log("Resposta da reserva:", result.rows[0]);
      res.send({
        mensagem: "Carro reservado com sucesso!",
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).send({ message: "Erro ao reservar carro" });
    }
  });
}
