import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResponderIncidentDetails() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Incident details, claim/resolve actions will go here */}
          <p className="text-muted-foreground">Incident details coming soon...</p>
        </CardContent>
      </Card>
    </main>
  );
}
