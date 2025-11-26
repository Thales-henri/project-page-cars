import { pool } from "../database.js";
import fs from 'fs'
export default async function carrosRoutes_deletar(app) {
  app.delete('/deletar/:id', async (req, res) => {
    const tipo = req.headers.tipo;
    console.log(req)

    const { id } = req.params;

    try {
      const result = await pool.query('DELETE FROM carros WHERE id = $1', [id]);

      if (result.rowCount == 0) {
        return res.status(404).send({ message: 'Carro não encontrado' });
      }

      const busca = await pool.query("SELECT imagem FROM carros WHERE id = $1", [id]);

      if (busca.rowCount === 0) {
        return res.status(404).send({ message: "Carro não encontrado" });
      }

      const nomeImagem = busca.rows[0].imagem;
      const caminhoImagem = path.resolve("src/upload", nomeImagem);

      
      await pool.query("DELETE FROM carros WHERE id = $1", [id]);

      console.log("erro ao deletar", caminhoImagem)
      fs.unlink(caminhoImagem, (err) => {
        if (err) {
          console.error("Erro ao remover o arquivo:", err);
        }
      });

      res.send({ message: 'Carro deletado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erro ao deletar carro' });
    }
  });
}