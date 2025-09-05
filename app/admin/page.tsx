import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Admin Live Response Map</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Map and incident list will go here */}
          <p className="text-muted-foreground">Map view coming soon...</p>
        </CardContent>
      </Card>
    </main>
  );
}
