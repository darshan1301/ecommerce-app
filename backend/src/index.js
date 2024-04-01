import express from "express";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import ordersRoute from "./routes/ordersRoute.js";
import adminDashboardRoute from "./routes/adminDashboardRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { authRole, isAuthenticated } from "./auth/auth.js";

import { config } from "dotenv";
import { connectMongoDB } from "./dbConnection/dbConnect.js";
config();

const app = express();
app.use(morgan("dev"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/admin", isAuthenticated, authRole("ADMIN"), adminDashboardRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
