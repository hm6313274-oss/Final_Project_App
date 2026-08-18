# House Price Prediction

## Overview
A web application to predict house prices based on various features.

## Architecture & Tech Stack
- **Backend:** FastAPI
- **Frontend:** React
- **Model:** Scikit-Learn
- **Deployment:** Git/GitHub

## Project Structure
- `/notebooks`: Data cleaning, EDA, and model training.
- `/backend`: FastAPI application.
- `/frontend`: React application.
- `/models`: Trained `house_price.pkl`.

## Dataset
Download the raw dataset from [Insert Link Here] and place it in the project folder (it is not included in this repo).

## Setup
### Backend
1. cd backend
2. pip install -r requirements.txt
3. uvicorn app.main:app --reload

### Frontend
1. cd frontend
2. npm install
3. npm run build

## API Reference
POST /predict
Example:
curl -X POST "http://localhost:8000/predict" -H "Content-Type: application/json" -d '{"location": "new-delhi", "carpet_area_sqft": 1200, ...}'

## Model Metrics
- MAE: [ 4.249327e+09]
- RMSE: [ 5.964672e+11]
- R²: [ 9.337000e-01]
