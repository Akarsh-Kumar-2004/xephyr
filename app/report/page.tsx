"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useRouter } from "next/navigation";

interface FormData {
  type: string;
  location: string;
  description: string;
  media?: File | null;
}

export default function ReportIncidentPage() {
  const [formData, setFormData] = useState<FormData>({
    type: "",
    location: "",
    description: "",
    media: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { latitude, longitude, error: locationError } = useGeolocation();

  useEffect(() => {
    if (latitude && longitude) {
      setFormData(prev => ({
        ...prev,
        location: `${latitude},${longitude}`
      }));
    }
  }, [latitude, longitude]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({ ...prev, media: file }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("type", formData.type);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);
      if (formData.media) {
        formDataToSend.append("media", formData.media);
      }

      const response = await fetch("/api/incidents", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      setSubmitted(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error submitting report:", error);
      // You could set an error state here and display it to the user
    } finally {
      setLoading(false);
    }
  }

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
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card {
          background-color: #E8FFD7;
          color: #3E5F44;
          border-radius: 0.75rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 28rem;
          padding: 1.5rem 2rem;
          box-sizing: border-box;
        }
        .card-header {
          margin-bottom: 1rem;
        }
        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #3E5F44;
          margin-bottom: 0.25rem;
        }
        .card-description {
          font-size: 0.9rem;
          color: #5E936C;
          line-height: 1.4;
        }
        label {
          font-weight: 600;
          color: #3E5F44;
          margin-bottom: 0.25rem;
          display: block;
        }
        select,
        input[type="text"],
        input[type="file"],
        textarea {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 2px solid #5E936C;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #3E5F44;
          background-color: #F0F9E8;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          box-sizing: border-box;
        }
        select:focus,
        input[type="text"]:focus,
        input[type="file"]:focus,
        textarea:focus {
          outline: none;
          border-color: #93DA97;
          box-shadow: 0 0 8px #93DA97;
          background-color: #E8FFD7;
        }
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        button[type="submit"] {
          margin-top: 1rem;
          background-color: #3E5F44;
          color: #E8FFD7;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        button[type="submit"]:hover:not(:disabled) {
          background-color: #5E936C;
          transform: scale(1.05);
        }
        button[type="submit"]:disabled {
          background-color: #93DA97;
          cursor: not-allowed;
          transform: none;
        }
        .thank-you-message {
          text-align: center;
          color: #3E5F44;
        }
        .thank-you-message span:first-child {
          font-size: 1.25rem;
          font-weight: 700;
          color: #3E5F44;
        }
        .thank-you-message span:last-child {
          font-size: 0.9rem;
          color: #5E936C;
        }
      `}</style>

      <main>
        <Card className="card animate-fade-in-up">
          <CardHeader className="card-header">
            <CardTitle className="card-title">Report an Incident</CardTitle>
            <p className="card-description">
              Help responders act quickly by providing accurate details. Your report is confidential and helps save lives.
            </p>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="thank-you-message animate-fade-in-up">
                <span>Thank you for reporting! 🚨</span>
                <br />
                <span>You can track your incident in the Citizen Dashboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="type">Incident Type</label>
                <select 
                  id="type" 
                  name="type" 
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="flood">Flood</option>
                  <option value="medical">Medical Emergency</option>
                  <option value="roadblock">Roadblock</option>
                  <option value="fire">Fire</option>
                  <option value="other">Other</option>
                </select>

                <label htmlFor="location">Location</label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter address or coordinates" 
                  required 
                  className="border-blue-300"
                  disabled={!!(latitude && longitude)}
                />
                {locationError && (
                  <p className="text-sm text-red-500">Error getting location. Please enter manually.</p>
                )}

                <label htmlFor="description">Description</label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the situation..." 
                  required 
                  className="border-blue-300" 
                />

                <label htmlFor="media">Photo/Video (optional)</label>
                <Input 
                  id="media" 
                  name="media" 
                  type="file" 
                  onChange={handleFileChange}
                  accept="image/*,video/*" 
                  className="border-blue-300"
                  ref={fileInputRef}
                />

                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Incident"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
