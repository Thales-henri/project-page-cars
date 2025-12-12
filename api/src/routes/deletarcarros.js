import { pool } from "../database.js";
import fs from "fs";
import path from "path";

export default async function carrosRoutes_deletar(app) {
  app.delete("/deletar/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const reserva = await pool.query(
        "SELECT * FROM carro_reservado WHERE id_carro = $1",
        [id]
      );
    console.log('ERRO 400',reserva.rowCount)
      if (reserva.rowCount > 0) {
        return res.status(400).send({
          message: "Este carro ja está reservado e não pode ser excluído."
        });
      }

      const busca = await pool.query(
        "SELECT imagem FROM carros WHERE id = $1",
        [id]
      );

      if (busca.rowCount == 0) {
        return res.status(404).send({ message: "Carro não encontrado" });
      }

      const nomeImagem = busca.rows[0].imagem;
      const caminhoImagem = path.resolve("src/upload", nomeImagem);

      const result = await pool.query("DELETE FROM carros WHERE id = $1", [id]);

      if (result.rowCount === 0) {
        return res.status(404).send({ message: "Carro não encontrado" });
      }

      fs.unlink(caminhoImagem, (err) => {
        if (err) {
          console.error("Erro ao remover o arquivo:", err);
        }
      });

      res.send({ message: "Carro deletado com sucesso!" });

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Erro ao deletar carro" });
    }
  });
}
