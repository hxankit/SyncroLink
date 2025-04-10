import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();
console.log("Mongo URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// ======= MIDDLEWARES =======

// Body parser
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// CORS CONFIG
const allowedOrigins = [
  "http://localhost:5173",          // development
  "https://syncrolink.onrender.com" // production
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ======= ROUTES =======
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// ======= FRONTEND SERVE =======
app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

// ======= START SERVER =======
server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
