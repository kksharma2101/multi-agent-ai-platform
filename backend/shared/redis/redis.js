import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL)

redis.on("connect", () => {
    console.log("Redis: connected");
});

redis.on("ready", () => {
    console.log("Redis: ready");
});

redis.on("error", (error) => {
    console.error("Redis: ERROR", error);
});

redis.on("close", () => {
    console.log("Redis: connection closed");
});

redis.on("reconnecting", () => {
    console.log("Redis: reconnecting...");
});

export default redis;