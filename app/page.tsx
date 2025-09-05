import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <style>{`
        main {
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #3E5F44, #5E936C, #93DA97);
          color: #E8FFD7;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 3rem;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
          user-select: none;
        }

        .btn {
          display: block;
          width: 100%;
          max-width: 320px;
          padding: 1rem 1.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          border-radius: 0.5rem;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: background-color 0.3s ease, transform 0.3s ease;
          user-select: none;
        }

        .btn-primary {
          background-color: #3E5F44;
          color: #E8FFD7;
        }
        .btn-primary:hover {
          background-color: #5E936C;
          transform: scale(1.05);
        }

        .btn-secondary {
          background-color: #5E936C;
          color: #E8FFD7;
        }
        .btn-secondary:hover {
          background-color: #93DA97;
          transform: scale(1.05);
        }

        .btn-accent {
          background-color: #93DA97;
          color: #3E5F44;
        }
        .btn-accent:hover {
          background-color: #E8FFD7;
          transform: scale(1.05);
        }

        .btn-warning {
          background-color: #E8FFD7;
          color: #3E5F44;
        }
        .btn-warning:hover {
          background-color: #93DA97;
          transform: scale(1.05);
        }

        .btn-container {
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (min-width: 640px) {
          h1 {
            font-size: 4rem;
          }
        }
      `}</style>

      <main>
        <h1>Disaster Response Command Center</h1>

        {/* When signed out → show login/signup */}
        <SignedOut>
          <div className="btn-container">
            <Link href="/sign-in" className="btn btn-primary" tabIndex={0}>
              Login
            </Link>
            <Link href="/sign-up" className="btn btn-secondary" tabIndex={0}>
              Sign Up
            </Link>
          </div>
        </SignedOut>

        {/* When signed in → show dashboards + user menu */}
        <SignedIn>
          <div className="btn-container">
            <Link href="/report" className="btn btn-primary" tabIndex={0}>
              Report an Incident
            </Link>
            <Link href="/dashboard" className="btn btn-secondary" tabIndex={0}>
              Citizen Dashboard
            </Link>
            <Link href="/responder" className="btn btn-accent" tabIndex={0}>
              Responder Dashboard
            </Link>
            <Link href="/admin" className="btn btn-warning" tabIndex={0}>
              Admin Dashboard
            </Link>
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </SignedIn>
      </main>
    </>
  );
}
