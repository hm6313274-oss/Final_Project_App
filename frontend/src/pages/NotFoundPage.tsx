import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page">
      <div className="result-card">
        <h1>404</h1>

        <p>
          The page you are looking for does not exist.
        </p>

        <Link to="/" className="button-link">
          Back to Home
        </Link>
      </div>
    </main>
  );
}