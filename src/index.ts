import express from "express";
import { pool } from "./db/connection.js";
import { resolve } from "path";
import { count } from "console";


const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({message: 'Api Node rodando!!!'})
})

app.get("/docs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM docs");
    res.status(200).json({
      count: result.rowCount,
      results: result.rows
     })
  } catch (error) {
    console.error(error)
    res.status(400).json({error: 'Erro ao listar docs'})
  }
})

app.post('/docs', async (req, res) => {
  try {
    const { title, content } = req.body;

    const result = await pool.query("INSERT INTO docs (title, content) VALUES ($1, $2) RETURNING *", [title, content]);
    res.status(200).json({
      messsage: "Cadastrado com sucesso",
      result: result.rows[0]
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Erro ao cadastrar doc'})
  }
})

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    return res.status(200).json({
      message: 'Conexão com banco OK!',
      serverTime: result.rows[0].now
    })
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({error: "Erro ao conectar no banco"});
  }
})

app.listen(PORT);
