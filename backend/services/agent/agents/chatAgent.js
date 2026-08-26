import { getModel } from "../config/llmModels.js"

export const chatAgent = async (state) => {
    const llm = await getModel("chat");
    const systemPrompt = `You are CortexAI, an intelligent AI assistant.

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

    const response = await llm.invoke([
        {
            "role": "system",
            "content": systemPrompt
        },
        {
            "role": "human",
            "content": state.prompt
        }
    ])
    {
        return { ...state, aiResponse: response.content }
    }
}