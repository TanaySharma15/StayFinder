import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { banUserAccount, dashboard, getAllBookings, getAllListingForAdmin, getAllUsers, getSpecificUser, getStats, unbanUserAccount } from "../controllers/admin.controller.js";

const router = Router();
router.get("/stats", requireAuth, isAdmin, getStats)
router.get("/dashboard", requireAuth, isAdmin, dashboard)
router.get("/getUsers", requireAuth, isAdmin, getAllUsers)
router.get("/listings", requireAuth, isAdmin, getAllListingForAdmin)
router.get("/bookings", requireAuth, isAdmin, getAllBookings)
router.get("/user/:userId", requireAuth, isAdmin, getSpecificUser)
router.post("/ban/:userId", requireAuth, isAdmin, banUserAccount)
router.post("/unban/:userId", requireAuth, isAdmin, unbanUserAccount)
export default router