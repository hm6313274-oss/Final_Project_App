import PredictionForm from "../components/PredictionForm";

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">
        <h1>House Price Prediction</h1>

        <p className="subtitle">
          Enter the property details to estimate its price.
        </p>

        <PredictionForm />
      </div>
    </main>
  );
}