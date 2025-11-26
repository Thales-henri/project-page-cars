import { pool } from "../database.js";
export default async function carrosRoutes_listar(app) {

app.get('/listar', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM carros');
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erro ao listar carros' });
    }
  });
}

