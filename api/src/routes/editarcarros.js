import { pool } from "../database.js";
export default async function carrosRoutes_editar(app) {
app.put("/editar/:id", async (req, res) => {
    const id = req.params.id;
    const { marca, modelo, ano, preco, km, descricao } = req.body;

    try {
        await pool.query(
                `UPDATE carros 
                SET marca=$1, modelo=$2, ano=$3, preco=$4, km=$5, descricao=$6
                WHERE id=$7`,
            [marca, modelo, ano, preco, km, descricao, id]
        );

        res.send({ mensagem: "Carro atualizado com sucesso!" });
    } catch (erro) {
        console.error(erro);
        res.status(500).send({ mensagem: "Erro ao atualizar carro" });
    }
})
};