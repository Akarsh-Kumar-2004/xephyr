
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Response Command Center</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/report" className="btn btn-primary">Report an Incident</Link>
        <Link href="/dashboard" className="btn btn-secondary">Citizen Dashboard</Link>
        <Link href="/responder" className="btn btn-accent">Responder Dashboard</Link>
        <Link href="/admin" className="btn btn-warning">Admin Dashboard</Link>
      </div>
    </main>
  );
}
