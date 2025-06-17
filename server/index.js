import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
import favoriteRouter from "./routes/favorite.route.js"

app.use("/api/users", userRouter)
app.use("/api/listing", listingRouter)
app.use("/api/bookings", bookingRouter)
app.use("/api/favorites", favoriteRouter)

app.get('/', (req, res) => {
    res.send('Airbnb backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});