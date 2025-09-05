import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportIncidentPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Report an Incident</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Incident form will go here */}
          <p className="text-muted-foreground">Form coming soon...</p>
        </CardContent>
      </Card>
    </main>
  );
}
