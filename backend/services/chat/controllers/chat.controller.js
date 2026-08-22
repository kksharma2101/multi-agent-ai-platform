import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const createConversation = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        console.log("User-id", userId)
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(201).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: "Error in creating chat conversation" })
    }
}

export const getConversations = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];

        const conversations = await Conversation.find({ userId: userId }).sort({ updatedAt: -1 });

        return res.status(200).json(conversations);
    } catch (error) {
        return res.status(500).json({ message: "Error in getting chat conversations" })
    }
}

export const updateConversation = async (req, res) => {
    try {
        const { id, title } = req.body;
        const conversation = (await Conversation.findByIdAndUpdate(id, { title }));
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ message: "Error in getting chat conversations" })
    }
}

export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content } = req.body;

        const message = await Message.create({
            conversationId,
            role,
            content
        })
        return res.status(201).json(message);
    } catch (error) {
        return res.status(500).json({ message: "Error in saving message" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId }).sort({ createdAt: -1 })
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({ message: "Error in getting messages" });

    }
}