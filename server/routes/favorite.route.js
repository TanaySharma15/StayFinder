import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import { addToFavorite, getAllFavoritesOfUser, removeFromFavorite } from "../controllers/favorite.controller.js"
const router = Router()

router.post("/:listingId", requireAuth, addToFavorite)
router.delete("/:listingId", requireAuth, removeFromFavorite)
router.get("/", requireAuth, getAllFavoritesOfUser)

export default router