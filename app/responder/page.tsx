"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const mockTasks = [
  {
    id: 101,
    type: "Flood",
    location: "Sector 21, Riverside",
    priority: "High",
    status: "Unassigned",
    description: "Water rising rapidly, people stranded on rooftops.",
  },
  {
    id: 102,
    type: "Medical Emergency",
    location: "Block C, Main Street",
    priority: "Medium",
    status: "In Progress",
    description: "Elderly person needs urgent medical attention.",
  },
  {
    id: 103,
    type: "Roadblock",
    location: "Highway 7",
    priority: "Low",
    status: "Resolved",
    description: "Tree fallen, blocking both lanes.",
  },
];

export default function ResponderDashboard() {
  const [tasks, setTasks] = useState(mockTasks);

  function claimTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "In Progress" } : t))
    );
  }

  function resolveTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t))
    );
  }

  // Badge color classes based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-[#93DA97] text-[#3E5F44]"; // light green bg, dark text
      case "In Progress":
        return "bg-[#5E936C] text-[#E8FFD7]"; // medium green bg, light text
      case "Unassigned":
      default:
        return "bg-[#3E5F44] text-[#E8FFD7]"; // dark green bg, light text
    }
  };

  // Priority text color classes
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
        }
        .container {
          width: 100%;
          max-width: 48rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .card {
          background-color: #E8FFD7;
          color: #3E5F44;
          border-radius: 0.75rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
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
        .actions {
          margin-top: 0.75rem;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }
        a.view-details {
          color: #3E5F44;
          text-decoration: underline;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        a.view-details:hover {
          color: #5E936C;
        }
        button.claim-btn {
          background-color: #3E5F44;
          color: #E8FFD7;
          font-weight: 600;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          cursor: pointer;
          animation: pulse 2s infinite;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        button.claim-btn:hover {
          background-color: #5E936C;
          transform: scale(1.05);
        }
        button.resolve-btn {
          background-color: #93DA97;
          color: #3E5F44;
          font-weight: 600;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        button.resolve-btn:hover {
          background-color: #5E936C;
          color: #E8FFD7;
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
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
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

      <main className="animate-fade-in">
        <h2 className="animate-fade-in-up">Responder Task List</h2>
        <div className="container">
          {tasks.length === 0 ? (
            <Card className="card animate-fade-in-up">
              <CardContent>
                <p className="text-[#3E5F44]">No incidents assigned yet.</p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className="card animate-fade-in-up">
                <CardHeader className="card-header">
                  <div>
                    <CardTitle className="card-title">{task.type}</CardTitle>
                    <span className="location-text">{task.location}</span>
                  </div>
                  <Badge className={getStatusBadgeClass(task.status)}>
                    {task.status}
                  </Badge>
                </CardHeader>
                <CardContent className="card-content">
                  <span className={`priority-text ${getPriorityTextClass(task.priority)}`}>
                    Priority: {task.priority}
                  </span>
                  <span className="description-text">{task.description}</span>
                  <div className="actions">
                    <Link href={`/responder/${task.id}`} className="view-details">
                      View Details
                    </Link>
                    {task.status === "Unassigned" && (
                      <button
                        className="claim-btn"
                        onClick={() => claimTask(task.id)}
                        aria-label={`Claim task ${task.type} at ${task.location}`}
                      >
                        Claim Task
                      </button>
                    )}
                    {task.status === "In Progress" && (
                      <button
                        className="resolve-btn"
                        onClick={() => resolveTask(task.id)}
                        aria-label={`Mark task ${task.type} at ${task.location} as resolved`}
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </>
  );
}
