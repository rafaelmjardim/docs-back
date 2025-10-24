import { Request, Response } from "express";
import { createDoc, findAllDocs, findDocById } from "../models/docModel.js";

export const getAllDocs = async (req: Request, res: Response) => {
  try {
    const docs = await findAllDocs();
    return res.status(200).json({results: docs});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao buscar as documentações'});
  }
}

export const getDocById = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    
    const doc = await findDocById(id)
    return res.status(200).json({results: doc});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro ao buscar a documentação'});
  }
}

export const postDoc = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    await createDoc(title, content);
    res.status(200).json({message: 'Documentação cadastrada com sucesso!'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Erro ao criar documentação"});
  }
}