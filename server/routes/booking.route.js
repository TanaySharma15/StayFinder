import { Router } from "express";
import {
    getAllBookingsByUser,
    createBooking,
    getBookingDetailsForUser,
    updateBookingByUser,
    deleteBookingByUser
} from "../controllers/booking.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, getAllBookingsByUser);
router.get("/:bookingId", requireAuth, getBookingDetailsForUser);
router.post("/:listingId", requireAuth, createBooking);
router.put("/:bookingId", requireAuth, updateBookingByUser);
router.delete("/:bookingId", requireAuth, deleteBookingByUser);

export default router;
