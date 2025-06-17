import { Router } from "express";
import { createListing, deleteListing, getListingDetails, getListingWithFilter, sortListing, updateListing } from "../controllers/listing.controller.js";
import upload from "../lib/multer.js";

const router = Router()
router.get("/", getListingWithFilter)
router.get("/sort", sortListing)
router.get("/:listingId", getListingDetails)
router.post("/", upload.array("images", 3), createListing)
router.put("/:listingId", updateListing)
router.delete("/:listingId", deleteListing)
export default router