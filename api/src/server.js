import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifyMultipart from "@fastify/multipart";

import path from "path";
import { fileURLToPath } from "url";




import carrosRoutes_listar from "./routes/listascarros.js";
import carrosRoutes_editar from "./routes/editarcarros.js";
import carrosRoutes_cadastrar from "./routes/cadastrarcarros.js";
import carrosRoutes_deletar from "./routes/deletarcarros.js";
import carrosRoutes_upload from "./routes/uploadcarro.js";

import usuariosRoutes_cadastrar from "./routes/cadastrarusuarios.js";
import usuariosRoutes_reservar from "./routes/reservarcarro.js";
import usuariosRoutes_login from "./routes/efetuarlogin.js";

const app = fastify();


app.register(fastifyMultipart);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "..", "upload");

app.register(fastifyStatic, {
  root: path.join(
    "C:/Users/Thale/OneDrive/Desktop/thales/projetos/project page cars/api/src/upload"
  ),
  prefix: "/image/",
});

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

app.register(usuariosRoutes_cadastrar, {prefix: "/usuarios"})
app.register(usuariosRoutes_login, { prefix: "/usuarios"})
app.register(usuariosRoutes_reservar, { prefix: "/usuarios" });
app.register(carrosRoutes_listar, { prefix: "/carros" });
app.register(carrosRoutes_editar, { prefix: "/carros" });
app.register(carrosRoutes_cadastrar, { prefix: "/carros" });
app.register(carrosRoutes_deletar, { prefix: "/carros" });
app.register(carrosRoutes_upload, {prefix: "/carros"});



app.addHook('onResponse', (req, res, done) => {
    res.header('access-control-allow-origin', '*')
done();
});

app.listen({ port: 3004 }).then(() => {
  console.log("server running")
});