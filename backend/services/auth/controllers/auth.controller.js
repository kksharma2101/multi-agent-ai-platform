import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js"
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
    try {
        const { token } = req.body;
        const decodedToken = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({ firebaseUid: decodedToken.uid });
        if (!user) {
            user = await User.create({
                firebaseUid: decodedToken.uid,
                name: decodedToken.name,
                email: decodedToken.email,
                avatar: decodedToken.picture
            });
            await user.save();
        }

        const sessionId = crypto.randomUUID();

        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }), "EX", 7 * 24 * 60 * 60)

        res.cookie("session", sessionId, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: "Login successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Login server error" });
    }
}

export const logout = async (req, res) => {
    try {
        const sessionId = req.cookies?.session

        await redis.del(`session-${sessionId}`)

        res.clearCookie("session");

        res.status(200).json({ message: "Logout successfully" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Logout server error" })
    }
}