import { Router } from "express";
import {
    getAllBookingsByUser,
    getBookingDetails,
    createBooking,
    updateBooking,
    deleteBooking
} from "../controllers/booking.controller.js";

const router = Router();

router.get("/", getAllBookingsByUser);
router.get("/:bookingId", getBookingDetails);
router.post("/:listingId", createBooking);
router.put("/:bookingId", updateBooking);
router.delete("/:bookingId", deleteBooking);

export default router;
