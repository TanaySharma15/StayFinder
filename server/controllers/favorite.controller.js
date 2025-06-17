import prisma from "../lib/prisma.js";

export const addToFavorite = async (req, res) => {
    try {
        const { listingId } = req.params
        const userId = req.user.id;
        const listing = await prisma.listing.findUnique({ where: { id: listingId } });
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        const favorite = await prisma.favorite.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                listing: {
                    connect: {
                        id: listingId
                    }
                }
            }

        })
        res.status(200).json({
            message: "Added to favorites",
            favorite
        })
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Already favorited" });
        }

        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const removeFromFavorite = async (req, res) => {
    try {
        const { listingId } = req.params
        const userId = req.user.id
        const listing = await prisma.listing.findUnique({ where: { id: listingId } });
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        const favorite = await prisma.favorite.findUnique({
            where: {
                userId_listingId: {
                    userId,
                    listingId
                }
            }
        })
        if (!favorite) {
            return res.status(400).json({
                message: "Not added in favorite"
            })
        }
        const remove = await prisma.favorite.delete({
            where: {
                userId: userId,
                listingId: listingId
            }
        })
        res.status(200).json({
            message: "Removed from favorites"
        })
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const getAllFavoritesOfUser = async (req, res) => {
    try {
        const userId = req.user.id
        const favorites = await prisma.favorite.findMany({
            where: {
                userId: userId
            },
            include: {
                listing: true
            }
        })
        res.status(200).json({
            message: "Favorites fetched",
            favorites
        })
    } catch (error) {

    }
}