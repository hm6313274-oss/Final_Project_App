import joblib
import numpy as np

from app.core.config import settings


def load_model():
    return joblib.load(settings.model_path)


def predict_price(model, input_df):
    prediction_log = model.predict(input_df)[0]

    predicted_price = np.expm1(prediction_log)

    return float(predicted_price)