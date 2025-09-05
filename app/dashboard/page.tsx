import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CitizenDashboard() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>My Reported Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          {/* List of user's incidents will go here */}
          <p className="text-muted-foreground">No incidents reported yet.</p>
        </CardContent>
      </Card>
    </main>
  );
}
