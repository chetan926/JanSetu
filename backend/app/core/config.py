import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SIH 2026 PS-129 Interoperability Platform"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "sih2026-super-secret-key-for-jwt-token-auth")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # SQLite fallback by default for instant zero-config startup
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sih2026.db")

    class Config:
        case_sensitive = True

settings = Settings()
