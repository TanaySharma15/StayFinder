import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { dashboard, getStats } from "../controllers/admin.controller.js";

const router = Router();
router.get("/stats", requireAuth, isAdmin, getStats)
router.get("/dashboard", requireAuth, isAdmin, dashboard)

export default router