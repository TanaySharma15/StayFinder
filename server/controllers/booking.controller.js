import { sendBookingConfirmationEMail } from "../lib/mailer.js"
import prisma from "../lib/prisma.js"

export const getAllBookingsByUser = async (req, res) => {
    try {
        const booking = await prisma.booking.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                listing: {
                    select: {
                        id: true,
                        imageUrls: true,
                        title: true,
                        status: true,
                        price: true,
                        city: true,
                        country: true
                    }
                }
            }
        })
        if (!booking || booking.length === 0) {
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

export const getBookingDetailsForUser = async (req, res) => {
    try {
        const { bookingId } = req.params
        const booking = await prisma.booking.findUnique({
            where: {
                id: bookingId,
                userId: req.user.id
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

export const createBooking = async (req, res) => {
    try {
        const { dateFrom, dateTo, guests } = req.body
        const { listingId } = req.params
        const existing = await prisma.booking.findFirst({
            where: {
                listingId,
                OR: [
                    {
                        AND: [
                            { dateFrom: { lte: new Date(dateTo) } },
                            { dateTo: { gte: new Date(dateFrom) } }
                        ]
                    }
                ]
            }
        });
        if (existing) {
            return res.status(400).json({
                message: "Cannot book! Already booked"
            })
        }
        const booking = await prisma.booking.create({
            data: {
                user: {
                    connect: {
                        id: req.user.id
                    }
                },
                listing: {
                    connect: {
                        id: listingId
                    }
                },

                dateFrom,
                dateTo,
                guests,
                cancellation: new Date(Date.now() + 48 * 60 * 60 * 1000)
            }
        })
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            }
        })
        // await sendBookingConfirmationEMail(user.email, {
        //     listingName: listing.title,
        //     startDate: booking.dateFrom,
        //     endDate: booking.dateTo
        // })
        if (!listing) {
            return res.status(500).json({
                message: "Listing not created"
            })
        }
        res.status(200).json({
            message: "Booking created",
            data: booking
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }
}

export const updateBookingByUser = async (req, res) => {
    try {
        const { dateFrom, dateTo, guests } = req.body;
        const { bookingId } = req.params
        const booking = await prisma.booking.update({
            where: {
                id: bookingId,
                userId: req.user.id
            },
            data: {
                dateFrom: dateFrom,
                dateTo: dateTo,
                guests: guests
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
                }
            }
        })
        res.status(200).json({
            message: "Booking created",
            data: booking
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error occured",
            error
        })
    }

}

export const deleteBookingByUser = async (req, res) => {
    try {
        const { bookingId } = req.params
        const booking = await prisma.booking.findUnique({
            where: {
                id: bookingId,
                userId: req.user.id
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