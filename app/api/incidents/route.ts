import { NextResponse } from 'next/server';

// Mock database
let incidents: any[] = [];

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
function calculateSeverity(data: any) {
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
