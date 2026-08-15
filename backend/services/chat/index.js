import express from "express";
import "dotenv/config";
import connectToDb from "./config/db.js";
import router from "./routes/chat.route.js";

const app = express();

const port = process.env.PORT || "9002"

app.use(express.json());

app.use("/", router)
app.get("/", (req, res) => {
    res.json({ message: "Hello from chat services" })
})


app.listen(port, () => {
    console.log(`Chat server is runing on ${port}`)
    connectToDb();
})