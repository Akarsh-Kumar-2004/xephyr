import { NextResponse } from "next/server";
import { getGeminiClient, assessIncidentPriority } from "@/lib/utils/gemini";

interface Incident {
  id: string;
  type: string;
  location: string;
  description: string;
  createdAt: string;
  status: "Pending" | "In Progress" | "Resolved";
  severity: "Critical" | "Medium" | "Low";
  priority: "High" | "Medium" | "Low";
  reasoning?: string;
}

// Mock database
const incidents: Incident[] = [];

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Server not configured: GEMINI_API_KEY missing.");
    }

    const data = await req.json();
    const { type, location, description } = data;

    if (!type || !location) {
      return NextResponse.json(
        { message: "Missing required fields: type and location" },
        { status: 400 }
      );
    }

  // Create new client per request
  const gemini = getGeminiClient(apiKey);
  // Pass both type and description so LLM can use description for assessment
  const assessment = await assessIncidentPriority(gemini, type, description);

    const incident: Incident = {
      id: Date.now().toString(),
      type,
      location,
      description: description || "",
      createdAt: new Date().toISOString(),
      status: "Pending",
      severity: assessment.severity,
      priority: assessment.priority,
      reasoning: assessment.reasoning,
    };

    incidents.push(incident);

    return NextResponse.json({ success: true, incident }, { status: 201 });
  } catch (err) {
    console.error("Error creating incident:", err);
    const message = err instanceof Error ? err.message : "Failed to create incident";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ incidents });
}


