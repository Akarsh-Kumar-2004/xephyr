import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminIncidentDetails() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Admin Incident Details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Admin incident details and assignment controls will go here */}
          <p className="text-muted-foreground">Incident details coming soon...</p>
        </CardContent>
      </Card>
    </main>
  );
}
