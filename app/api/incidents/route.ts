import { NextResponse } from 'next/server';

interface Incident {
  id: number;
  type: string;
  location: string;
  description: string;
  media?: string;
  createdAt: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  severity: 'Critical' | 'Medium' | 'Low';
  responder: string | null;
}

// Mock database
let incidents: Incident[] = [];

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Add metadata
    const incident = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      severity: calculateSeverity(data),
      responder: null,
    };

    // Store in our mock database
    incidents.push(incident);

    return NextResponse.json({ success: true, incident });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create incident' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all incidents
  return NextResponse.json({ incidents });
}

// Simple severity calculation based on type and description
function calculateSeverity(data: Pick<Incident, 'type' | 'description'>) {
  const emergencyKeywords = ['critical', 'severe', 'urgent', 'life-threatening', 'dangerous'];
  const hasEmergencyKeywords = emergencyKeywords.some(keyword => 
    data.description?.toLowerCase().includes(keyword)
  );

  if (data.type === 'medical' || hasEmergencyKeywords) {
    return 'Critical';
  } else if (data.type === 'flood' || data.type === 'fire') {
    return 'Medium';
  }
  return 'Low';
}
