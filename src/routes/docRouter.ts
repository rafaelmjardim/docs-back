import { Router } from "express";
import { getAllDocs, getDocById, postDoc } from "../controllers/docsController.js";

const router = Router();

router.get('/', getAllDocs);
router.get('/:id', getDocById);

router.post('/', postDoc);


export default router;