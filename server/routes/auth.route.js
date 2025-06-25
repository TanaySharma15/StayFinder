import { Router } from "express";
import { signup, login, logoutUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logoutUser)
export default router;
