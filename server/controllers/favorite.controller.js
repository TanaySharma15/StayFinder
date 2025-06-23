import prisma from "../lib/prisma.js";

export const addToFavorite = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: user not found in request" });
        }
        const { listingId } = req.params
        const listing = await prisma.listing.findUnique({ where: { id: listingId } });
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                favorites: {
                    connect: {
                        id: listingId
                    }
                }
            },
            include: {
                favorites: true
            }

        })
        res.status(200).json({
            message: "Added to favorites",
            data: updatedUser.favorites
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

export const removeFromFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const listingId = req.params.listingId;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                favorites: {
                    disconnect: { id: listingId },
                },
            },
            include: { favorites: true },
        });

        res.json({ message: "Removed from favorites", data: updatedUser.favorites });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove from favorites", error: err });
    }
};


export const getAllFavoritesOfUser = async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                listing: true,
            }
        })
        res.status(200).json({
            message: "Favorites fetched",
            favorites
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to get favorites", error });

    }
}