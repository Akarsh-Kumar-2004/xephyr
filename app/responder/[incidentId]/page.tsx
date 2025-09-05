"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mockIncident = {
  id: 101,
  type: "Flood",
  location: "Sector 21, Riverside",
  status: "In Progress",
  priority: "High",
  description: "Water rising rapidly, people stranded on rooftops. Immediate evacuation needed.",
  reportedAt: "2025-09-05 14:32",
  responder: "Team Alpha",
};

export default function ResponderIncidentDetails() {
  const [status, setStatus] = useState(mockIncident.status);

  function handleResolve() {
    setStatus("Resolved");
  }

  // Badge color classes based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-[#93DA97] text-[#3E5F44]"; // light green bg, dark text
      case "In Progress":
        return "bg-[#5E936C] text-[#E8FFD7]"; // medium green bg, light text
      default:
        return "bg-[#3E5F44] text-[#E8FFD7]"; // dark green bg, light text
    }
  };

  return (
    <>
      <style>{`
        main {
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #3E5F44 0%, #5E936C 50%, #93DA97 100%);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color: #E8FFD7;
          animation: fadeIn 0.8s ease forwards;
        }
        .card {
          background-color: #E8FFD7;
          color: #3E5F44;
          border-radius: 0.75rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 28rem;
          box-sizing: border-box;
          animation: fadeInUp 0.8s ease forwards;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #5E936C;
        }
        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #3E5F44;
          margin-bottom: 0;
        }
        .location-text {
          font-size: 0.875rem;
          color: #5E936C;
        }
        .card-content {
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: fadeIn 1s ease forwards;
        }
        .priority-text {
          font-size: 1rem;
          font-weight: 600;
          color: #3E5F44;
        }
        .description-text {
          font-size: 0.9rem;
          color: #5E936C;
          line-height: 1.4;
        }
        .info-text {
          font-size: 0.875rem;
          color: #3E5F44;
          font-weight: 600;
        }
        .info-text.muted {
          color: #5E936C;
          font-weight: 400;
        }
        button.resolve-btn {
          margin-top: 1.5rem;
          background-color: #3E5F44;
          color: #E8FFD7;
          font-weight: 700;
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          cursor: pointer;
          animation: pulse 2s infinite;
          transition: background-color 0.3s ease, transform 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        button.resolve-btn:hover {
          background-color: #5E936C;
          transform: scale(1.05);
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
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>

      <main>
        <Card className="card">
          <CardHeader className="card-header">
            <div>
              <CardTitle className="card-title">{mockIncident.type}</CardTitle>
              <span className="location-text">{mockIncident.location}</span>
            </div>
            <Badge className={getStatusBadgeClass(status)}>{status}</Badge>
          </CardHeader>
          <CardContent className="card-content">
            <span className="priority-text">Priority: {mockIncident.priority}</span>
            <p className="description-text">{mockIncident.description}</p>
            <span className="info-text">Responder: {mockIncident.responder}</span>
            <span className="info-text muted">Reported at: {mockIncident.reportedAt}</span>
            {status !== "Resolved" && (
              <button className="resolve-btn" onClick={handleResolve} aria-label="Mark incident as resolved">
                Mark as Resolved
              </button>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
