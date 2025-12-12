import multer from "fastify-multer";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../database.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(dirname, "..", "upload"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

const upload = multer({ storage });

export default async function uploadMultiplasImagens(app) {
  app.post(
    "/upload-multiplas/:id",
    { preHandler: upload.array("imagens", 10) }, 
    async (req, res) => {
      console.log("FILES RECEBIDOS:", req.files);

      if (!req.files || req.files.length === 0) {
        return res.status(400).send({ erro: "Nenhuma imagem enviada" });
      }

      const carroId = req.params.id;

      try{
        
        for (let i = 0; i < req.files.length; i++) {
          const arquivo = req.files[i];
          await pool.query(
            "INSERT INTO carro_imagens (carro_id, nome_arquivo, ordem) VALUES ($1, $2, $3)",
            [carroId, arquivo.filename, i]
          );
        }

        if (req.files.length > 0) {
          await pool.query(
            "UPDATE carros SET imagem = $1 WHERE id = $2",
            [req.files[0].filename, carroId]
          );
        }

        res.send({ 
          mensagem: "Imagens salvas com sucesso", 
          quantidade: req.files.length,
          arquivos: req.files.map(f => f.filename)
        });
      } catch (erro) {
        console.error("Erro ao salvar imagens:", erro);
        res.status(500).send({ erro: "Erro ao salvar imagens no banco" });
      }
    }
  );

  app.get("/imagens/:id", async (req, res) => {
    const carroId = req.params.id;

    try {
      const result = await pool.query(
        "SELECT id, nome_arquivo, ordem FROM carro_imagens WHERE carro_id = $1 ORDER BY ordem",
        [carroId]
      );

      res.send({ imagens: result.rows });
    } catch (erro) {
      console.error("Erro ao buscar imagens:", erro);
      res.status(500).send({ erro: "Erro ao buscar imagens" });
    }
  });

  app.delete("/imagem/:id", async (req, res) => {
    const imagemId = req.params.id;

    try {
      await pool.query("DELETE FROM carro_imagens WHERE id = $1", [imagemId]);
      res.send({ mensagem: "Imagem deletada com sucesso" });
    } catch (erro) {
      console.error("Erro ao deletar imagem:", erro);
      res.status(500).send({ erro: "Erro ao deletar imagem" });
    }
  });
}