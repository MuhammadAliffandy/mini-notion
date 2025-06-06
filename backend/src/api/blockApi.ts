import express from "express";
import * as blockController from "../controllers/blockController";
const router = express.Router();

router
.get('/', blockController.readBlocks)
.get('/:id', blockController.readBlock)
.get('/noteId/:id', blockController.findByNoteId)
.post('/', blockController.createBlock)
.put('/:id', blockController.updateBlock)
.delete('/:id', blockController.deleteBlock)

export default router;