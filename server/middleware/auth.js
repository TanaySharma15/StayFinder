import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET

export const requireAuth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if (user.isBan && (!user.banUntil || new Date() < user.banUntil)) {
            return res.status(403).json({ message: "Your account is banned." });
        }
        req.user = user
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
