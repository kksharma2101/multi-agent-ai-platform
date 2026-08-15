import express from "express";
import "dotenv/config";
import connectToDb from "./config/db.js";
import router from "./routes/auth.route.js";

const app = express();

const port = process.env.PORT || "9001"

app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
    res.json({ message: "Hello from auth services" })
})


app.listen(port, () => {
    console.log(`Auth server is runing on ${port}`)
    connectToDb();
})