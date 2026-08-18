import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

export default function PredictionForm() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState<string[]>([]);

  const [formData, setFormData] = useState<PredictionRequest>({
    location: "",
    carpet_area_sqft: 0,
    floor_num: 0,
    bathroom: 1,
    balcony: 0,
    furnishing: "",
    transaction: "",
    ownership: "",
    facing: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLocations() {
      try {
        const response = await fetch("/locations.json");

        if (!response.ok) {
          throw new Error("Could not load locations.");
        }

        const data: string[] = await response.json();

        setLocations(data);
      } catch {
        setError("Could not load locations. Please try again.");
      }
    }

    loadLocations();
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleNumberChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: Number(value),
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!formData.location) {
      setError("Please select a location.");
      return;
    }

    if (formData.carpet_area_sqft <= 0) {
      setError("Carpet area must be greater than 0.");
      return;
    }

    if (formData.floor_num < 0) {
      setError("Floor number cannot be negative.");
      return;
    }

    if (formData.bathroom < 0) {
      setError("Bathrooms cannot be negative.");
      return;
    }

    if (formData.balcony < 0) {
      setError("Balconies cannot be negative.");
      return;
    }

    if (!formData.furnishing) {
      setError("Please select furnishing status.");
      return;
    }

    if (!formData.transaction) {
      setError("Please select transaction type.");
      return;
    }

    if (!formData.ownership.trim()) {
      setError("Please enter ownership type.");
      return;
    }

    if (!formData.facing.trim()) {
      setError("Please enter facing direction.");
      return;
    }

    try {
      setLoading(true);

      const result = await predictPrice(formData);

      navigate("/result", {
        state: {
          predictedPrice: result.predicted_price,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while predicting."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <h2>Property Details</h2>

      <div className="form-group">
        <label htmlFor="location">Location</label>

        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        >
          <option value="">Select location</option>

          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}

          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="carpet_area_sqft">
          Carpet Area (sqft)
        </label>

        <input
          id="carpet_area_sqft"
          name="carpet_area_sqft"
          type="number"
          min="1"
          step="0.01"
          value={formData.carpet_area_sqft || ""}
          onChange={handleNumberChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="floor_num">Floor Number</label>

        <input
          id="floor_num"
          name="floor_num"
          type="number"
          min="0"
          value={formData.floor_num}
          onChange={handleNumberChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bathroom">Bathrooms</label>

        <input
          id="bathroom"
          name="bathroom"
          type="number"
          min="0"
          value={formData.bathroom}
          onChange={handleNumberChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="balcony">Balconies</label>

        <input
          id="balcony"
          name="balcony"
          type="number"
          min="0"
          value={formData.balcony}
          onChange={handleNumberChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="furnishing">Furnishing</label>

        <select
          id="furnishing"
          name="furnishing"
          value={formData.furnishing}
          onChange={handleChange}
          required
        >
          <option value="">Select furnishing</option>
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="transaction">Transaction</label>

        <select
          id="transaction"
          name="transaction"
          value={formData.transaction}
          onChange={handleChange}
          required
        >
          <option value="">Select transaction</option>
          <option value="New Property">New Property</option>
          <option value="Resale">Resale</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="ownership">Ownership</label>

        <input
          id="ownership"
          name="ownership"
          type="text"
          placeholder="e.g. Freehold"
          value={formData.ownership}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="facing">Facing</label>

        <input
          id="facing"
          name="facing"
          type="text"
          placeholder="e.g. North"
          value={formData.facing}
          onChange={handleChange}
          required
        />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </form>
  );
}