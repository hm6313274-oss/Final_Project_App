from pathlib import Path

from pydantic_settings import BaseSettings


BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_path: str = str(BASE_DIR / "models" / "house_price.pkl")
    locations_path: str = str(BASE_DIR / "models" / "locations.json")
    allowed_origins: str = "http://localhost:5173"

    class Config:
        env_file = ".env"


settings = Settings()