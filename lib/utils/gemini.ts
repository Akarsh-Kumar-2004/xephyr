import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGeminiClient(apiKey: string): GoogleGenerativeAI {
  if (!apiKey) throw new Error("Gemini API key is missing.");
  return new GoogleGenerativeAI(apiKey);
}

export interface PriorityAssessment {
  priority: "High" | "Medium" | "Low";
  severity: "Critical" | "Medium" | "Low";
  reasoning: string;
}

// Assess using ONLY the incident type (stateless)
export async function assessIncidentPriority(
  genAI: GoogleGenerativeAI,
  type: string,
  description?: string
): Promise<PriorityAssessment> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Use both type and description to assess priority and severity.
  const prompt = `You are an emergency triage assistant. Based on the incident TYPE and DESCRIPTION, classify priority and severity.
Respond with JSON only in this exact format: {"priority":"High|Medium|Low","severity":"Critical|Medium|Low","reasoning":"brief explanation"}
Incident Type: ${type}
Description: ${description ?? "(no description)"}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // try to extract JSON-like content, but expect pure JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : text;
    const parsed = JSON.parse(jsonText) as PriorityAssessment;
    return parsed;
  } catch (err) {
    console.error("Gemini parse/error fallback:", err);
    return {
      priority: "Medium",
      severity: "Medium",
      reasoning:
        "AI assessment failed or returned invalid output. Defaulting to Medium priority — review manually.",
    };
  }
}
