import prisma from "../lib/prisma.js";

export const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                listings: true,
                bookings: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

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
        const { userId } = req.params;
        const { name } = req.body
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: name
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