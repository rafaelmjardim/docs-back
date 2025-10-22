import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Log opcional para testar conexão
pool.connect()
.then(() => console.log("Banco conectado!"))
.catch((error) => console.error("Erro ao conectar ao banco", error))