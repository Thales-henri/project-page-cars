import { pool } from "../database.js";
export default async function carrosRoutes_editar(app) {
app.put("/carros/editar/:id", async (req, res) => {
    const id = req.params.id;
    const { marca, modelo, ano, preco, km } = req.body;

    try {
        await pool.query(
              `UPDATE carros 
              SET marca=$1, modelo=$2, ano=$3, preco=$4, km=$5
              WHERE id=$6`,
            [marca, modelo, ano, preco, km, id]
        );

        res.send({ mensagem: "Carro atualizado com sucesso!" });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: "Erro ao atualizar carro" });
    }
})
};