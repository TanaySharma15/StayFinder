import prisma from "../lib/prisma.js"

export const getListingWithFilter = async (req, res) => {
    try {
        const { city, state, country, guests, minPrice, maxPrice, dateFrom, dateTo } = req.query;

        const where = {
            // status: "PENDING"
        };

        if (city) where.city = { equals: city, mode: 'insensitive' };
        if (state) where.state = { equals: state, mode: 'insensitive' };
        if (country) where.country = { equals: country, mode: 'insensitive' };

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = Number(minPrice);
            if (maxPrice) where.price.lte = Number(maxPrice);
        }

        if (guests) {
            where.bookings = {
                some: {
                    guests: {
                        gte: Number(guests),
                    },
                },
            };
        }
        if (dateFrom && dateTo) {
            where.bookings = {
                none: {
                    OR: [
                        {
                            dateFrom: {
                                lte: new Date(dateTo)
                            },
                            dateTo: {
                                gte: new Date(dateFrom)
                            }
                        }
                    ]
                }
            }
        }
        const listings = await prisma.listing.findMany({
            where,
            include: {
                host: {
                    select: {
                        name: true
                    }
                }
            }
        });

        res.status(200).json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
};


export const getListingDetails = async (req, res) => {
    try {
        const { listingId } = req.params
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
                // status: "APPROVED"
            },
            select: {
                title: true,
                description: true,
                price: true,
                address: true,
                city: true,
                state: true,
                country: true,
                imageUrls: true,
                latitude: true,
                longitude: true,
                rules: true,
                amenities: true,
                host: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                bookings: {
                    select: {
                        dateFrom: true,
                        dateTo: true
                    }
                }
            }
        })
        if (!listing) {
            return res.status(400).json({
                message: "lisitngs not found"
            })
        }
        res.status(200).json({
            message: "Listing found",
            data: listing
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured"
        })
    }
}

export const createListing = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            city,
            state,
            country,
            guests
        } = req.body;



        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                price: Number(price),
                city,
                state,
                country,
                guests,
                // latitude: latitude ? parseFloat(latitude) : null,
                // longitude: longitude ? parseFloat(longitude) : null,
                hostId: req.user.id
            }
        });

        res.status(201).json({
            message: 'Listing created',
            data: listing
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Failed to create listing',
            error
        });
    }
};

export const updateListing = async (req, res) => {
    try {
        const { listingId } = req.params;
        const { title, description, price, address, city, state, country } = req.body
        const listing = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                title,
                description,
                price,
                address,
                city,
                state,
                country,
            }
        })
        res.status(200).json({
            message: "Listing Updated Successfully",
            data: listing
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create listing',
            error
        });
    }
}


export const sortListing = async (req, res) => {
    const { sort } = req.query
    let orderBy = {}
    if (sort === "price_asc") {
        orderBy = { price: "asc" };
    } else if (sort === "price_desc") {
        orderBy = { price: "desc" };
    } else if (sort === "newest") {
        orderBy = { createdAt: "desc" };
    } else if (sort === "popular") {
        orderBy = {
            favorites: { _count: "desc" }
        };
    }
    const listings = await prisma.listing.findMany({
        orderBy,
        where: {
            status: "APPROVED"
        },
        include: {
            host: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            bookings: true,
        },
    })
    if (!listings) {
        return res.status(400).json({
            message: "No listing found"
        })
    }
    res.status(200).json({
        message: "Listing found",
        listings
    })
}

export const trendingListings = async (req, res) => {
    try {
        const trending = await prisma.listing.findMany({
            orderBy: {
                favoritedBy: {
                    _count: "desc"
                }
            },
            take: 4,
            select: {
                id: true,
                country: true,
                title: true,
                imageUrls: true,
                price: true
            }
        })
        res.status(200).json({
            message: "Trending destination",
            trending
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const deleteListing = async (req, res) => {
    try {
        const { listingId } = req.params
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
        });

        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        await prisma.listing.delete({
            where: {
                id: listingId
            }
        })
        res.status(200).json({
            message: "Listing deleted successfully"
        })
    } catch (error) {
        console.log(error);
        if (error.code === "P2003") {
            return res.status(501).json({
                message: "Listing is already booked"
            })
        }
        res.status(500).json({
            message: 'Failed to delete listing',
            error
        });
    }
}
