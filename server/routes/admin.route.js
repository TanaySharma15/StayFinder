import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { dashboard, getAllBookings, getAllListingForAdmin, getAllUsers, getStats } from "../controllers/admin.controller.js";

const router = Router();
router.get("/stats", requireAuth, getStats)
router.get("/dashboard", requireAuth, dashboard)
router.get("/getUsers", requireAuth, getAllUsers)
router.get("/listings", requireAuth, getAllListingForAdmin)
router.get("/bookings", requireAuth, getAllBookings)
export default router