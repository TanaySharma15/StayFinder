import prisma from "../lib/prisma.js"
import { startOfWeek, endOfWeek } from 'date-fns';

export const getStats = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        const allListings = await prisma.listing.findMany();
        const allBooking = await prisma.booking.findMany()
        const allFavorites = await prisma.favorite.findMany()
        res.status(200).json({
            message: "All stats!",
            allUsers, allListings, allBooking, allFavorites
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const dashboard = async (req, res) => {
    try {
        const totalUser = await prisma.user.count({
            where: {
                role: "user"
            }
        })
        const totalListing = await prisma.listing.count()
        const totalBooking = await prisma.booking.count()
        const totalAdmin = await prisma.user.count({
            where: {
                role: "admin"
            }
        })
        const startDate = new Date()
        startDate.setDate(1)
        startDate.setHours(0, 0, 0, 0)
        const newUsersThisMonth = await prisma.user.count({
            where: {
                createdAt: {
                    gte: {
                        startDate
                    }
                }
            }
        })
        const newListingThisMonth = await prisma.listing.count({
            where: {
                createdAt: {
                    gte: {
                        startDate
                    }
                }
            }
        })
        const topCities = await prisma.listing.groupBy({
            by: ['city'],
            _count: {
                id: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            take: 5
        })
        const now = new Date();
        const start = startOfWeek(now, { weekStartsOn: 1 });
        const end = endOfWeek(now, { weekStartsOn: 1 });

        const bookingsThisWeek = await prisma.booking.count({
            where: {
                dateFrom: {
                    gte: start,
                    lte: end,
                },
            },
        });
        const bookings = await prisma.booking.findMany({
            where: {
                createdAt: {
                    gte: startOfMonth(new Date()),
                    lte: endOfMonth(new Date()),
                },
            },
            include: {
                listing: {
                    select: { price: true },
                },
            },
        });

        const revenueThisMonth = bookings.reduce((acc, booking) => acc + (booking.listing?.price || 0), 0);
        const averageGuestsPerBooking = await prisma.booking.aggregate({
            _avg: {
                guests: true
            }
        })
        res.status(200).json({
            totalUser,
            totalListing,
            totalBooking,
            totalAdmin,
            newUsersThisMonth,
            newListingThisMonth,
            topCities,
            bookingsThisWeek,
            revenueThisMonth,
            averageGuestsPerBooking
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const getSpecificUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                listings: true,
                bookings: true
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params
        const { role } = req.body
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: role
            }
        })
        res.status(200).json({
            message: "User updated",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        res.status(200).json({
            message: "User deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const getAllListingForAdmin = async (req, res) => {
    try {
        const listing = await prisma.listing.findMany({})
        return res.status(200).json({
            message: "Listings found",
            listing
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}
export const getListingWithFilterForAdmin = async (req, res) => {
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

export const updateStatusOfListing = async (req, res) => {
    const { listingId } = req.params
    const { status } = req.body
    const listing = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            status: status
        }
    })
    res.status(200).json({
        message: "Listing updated",
        listing
    })
}

export const getAllBookings = async (req, res) => {
    try {
        const booking = await prisma.booking.findMany()
        res.status(200).json({
            message: "All bookings fetched",
            booking
        })
    } catch (error) {
        res.status(200).json({
            message: "Listing updated",
            listing
        })
    }
}

export const getBookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.params
        const booking = await prisma.booking.findUnique({
            where: {
                id: bookingId
            },
            select: {
                dateFrom: true,
                dateTo: true,
                guests: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                listing: {
                    select: {
                        title: true,
                        city: true,
                        country: true
                    }
                }
            }
        })
        if (!booking) {
            return res.status(400).json({
                message: "No bookings found"
            })
        }
        res.status(200).json({
            message: "Booking found",
            data: booking
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const deleteBookingForAdmin = async (req, res) => {
    try {
        const { bookingId } = req.params
        const booking = await prisma.booking.findUnique({
            where: {
                id: bookingId,
            }
        })
        if (!booking) {
            return res.status(400).json({
                message: "No bookings found"
            })
        }
        const bookingTime = await prisma.booking.findUnique({
            where: {
                id: bookingId
            }
        })
        if (bookingTime.cancellation < new Date()) {
            return res.status(400).json({
                message: "Cannot cancel booking after 48 hours"
            })
        }
        const deleteBooking = await prisma.booking.delete({
            where: {
                id: bookingId
            }
        })
        res.status(200).json({
            message: "Booking deleted",
            data: booking
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const bookingByLocation = async (req, res) => {
    try {
        const { city, state, country } = req.body

        const booking = await prisma.booking.findMany({
            where: {
                listing: {
                    ...(city && { city: { equals: city, mode: "insensitive" } }),
                    ...(state && { state: { equals: state, mode: "insensitive" } }),
                    ...(country && { country: { equals: country, mode: "insensitive" } })
                }
            }
        })
        res.status(200).json({
            message: "Booking by location found",
            booking
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const getAllReports = async (req, res) => {
    try {
        const reports = await prisma.report.findMany({
            include: {
                listing: true
            }
        })
        res.status(200).json({
            message: "All reports fetched successfully",
            reports
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const banUserAccount = async (req, res) => {
    try {
        const { userId } = req.params;
        const { reason, durationDays } = req.body;

        const bannedUntil = durationDays
            ? new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000)
            : null;

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                isBan: true,
                banReason: reason,
                banUntil: banUntil
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User banned successfully', user });

    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

const unbanUserAccount = async (req, res) => {
    const { userId } = req.params;

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            isBan: false,
            banReason: '',
            banUntil: null
        }
    })
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User unbanned successfully', user });
};
