import { CAREERS_EXPANDED } from "../data/careers_expanded";
import { Career } from "../data/careers";

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY || "";
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

async function callHuggingFace(messages: any) {
    try {
        // Use the local proxy endpoint to bypass CORS
        const response = await fetch(`/api/hf/${HF_MODEL}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: messages,
                parameters: {
                    max_new_tokens: 250,
                    temperature: 0.7,
                    return_full_text: false,
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`Hugging Face API Error: ${response.status}`);
        }

        const result = await response.json();
        if (Array.isArray(result) && result[0].generated_text) {
            return result[0].generated_text;
        } else if (result.generated_text) {
            return result.generated_text;
        }
        return null;
    } catch (error) {
        console.error("Hugging Face API Failed:", error);
        return null;
    }
}

export const getChatCompletion = async (
    history: { role: "user" | "assistant"; content: string }[],
    userContext?: any
): Promise<string | null> => {
    const lastMessage = history[history.length - 1].content.toLowerCase();

    // 1. Local Search (The "Brain")
    let bestMatch: { career: Career, score: number } | null = null;

    CAREERS_EXPANDED.forEach(career => {
        let score = 0;
        const titleLower = career.title.toLowerCase();

        if (lastMessage.includes(titleLower)) score += 100;
        titleLower.split(" ").forEach(word => {
            if (word.length > 3 && lastMessage.includes(word)) score += 40;
        });
        if (lastMessage.includes(career.id.replace(/-/g, " "))) score += 30;
        career.tags.forEach(tag => {
            const tagLower = tag.toLowerCase();
            if (lastMessage.includes(tagLower)) score += 25;
            tagLower.split(" ").forEach(word => {
                if (word.length > 3 && lastMessage.includes(word)) score += 10;
            });
        });
        if (career.id === "startup-founder" && (lastMessage.includes("startup") || lastMessage.includes("founder") || lastMessage.includes("entrepreneur"))) score += 50;

        if (score > 0 && (!bestMatch || score > bestMatch.score)) {
            bestMatch = { career, score };
        }
    });

    // 2. Construct Prompt for AI
    let systemPrompt = `You are a friendly and helpful Career Counselor. 
    Your goal is to help students find their dream career.
    Keep your answers concise (under 100 words) and encouraging.`;

    if (bestMatch && bestMatch.score >= 20) {
        const c = bestMatch.career;
        systemPrompt += `\n\nCONTEXT: The user is asking about "${c.title}".
        Here is the verified data you MUST use:
        - Description: ${c.description}
        - Salary: ${c.salary}
        - Growth: ${c.growth}
        - Roadmap: ${c.roadmap.join(", ")}
        
        Use this data to answer the user's question. Do not make up facts if they contradict this data.`;
    } else {
        systemPrompt += `\n\nCONTEXT: The user's query is general. 
        You have access to a database of 100+ careers including Engineering, Medical, Arts, and Business.
        If they ask for options, suggest checking the "Results" section for a full list.`;
    }

    // 3. Call Hugging Face API
    const prompt = `<s>[INST] ${systemPrompt}\n\nUser Question: ${history[history.length - 1].content} [/INST]`;

    const aiResponse = await callHuggingFace(prompt);

    if (aiResponse) {
        const cleanResponse = aiResponse.replace(prompt, "").trim();
        return cleanResponse.replace(/<\/s>$/, "").trim();
    }

    // 4. Fallback (Offline Mode)
    console.warn("Falling back to offline mode");
    if (bestMatch && bestMatch.score >= 20) {
        const foundCareer = bestMatch.career;
        return `**${foundCareer.title}**\n\n${foundCareer.description}\n\n**Salary:** ${foundCareer.salary}\n**Growth:** ${foundCareer.growth}\n**Roadmap:** ${foundCareer.roadmap[0]}`;
    }

    return "I'm having trouble connecting to my brain right now, but I can tell you about many careers like Engineering, Law, Medicine, or Design. Try asking 'Tell me about [Career Name]'.";
};

// ============================================================================
// LEGACY / OFFLINE FUNCTIONS
// ============================================================================

export const getCareerRecommendations = async (userData: any): Promise<Career[]> => {
    console.log("getCareerRecommendations (Offline) called");
    return [];
};

export const getCareerDetails = async (careerId: string, careerTitle?: string): Promise<Career | null> => {
    const found = CAREERS_EXPANDED.find(c => c.id === careerId);
    return found || null;
};
