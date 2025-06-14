import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


import userRouter from "./routes/user.route.js"


app.use("/api/users", userRouter)

app.get('/', (req, res) => {
    res.send('Airbnb backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});