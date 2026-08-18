import { Link, useLocation } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();

  const predictedPrice = location.state?.predictedPrice;

  if (predictedPrice === undefined) {
    return (
      <main className="page">
        <div className="result-card">
          <h1>No Prediction Available</h1>

          <p>
            Please submit the property form first.
          </p>

          <Link to="/" className="button-link">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(predictedPrice);

  return (
    <main className="page">
      <div className="result-card">
        <h1>Estimated Property Price</h1>

        <div className="price">
          {formattedPrice}
        </div>

        <p>
          This is the estimated price based on the
          property details you provided.
        </p>

        <Link to="/" className="button-link">
          Predict Another Property
        </Link>
      </div>
    </main>
  );
}