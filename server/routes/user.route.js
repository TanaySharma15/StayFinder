import { Router } from "express";
import { getUserDetails, getUserListings, updateUserDetails } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router()
router.get("/profile", requireAuth, getUserDetails)
router.get("/listings", requireAuth, getUserListings)
router.put("/profile", requireAuth, updateUserDetails)
export default router