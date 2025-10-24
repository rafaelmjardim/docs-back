import express from "express";
import { pool } from "./db/connection.js";
import docRoutes from "./routes/docRouter.js";


const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({message: 'Api Node rodando!!!'})
})

app.use('/docs', docRoutes);

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
