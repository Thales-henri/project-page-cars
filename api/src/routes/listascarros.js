import { pool } from "../database.js";
export default async function carrosRoutes_listar(app) {

app.get('/listar', async (req, res) => {
  try {
      const result = await pool.query(` SELECT 
          c.*,
          u.nome AS nome_reserva
          FROM carros c
          LEFT JOIN carro_reservado r 
          ON r.id_carro = c.id
          LEFT JOIN usuario u 
          ON u.id = r.id_usuario
          `);
      res.send(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erro ao listar carros' });
    }
  });
}

