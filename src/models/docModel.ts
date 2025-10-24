import { pool } from "../db/connection.js";

export interface Doc {
  title: string;
  content: string;
}

export async function findAllDocs(): Promise<Doc[]> {
  const { rows } = await pool.query('SELECT * FROM docs ORDER BY id ASC');
  return rows;
}

export async function findDocById(id: number): Promise<Doc> {
  const { rows }  = await pool.query('SELECT * FROM docs WHERE id=$1', [id])
  return rows[0];
}

export async function createDoc(title: string, content: string): Promise<Doc> {
  const { rows } = await pool.query('INSERT INTO docs (title, content) VALUES ($1, $2)', [title, content])
  return rows[0];
}