import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import morgan from "morgan"
import fs from 'fs';
import path from 'path';

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());

app.use(cors({
    origin: "https://stayfinder-frontend-fnb8.onrender.com",
    credentials: true
}));
app.use(express.json());
const accessLogStream = fs.createWriteStream(
    path.join(process.cwd(), 'logs/access.log'),
    { flags: 'a' } // 'a' means append mode
);

app.use(morgan('combined', { stream: accessLogStream }));

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}



import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
import favoriteRouter from "./routes/favorite.route.js"
import adminRouter from "./routes/admin.route.js"

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/listing", listingRouter)
app.use("/bookings", bookingRouter)
app.use("/favorites", favoriteRouter)
app.use("/admin", adminRouter)

app.get('/', (req, res) => {
    res.send('Airbnb backend API is running');
});

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error details
    res.status(500).json({ message: 'Something broke!' }); // Send generic error to client
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

