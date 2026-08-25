import express from "express";
import "dotenv/config";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
import morgan from "morgan";

const port = process.env.PORT || "9000";

const app = express()
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_SERVICES,
    credentials: true
}))

app.use(cookieParser())

app.use(morgan("dev"))

app.use("/api/auth", proxy(process.env.AUTH_SERVICES))
app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICES))
app.use("/api/agent", protect, proxy(process.env.AGENT_SERVICES))
app.get("/api/me", protect, getCurrentUser)

app.get("/", (req, res) => {
    res.json({ message: "Hello from gatway" })
})

app.listen(port, () => {
    console.log(`Gatway started on ${port}`)
})