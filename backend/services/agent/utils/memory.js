import redis from "../../../shared/redis/redis.js";
import { getMessages } from "./getMessages.js";

export const getMemory = async (conversationId) => {
    const key = `message-${conversationId}`;
    const cached = await redis.get(key)
    if (cached) {
        return JSON.parse(cached);
    }
    const messages = await getMessages(conversationId);
    await redis.set(key, JSON.stringify(messages), 'EX', 24 * 60 * 60)
    return messages;
}

export const addMessagesToMemory = async (conversationId, role, content) => {
    const key = `message-${conversationId}`;
    const cachedMsg = await redis.get(key);
    const messages = cachedMsg ? JSON.parse(cachedMsg) : [];

    messages.push({ role, content })

    if(messages.length > 20) {
        messages.shift()
    }
    await redis.set(key, JSON.stringify(messages))
}