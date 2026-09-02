import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessagesToMemory } from "../utils/memory.js";
import redis from "../../../shared/redis/redis.js";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId } = req.body;

        await axios.post(`${process.env.CHAT_SERVICE_URL}/create-message`, {
            role: "user", conversationId, content: prompt
        })

        const result = await graph.invoke({ prompt, conversationId })

        const response = result.aiResponse;

        await addMessagesToMemory(conversationId, "user", prompt)

        await addMessagesToMemory(conversationId, "assistant", response)

        await axios.post(`${process.env.CHAT_SERVICE_URL}/create-message`, {
            role: "assistant", conversationId, content: response
        })

        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({ message: "server error in agent" })
    }
}