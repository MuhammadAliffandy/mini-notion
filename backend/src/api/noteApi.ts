import express from "express";
import * as noteController from "../controllers/noteController";
import verifyJWT from "../middlewares/authMiddleware";
const router = express.Router();

router
.get('/', verifyJWT , noteController.readNotes)
.get('/:id', verifyJWT, noteController.readNote)
.post('/',  verifyJWT , noteController.createNote)
.put('/:id', verifyJWT , noteController.updateNote)
.delete('/:id', verifyJWT , noteController.deleteNote)

export default router;