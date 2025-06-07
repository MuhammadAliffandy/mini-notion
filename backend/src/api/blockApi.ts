import express from "express";
import * as blockController from "../controllers/blockController";
import verifyJWT from "../middlewares/authMiddleware";
const router = express.Router();

router
.get('/', verifyJWT, blockController.readBlocks)
.get('/:id', verifyJWT, blockController.readBlock)
.get('/noteId/:id', verifyJWT, blockController.findByNoteId)
.post('/', verifyJWT, blockController.createBlock)
.put('/:id',verifyJWT, blockController.updateBlock)
.delete('/:id',verifyJWT, blockController.deleteBlock)

export default router;