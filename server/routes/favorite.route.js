import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import { addToFavorite, getAllFavoritesOfUser, removeFromFavorites } from "../controllers/favorite.controller.js"
const router = Router()

router.post("/:listingId", requireAuth, addToFavorite)
router.delete("/:listingId", requireAuth, removeFromFavorites)
router.get("/", requireAuth, getAllFavoritesOfUser)

export default router