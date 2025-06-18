import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true
}));
app.use(express.json());

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
import favoriteRouter from "./routes/favorite.route.js"
import admingRouter from "./routes/admin.route.js"

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/listing", listingRouter)
app.use("/api/bookings", bookingRouter)
app.use("/api/favorites", favoriteRouter)
app.use("/api/admin", admingRouter)

app.get('/', (req, res) => {
    res.send('Airbnb backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});