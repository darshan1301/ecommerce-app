import express from "express";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import ordersRoute from "./routes/ordersRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import adminDashboardRoute from "./routes/adminDashboardRoute.js";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

import { config } from "dotenv";
import { connectMongoDB } from "./dbConnection/dbConnect.js";
import rateLimit from "express-rate-limit";
config();

const uploadDir = "src/my-uploads";

// Ensure the destination folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const app = express();
app.use(morgan("dev"));

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(rateLimiter);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

connectMongoDB(process.env.DATABASE_URL);

const PORT = process.env.PORT || 8000;

/////////////HEALTH-CHECk
app.get("/health", (req, res) => {
  res.send("API is healthy!");
});

///////ROUTES
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/orders", ordersRoute);
app.use("/webhook", paymentRoute);

app.use("/admin", adminDashboardRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
