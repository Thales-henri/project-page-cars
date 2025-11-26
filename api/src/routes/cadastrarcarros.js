import { pool } from "../database.js";
export default async function carrosRoutes_cadastrar(app) {
app.post('/cadastrar', async (req, res) => {
   
console.log("BODY RECEBIDO:", req.body);
  const { modelo, marca, preco, ano, km} = req.body;
 try {
    const result = await pool.query(
      `INSERT INTO carros (marca, modelo, ano, preco, km)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [marca, modelo, ano, preco, km]
    );

    return res.send({ id: result.rows[0].id }); 
  } catch (err) {
    console.error("ERRO AO CADASTRAR CARRO:", err);;
    return res.status(500).send({ erro: "Erro ao cadastrar carro" })
  }
})};
