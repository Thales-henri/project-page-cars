import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool ({
  user: "postgres",
  host: "localhost",
  password: "1234",
  database: "page cars",
  port: 5432,
});

pool.connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar ao banco:", err));