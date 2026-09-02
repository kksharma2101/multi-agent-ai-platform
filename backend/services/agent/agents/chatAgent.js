import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js"
import { getMemory } from "../utils/memory.js";

export const chatAgent = async (state) => {
    const llm = await getModel("chat");
    const mesHistory = await getMemory(state.conversationId);

    const searchContext = state.searchResults && state.searchResults.length > 0 ? `Search results: ${JSON.stringify(state.searchResults)} Answer the user using only the above search results` : "";

    const systemPrompt = `You are CortexAI, an intelligent AI assistant.

    ${searchContext}

    if searchContext exists:

    - Use search results to answer.
    - Do not mention internal tools.

    rules: 
    - For simple questions, greetings and short queries, respond naturally in plain text.
    - For technical, educational, coding or detailed topics, use clean markdown.

    Formatting:

    - Use # for titles and ## for sections.
    - Leave blank line after headings.
    - Use bullet points for lists.
    - Use numbered for lists for steps.
    - Use fenced code blocks with language tags for code.
    - keep paragraphs short and readable.
    - Never write headings and content on the same line.
    - Never generate large walls of text.
    `;

    const messages = [new SystemMessage(systemPrompt)];

    mesHistory.forEach(msg => {
        if (msg.role === "user") {
            messages.push(new HumanMessage(msg.content))
        } else {
            messages.push(new AIMessage(msg.content))
        }
    });

    messages.push(new HumanMessage(state.prompt))

    const response = await llm.invoke(messages)
    {
        return { ...state, aiResponse: response.content }
    }
}