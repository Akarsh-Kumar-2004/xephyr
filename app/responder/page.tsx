import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResponderDashboard() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Responder Task List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table of incidents to claim/resolve will go here */}
          <p className="text-muted-foreground">No incidents assigned yet.</p>
        </CardContent>
      </Card>
    </main>
  );
}
