import { Router } from "express";
import { createListing, getListingDetails, getListingWithFilter, sortListing, trendingListings, updateListing, deleteListing } from "../controllers/listing.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../lib/multer.js"

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
};


const router = Router()
router.get("/", getListingWithFilter)
router.get("/trending", trendingListings)
router.get("/sort", sortListing)
router.get("/:listingId", requireAuth, getListingDetails)
router.post('/create', requireAuth, createListing);
router.put("/:listingId", requireAuth, updateListing)
router.delete("/:listingId", requireAuth, deleteListing)
export default router