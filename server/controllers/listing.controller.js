import cloudinary from "../lib/cloudinary.js"
import prisma from "../lib/prisma.js"

export const getListingWithFilter = async (req, res) => {
    try {
        const { city, state, country, guests, minPrice, maxPrice, dateFrom, dateTo } = req.query;

        const where = {};

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
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                bookings: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
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
                id: listingId
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
            hostId,
            title,
            description,
            price,
            address,
            city,
            country,
            latitude,
            longitude
        } = req.body;

        const imageUrls = await Promise.all(
            req.files.map(file => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "stayFinder"
                        },
                        (err, result) => {
                            if (err) return reject(err);
                            resolve(result.secure_url);
                        }
                    );
                    stream.end(file.buffer);
                });
            })
        );

        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                price: Number(price),
                address,
                city,
                country,
                latitude: latitude ? parseFloat(latitude) : null,
                longitude: longitude ? parseFloat(longitude) : null,
                imageUrls,
                hostId
            }
        });

        res.status(201).json({
            message: 'Listing created',
            data: listing
        });
    } catch (error) {
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

export const deleteListing = async (req, res) => {
    try {
        const { listingId } = req.params
        const lisitngs = await prisma.listing.delete({
            where: {
                id: listingId
            }
        })
        res.status(200).json({
            message: "Listing deleted successfully"
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