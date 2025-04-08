import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";


//routes
import memberRoutes from "./routes/member.js"
import studentRoutes from "./routes/student.js";
import eventRoutes from "./routes/event.js";
import registerRoutes from "./routes/register.js";
import authRoutes from "./routes/auth.js";

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

connectDB();

//set up auth middleware

//add routes
// - member and student routes
app.use("/api", memberRoutes);
app.use("/api", studentRoutes);
// - event and registration routes
app.use("/api/event", eventRoutes);
app.use("/api/event/register", registerRoutes);
// - auth routes
app.use("/api/auth", authRoutes);


app.listen(8080, () => {
    console.log("Server is running on port 8080 🚀");
});