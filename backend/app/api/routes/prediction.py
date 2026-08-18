from fastapi import APIRouter, Request

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import prepare_input
from app.services.inference import predict_price


router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest, app_request: Request):
    model = app_request.app.state.model

    input_data = prepare_input(request.model_dump())

    predicted_price = predict_price(model, input_data)

    return PredictionResponse(
        predicted_price=predicted_price
    )