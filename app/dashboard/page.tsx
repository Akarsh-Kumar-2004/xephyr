"use client";
import { useState, useEffect } from "react";

const mockIncidents = [
  {
    id: 1,
    type: "Flood",
    location: "Sector 21, Riverside",
    status: "Assigned",
    priority: "High",
    description: "Water rising rapidly, people stranded on rooftops.",
    responder: "Team Alpha",
  },
  {
    id: 2,
    type: "Medical Emergency",
    location: "Block C, Main Street",
    status: "Pending",
    priority: "Medium",
    description: "Elderly person needs urgent medical attention.",
    responder: null,
  },
  {
    id: 3,
    type: "Roadblock",
    location: "Highway 7",
    status: "Resolved",
    priority: "Low",
    description: "Tree fallen, blocking both lanes.",
    responder: "Team Beta",
  },
];

export default function CitizenDashboard() {
  const [incidents, setIncidents] = useState<any[]>(mockIncidents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/incidents');
        if (!res.ok) throw new Error(`Failed to load incidents (${res.status})`);
        const json = await res.json();
        if (mounted) setIncidents(json.incidents ?? []);
      } catch (err: any) {
        console.error('Error loading incidents:', err);
        if (mounted) setError(err?.message || 'Failed to load incidents');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // Helper to get badge color classes based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-[#93DA97] text-[#3E5F44]"; // light green bg, dark text
      case "Assigned":
        return "bg-[#5E936C] text-[#E8FFD7]"; // medium green bg, light text
      case "Pending":
      default:
        return "bg-[#3E5F44] text-[#E8FFD7]"; // dark green bg, light text
    }
  };

  // Helper to get priority text color
  const getPriorityTextClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-[#3E5F44] font-bold"; // dark green bold
      case "Medium":
        return "text-[#5E936C] font-semibold"; // medium green
      case "Low":
      default:
        return "text-[#93DA97]"; // light green
    }
  };

  return (
    <>
      <style>{`
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
        .pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        main {
          background: linear-gradient(135deg, #3E5F44 0%, #5E936C 50%, #93DA97 100%);
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #E8FFD7;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
        h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #E8FFD7;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .card {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-radius: 0.75rem;
          background-color: #E8FFD7;
          color: #3E5F44;
          transition: transform 0.2s ease;
        }
        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #5E936C;
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #3E5F44;
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
        }
        .description-text {
          font-size: 0.9rem;
          color: #5E936C;
        }
        .responder-text {
          font-size: 0.8rem;
          color: #3E5F44;
          font-weight: 600;
        }
        .btn-cancel {
          margin-top: 0.75rem;
          background-color: #3E5F44;
          color: #E8FFD7;
          font-weight: 600;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          animation: pulse 2s infinite;
          align-self: flex-start;
        }
        .btn-cancel:hover {
          background-color: #5E936C;
        }
        .no-incidents {
          background-color: #E8FFD7;
          color: #3E5F44;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-size: 1rem;
          text-align: center;
        }
        .container {
          width: 100%;
          max-width: 42rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
      `}</style>

      <main className="animate-fade-in">
        <h2 className="animate-fade-in-up">My Reported Incidents</h2>
        <div className="container">
          {loading ? (
            <div className="no-incidents animate-fade-in-up">Loading incidents…</div>
          ) : error ? (
            <div className="no-incidents animate-fade-in-up">Error: {error}</div>
          ) : incidents.length === 0 ? (
            <div className="no-incidents animate-fade-in-up">
              No incidents reported yet.
            </div>
          ) : (
            incidents.map((incident) => (
              <article key={incident.id} className="card animate-fade-in-up">
                <header className="card-header">
                  <div>
                    <h3 className="card-title">{incident.type}</h3>
                    <p className="location-text">{incident.location}</p>
                  </div>
                  <span className={`badge ${getStatusBadgeClass(incident.status)}`}>
                    {incident.status}
                  </span>
                </header>
                <section className="card-content">
                  <span className={`priority-text ${getPriorityTextClass(incident.priority)}`}>
                    Priority: {incident.priority}
                  </span>
                  <p className="description-text">{incident.description}</p>
                  {incident.responder && (
                    <span className="responder-text">Responder: {incident.responder}</span>
                  )}
                  {incident.status === "Pending" && (
                    <button className="btn-cancel" type="button" aria-label="Cancel Report">
                      Cancel Report
                    </button>
                  )}
                </section>
              </article>
            ))
          )}
        </div>
      </main>
    </>
  );
}
