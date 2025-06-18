import prisma from "../lib/prisma.js"

export const reportListing = async (req, res) => {
    try {
        const { listingId } = req.params
        const { reportDetail } = req.body
        const existing = await prisma.report.findFirst({
            where: {
                listingId,
                userId: req.user.id
            }
        });
        if (existing) {
            return res.status(400).json({ message: "You have already reported this listing." });
        }
        if (!reportDetail || reportDetail.trim().length < 5) {
            return res.status(400).json({ message: "Please provide a valid report reason." });
        }
        const report = await prisma.report.create({
            data: {
                listing: {
                    connect: {
                        id: listingId
                    }
                },
                user: {
                    connect: {
                        id: req.user.id
                    }
                },
                reason: reportDetail
            }
        })
        res.status(200).json({
            message: "Reported successfully",
            report
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error
        })
    }
}

export const myReports = async (req, res) => {
    try {
        const reports = await prisma.report.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                listing: true
            }
        })
        res.status(200).json({
            message: "Reports fetched successfully",
            reports
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error
        })
    }
}

export const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params
        const report = await prisma.report.findFirst({
            where: {
                id: reportId,
                userId: req.user.id
            }
        });
        if (!report) {
            return res.status(404).json({ message: "Report not found or unauthorized" });
        }
        await prisma.report.delete({ where: { id: reportId, userId: req.user.id } });

        res.status(200).json({
            message: "Report delted successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal error",
            error
        })
    }
}