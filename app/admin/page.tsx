"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


// Add lat/lng for each incident for map markers
interface Incident {
  id: number;
  type: string;
  location: string;
  status: string;
  priority: string;
  severity: "Critical" | "Medium" | "Low";
  responder: string | null;
}

const mockIncidents: Incident[] = [
  {
    id: 1,
    type: "Flood",
    location: "Sector 21, Riverside",
    status: "Assigned",
    priority: "High",
    severity: "Critical",
    responder: "Team Alpha"
  },
  {
    id: 2,
    type: "Medical Emergency",
    location: "Block C, Main Street",
    status: "Pending",
    priority: "Medium",
    severity: "Medium",
    responder: null
  },
  {
    id: 3,
    type: "Roadblock",
    location: "Highway 7",
    status: "Resolved",
    priority: "Low",
    severity: "Low",
    responder: "Team Beta"
  },
];

export default function AdminDashboard() {
  // Badge color classes based on severity
  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-[#3E5F44] text-[#E8FFD7]"; // dark green bg, light text
      case "Medium":
        return "bg-[#5E936C] text-[#E8FFD7]"; // medium green bg, light text
      case "Low":
      default:
        return "bg-[#93DA97] text-[#3E5F44]"; // light green bg, dark text
    }
  };

  // Map removed

  return (
    <>
      <style>{`
        main {
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(135deg, #3E5F44 0%, #5E936C 50%, #93DA97 100%);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color: #E8FFD7;
          animation: fadeIn 0.8s ease forwards;
        }
        h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #E8FFD7;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
          animation: fadeInUp 0.8s ease forwards;
          width: 100%;
          max-width: 64rem;
          text-align: left;
        }
        h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #E8FFD7;
          margin-bottom: 1rem;
          text-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .container {
          width: 100%;
          max-width: 64rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .card {
          background-color: #E8FFD7;
          color: #3E5F44;
          border-radius: 0.75rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          border: none !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: none !important;
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #3E5F44;
          margin: 0;
        }
        .location-text {
          font-size: 0.875rem;
          color: #5E936C;
        }
        .card-content {
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .priority-text {
          font-size: 1rem;
          font-weight: 600;
          color: #3E5F44;
        }
        .status-text {
          font-size: 0.875rem;
          color: #5E936C;
        }
        .responder-text {
          font-size: 0.875rem;
          color: #3E5F44;
          font-weight: 600;
        }
        a.view-assign-link {
          margin-top: 0.75rem;
          color: #3E5F44;
          font-weight: 600;
          text-decoration: underline;
          transition: color 0.3s ease;
          align-self: flex-start;
        }
        a.view-assign-link:hover {
          color: #5E936C;
        }

        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}</style>

      <main className="animate-fade-in">
        <h2 className="animate-fade-in-up">Admin Dashboard</h2>
        <div className="container">

          <section>
            <h3 className="animate-fade-in-up">Live Incidents</h3>
            {mockIncidents.map((incident) => (
              <Card
                key={incident.id}
                className="card animate-fade-in-up"
                tabIndex={0}
                aria-label={`${incident.type} incident at ${incident.location}, severity ${incident.severity}`}
              >
                <CardHeader className="card-header">
                  <div>
                    <CardTitle className="card-title">{incident.type}</CardTitle>
                    <span className="location-text">{incident.location}</span>
                  </div>
                  <Badge className={getSeverityBadgeClass(incident.severity)}>
                    {incident.severity}
                  </Badge>
                </CardHeader>
                <CardContent className="card-content">
                  <span className="priority-text">Priority: {incident.priority}</span>
                  <span className="status-text">Status: {incident.status}</span>
                  {incident.responder && (
                    <span className="responder-text">Responder: {incident.responder}</span>
                  )}
                  <Link href={`/admin/${incident.id}`} className="view-assign-link">
                    View / Assign
                  </Link>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
