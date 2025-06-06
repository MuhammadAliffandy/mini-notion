import express from "express";
import * as userController from "../controllers/userController";
const router = express.Router();

router
.post('/register', userController.registerHandler)
.post('/login', userController.loginHandler)
.get('/logout', userController.logoutHandler)

export default router;