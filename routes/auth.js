import { Router } from "express";
import { login } from "../controllers/auth.js";

const router = Router();

router.use("/login", login);

export default router;