import express from "express";
import "dotenv/config";
import connectToDb from "./config/db.js";

const app = express();

const port = process.env.PORT || "9003"

app.use(express.json());

// app.use("/", router)
app.get("/", (req, res) => {
    res.json({ message: "Hello from agent services" })
})


app.listen(port, () => {
    console.log(`Agent server is runing on ${port}`)
    connectToDb();
})