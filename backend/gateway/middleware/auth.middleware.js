import redis from "../../shared/redis/redis.js";

const protect = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session;
        if (!sessionId) {
            return res.status(401).json({ message: "Unauthorized User" })
        }
        const sessionData = await redis.get(`session-${sessionId}`);
        if (!sessionData) {
            return res.status(401).json({ message: "Session is Expired" })
        }
        req.user = JSON.parse(sessionData);
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export default protect;