import express from "express";
import auth from "../api/authApi"
import note from "../api/noteApi";
import block from "../api/blockApi";
import user from "../api/userApi";
const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/notes', note);
router.use('/blocks', block);

export default router;