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

export default async function carrosRoutes_upload(app) {
  app.post(
    "/uploadcarro/:id",
    { preHandler: upload.single("imagem") },
    async (req, res) => {

      console.log("FILE RECEBIDO:", req.file);

      if (!req.file) {
        return res.status(400).send({ erro: "Nenhuma imagem enviada" });
      }

      const nomeArquivo = req.file.filename;
      const id = req.params.id;

      await pool.query(
        "UPDATE carros SET imagem = $1 WHERE id = $2",
        [nomeArquivo, id]
      );

      res.send({ mensagem: "Imagem salva", arquivo: nomeArquivo });
    }
  );
}