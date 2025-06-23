import prisma from "../lib/prisma.js";

export const getUserDetails = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                listings: true,
                bookings: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // console.log("req: ", req);

        return res.status(200).json({
            message: "User fetched",
            data: user
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


export const updateUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, location } = req.body
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: name,
                location: location
            }
        })
        res.status(200).json({
            message: "Profile updated",
            data: user
        })
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export const getUserListings = async (req, res) => {
    try {
        const listings = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                listings: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        address: true,
                        city: true,
                        state: true,
                        country: true,
                        imageUrls: true,
                        status: true
                    }
                }
            }
        })
        res.status(200).json({
            message: "User listings fetched",
            data: listings
        })
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}