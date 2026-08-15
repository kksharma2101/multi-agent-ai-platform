import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
    },
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
    },
    content: String
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);