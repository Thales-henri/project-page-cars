import { pool } from "../database.js";
export default async function usuariosRoutes_cadastrar(app) {
    app.post("/cadastrar", async (req, res) => {
        const { nome, sobrenome, numero, cpf, email, senha} = req.body;

        if (!nome || !sobrenome || !numero || !cpf || !email || !senha ) {
            return res.status(400).send({ erro: "Preencha todos os campos." });
        }

        const tipoUsuario = "usuario"

        try {
            const result = await pool.query(`
        INSERT INTO usuario (nome, sobrenome, numero, cpf, email, senha, tipo)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [nome, sobrenome, numero, cpf, email, senha, tipoUsuario]);
            console.log("Resposta do cadastro:", result.rows[0]);
            res.send({
                mensagem: "Usuário cadastrado com sucesso!",
                ok: true
            });

        } catch (erro) {
            console.error(erro);
            return res.status(500).send({ erro: "Erro ao cadastrar no banco." });
        }
    });
}