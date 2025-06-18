import { Router } from "express";
import {
    getAllBookingsByUser,
    createBooking,
    getBookingDetailsForUser,
    updateBookingByUser,
    deleteBookingByUser
} from "../controllers/booking.controller.js";

const router = Router();

router.get("/", getAllBookingsByUser);
router.get("/:bookingId", getBookingDetailsForUser);
router.post("/:listingId", createBooking);
router.put("/:bookingId", updateBookingByUser);
router.delete("/:bookingId", deleteBookingByUser);

export default router;
