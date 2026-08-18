import json

import pandas as pd

from app.core.config import settings


with open(settings.locations_path, "r", encoding="utf-8") as file:
    ALLOWED_LOCATIONS = set(json.load(file))


def prepare_input(data: dict) -> pd.DataFrame:
    location = data["location"]

    if location not in ALLOWED_LOCATIONS:
        location = "other"

    return pd.DataFrame([{
        "carpet_area_sqft": data["carpet_area_sqft"],
        "floor_num": data["floor_num"],
        "bathroom": data["bathroom"],
        "balcony": data["balcony"],
        "location_grouped": location,
        "Furnishing": data["furnishing"],
        "Transaction": data["transaction"],
        "Ownership": data["ownership"],
        "facing": data["facing"],
    }])