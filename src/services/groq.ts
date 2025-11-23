import Groq from "groq-sdk";
import { Career } from "../data/careers";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

export const getCareerRecommendations = async (userData: any): Promise<Career[]> => {
    const prompt = `
    You are a career counselor AI. Based on the following user profile, generate 3 highly personalized career recommendations.
    
    User Profile:
    - Stream: ${userData.stream}
    - Interests: ${userData.interests.join(", ")}
    - Strengths: ${userData.strengths.join(", ")}
    - Weaknesses: ${userData.weaknesses.join(", ")}
    - Goals: ${userData.goals.join(", ")}

    Return the response ONLY as a valid JSON array of objects matching this TypeScript interface:
    {
      id: string; // unique slug, e.g. "quantum-computing-researcher"
      title: string;
      description: string; // 2-3 sentences
      matchScore: number; // 0-100 based on fit
      tags: string[];
      stream: string[];
      salary: string; // e.g. "$80k - $120k"
      growth: string; // e.g. "High (15% / year)"
      stressLevel: "Low" | "Medium" | "High";
      workEnvironment: string;
      roadmap: string[]; // 5 steps
      skills: string[]; // 4 key skills
      tools: string[]; // 4 key tools
      exams: string[]; // 2 key exams
      education: {
        ug: string;
        pg?: string;
      };
    }

    Do not include any markdown formatting or explanation. Just the JSON array.
  `;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful career guidance AI. Output strictly valid JSON." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 2048,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) return [];

        const parsed = JSON.parse(content);

        if (Array.isArray(parsed)) {
            return parsed;
        } else if (parsed.careers && Array.isArray(parsed.careers)) {
            return parsed.careers;
        } else {
            return [];
        }

    } catch (error) {
        console.error("Error fetching recommendations from Groq:", error);
        return [];
    }
};

export const getCareerDetails = async (careerId: string, careerTitle?: string): Promise<Career | null> => {
    const prompt = `
    You are a career expert. Provide detailed information for the career: "${careerTitle || careerId}".
    
    Return the response ONLY as a valid JSON object matching this TypeScript interface:
    {
      id: "${careerId}",
      title: string;
      description: string; // Detailed description
      matchScore: 0, // Default to 0 as this is a direct fetch
      tags: string[];
      stream: string[];
      salary: string;
      growth: string;
      stressLevel: "Low" | "Medium" | "High";
      workEnvironment: string;
      roadmap: string[]; // 7 detailed steps
      skills: string[]; // 6 key skills
      tools: string[]; // 6 key tools
      exams: string[]; // 3 relevant exams
      education: {
        ug: string;
        pg?: string;
      };
    }

    Do not include any markdown formatting. Just the JSON object.
  `;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful career expert. Output strictly valid JSON." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 2048,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) return null;

        return JSON.parse(content);
    } catch (error) {
        console.error("Error fetching career details from Groq:", error);
        return null;
    }
};

export const getChatCompletion = async (
    history: { role: "user" | "assistant"; content: string }[],
    userContext?: any
): Promise<string | null> => {
    const systemPrompt = `
    You are an elite Career Strategy AI, designed to be more insightful and practical than standard assistants.
    
    Your Goal: Provide actionable, high-level career guidance based on the user's specific profile.
    
    User Profile Context:
    ${userContext ? JSON.stringify(userContext, null, 2) : "No specific profile provided yet."}

    Guidelines:
    1. Be direct and encouraging, but realistic.
    2. Use the user's stream, interests, and strengths to tailor your advice.
    3. If asked about specific careers, mention salary trends, future growth, and required skills.
    4. Keep responses concise (under 150 words) unless asked for a deep dive.
    5. Do not use generic platitudes like "follow your passion" without actionable steps.
    
    Tone: Professional, mentorship-oriented, forward-thinking.
  `;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...history
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        return completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";
    } catch (error) {
        console.error("Error fetching chat completion:", error);
        return null;
    }
};
