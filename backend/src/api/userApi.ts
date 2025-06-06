
import express from "express";
import * as userController from "../controllers/userController";
import verifyJWT from "../middlewares/authMiddleware";
const router = express.Router();

router
.get('/', verifyJWT , userController.findUserById)


export default router;